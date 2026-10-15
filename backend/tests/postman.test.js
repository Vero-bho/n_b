"use strict";

const path = require("node:path");

process.env.NODE_ENV = "test";
const TEST_PORT = Number(process.env.TEST_PORT ?? 4000);
process.env.PORT = String(TEST_PORT);
process.env.JWT_SECRET = "test-secret-key";
process.env.JWT_EXPIRES_IN = "1h";
process.env.UPLOAD_DIR = "uploads";
process.env.DATABASE_URL = "postgresql://noir:noir@localhost:5432/noir_bijoux_test?schema=public";

const fs = require("node:fs");
const bcrypt = require("bcryptjs");
const newman = require("newman");

const { createFakePrisma, seed } = require("./fake-prisma");

const fakePrisma = createFakePrisma();
seed(fakePrisma);

const clientPath = require.resolve(path.join(__dirname, "..", "dist", "prisma", "client.js"));
require.cache[clientPath] = {
  id: clientPath,
  filename: clientPath,
  loaded: true,
  exports: { prisma: fakePrisma },
  children: [],
  paths: [],
};

const { createApp } = require("../dist/app.js");

async function main() {
  fakePrisma.__db.user.push({
    id: 1,
    email: "admin@noir.ru",
    password: await bcrypt.hash("admin1234", 10),
    fullName: "Администратор Noir Bijoux",
    phone: "+7 (383) 000-00-01",
    avatarUrl: null,
    role: "admin",
    createdAt: new Date(),
  });

  const collectionPath = path.join(__dirname, "..", "postman", "Noir-Bijoux.postman_collection.json");
  const collection = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
  const avatarFixture = path.join(__dirname, "fixtures", "avatar.png");

  for (const folder of collection.item) {
    for (const item of folder.item) {
      const formdata = item.request?.body?.formdata ?? [];
      for (const field of formdata) {
        if (field.type === "file") field.src = avatarFixture;
      }
    }
  }

  const environment = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "postman", "Noir-Bijoux.postman_environment.json"), "utf8"),
  );
  for (const variable of environment.values) {
    if (variable.key === "baseUrl") variable.value = `http://localhost:${TEST_PORT}`;
  }

  const server = createApp().listen(TEST_PORT);
  await new Promise((resolve) => server.once("listening", resolve));
  console.log(`Сервер запущен на http://localhost:${TEST_PORT}, запускаю коллекцию Postman…\n`);

  await new Promise((resolve) => {
    newman.run(
      {
        collection,
        environment,
        reporters: [],
        timeoutRequest: 10000,
      },
      (error, summary) => {
        if (error) {
          console.error("Не удалось выполнить коллекцию:", error);
          process.exitCode = 1;
          return resolve();
        }

        const stats = summary.run.stats;
        const failures = summary.run.failures ?? [];

        console.log("──────── РЕЗУЛЬТАТ ПРОГОНА КОЛЛЕКЦИИ ────────");
        console.log(`запросов выполнено: ${stats.requests.total}`);
        console.log(`проверок (tests):   ${stats.tests.total} — успешно ${stats.tests.total - failures.length}, ошибок ${failures.length}`);

        for (const failure of failures) {
          console.log(`  ОШИБКА: ${failure.source?.name} → ${failure.error?.message}`);
        }

        if (failures.length > 0) process.exitCode = 1;
        resolve();
      },
    );
  });

  server.close();
}

main().catch((error) => {
  console.error("Проверка упала с необработанной ошибкой:", error);
  process.exit(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// Проверка структуры фронтенда: все ли файлы на месте.
//
// Запуск:  npm run check:files     (папка фронтенда)
//
// Главная задача — найти «пропавшие» файлы, из-за которых страницы падают
// с ошибкой вида:
//   Internal server error: Cannot find module '~/assets/catalog/necklace-rose.svg'
//   imported from '.../app/data/catalog.ts'
//
// Так бывает, когда при переносе проекта на компьютер не скопировали папку
// app/assets (картинки) или app/data (данные магазина): в проекте картинки
// подключены как модули кода, и без файла страница не собирается вовсе.
//
// Скрипт разбирает все импорты с коротким адресом "~/..." во всех файлах
// app/ и проверяет, что каждый файл действительно существует.
// ─────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..");
const APP = path.join(ROOT, "app");

const passed = [];
const failed = [];
const problems = [];

function ok(title, details = "") {
  passed.push(title);
  console.log(`  ✔ ${title}${details ? ` — ${details}` : ""}`);
}

function bad(title, details = "") {
  failed.push(title);
  console.log(`  ✘ ${title}${details ? ` — ${details}` : ""}`);
}

/** Все файлы внутри папки (рекурсивно) */
function walk(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, list);
    else list.push(full);
  }
  return list;
}

console.log("Проверка структуры фронтенда Noir Bijoux\n");
console.log(`  папка проекта: ${ROOT}\n`);

// ── 1. обязательные файлы и папки ───────────────────────────────────────────
console.log("Основные файлы и папки");

const REQUIRED = [
  ["package.json", "список пакетов и команд"],
  ["vite.config.ts", "настройки сборки (Vite)"],
  ["react-router.config.ts", "настройки маршрутизации"],
  ["tsconfig.json", "настройки TypeScript"],
  ["app/root.tsx", "общий каркас страниц (шапка, подвал)"],
  ["app/routes.ts", "список маршрутов"],
  ["app/app.css", "цвета, шрифты (палитра #210425 и Oranienbaum)"],
  ["app/data/catalog.ts", "5 изделий каталога"],
  ["app/data/constructorComponents.ts", "48 компонентов конструктора"],
  ["app/data/delivery.ts", "точки самовывоза и ПВЗ"],
  ["app/data/demoOrders.ts", "демо-заказы и сборки"],
  ["app/data/masterInfo.ts", "текст страницы «О мастере»"],
  ["app/assets", "папка со старыми SVG-заполнителями (36 файлов)"],
  ["public", "статические файлы"],
  ["public/assets/README.md", "список 42 ожидаемых PNG-assets"],
];

for (const [relative, purpose] of REQUIRED) {
  const full = path.join(ROOT, relative);
  if (fs.existsSync(full)) ok(`${relative.padEnd(34)} ${purpose}`);
  else {
    bad(`${relative.padEnd(34)} ${purpose}`);
    problems.push({ file: relative, why: "нет файла или папки" });
  }
}

/** Существует ли файл, на который указывает короткий адрес "~/..." */
function resolves(importPath) {
  const base = path.join(APP, importPath);
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.css`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

// ── 2. все импорты "~/..." должны существовать ──────────────────────────────
console.log('\nИмпорты "~/..." — существуют ли такие файлы');

const sources = fs.existsSync(APP) ? walk(APP).filter((file) => /\.(ts|tsx)$/.test(file)) : [];
const missing = new Map();
let importCount = 0;

for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/from\s+"~([^"]+)"/g)) {
    importCount += 1;
    if (resolves(match[1])) continue;

    const relativeTarget = `app${match[1]}`;
    const importer = path.relative(ROOT, file).replace(/\\/g, "/");
    if (!missing.has(relativeTarget)) missing.set(relativeTarget, importer);
  }
}

console.log(`  проверено файлов с кодом: ${sources.length}, импортов "~/": ${importCount}`);

if (missing.size === 0) {
  ok("все файлы, на которые ссылается код, на месте");
} else {
  bad(`не найдено файлов: ${missing.size}`);
  for (const [target, importer] of missing) {
    console.log(`      ${target}   ← нужен файлу ${importer}`);
    problems.push({ file: target, why: `нужен файлу ${importer}` });
  }
}

// ── 3. картинки каталога и конструктора ─────────────────────────────────────
console.log("\nКартинки (app/assets)");

const assetsDir = path.join(APP, "assets");
if (!fs.existsSync(assetsDir)) {
  bad("папки app/assets нет вовсе — страницы каталога, главная и конструктор выдают ошибку 500");
  problems.push({
    file: "app/assets",
    why: "папка отсутствует: именно из-за неё «Cannot find module ... .svg»",
  });
} else {
  const svg = walk(assetsDir).filter((file) => file.endsWith(".svg"));
  const catalog = svg.filter((file) => file.includes(`${path.sep}catalog${path.sep}`)).length;
  const components = svg.filter((file) => file.includes(`${path.sep}components${path.sep}`)).length;
  const other = svg.length - catalog - components;

  console.log(`  всего картинок: ${svg.length} (каталог: ${catalog}, конструктор: ${components}, прочие: ${other})`);
  if (svg.length >= 36) ok("SVG-заполнители на месте (8 каталог + 27 компонентов + 1 мастер = 36)");
  else bad(`картинок меньше ожидаемого: ${svg.length} вместо 36`);
}

// ── 4. состояние проекта ────────────────────────────────────────────────────
console.log("\nСостояние");

const hasModules = fs.existsSync(path.join(ROOT, "node_modules"));
console.log(`  ${hasModules ? "✔" : "✘"} node_modules ${hasModules ? "— пакеты установлены" : "— выполните: npm install"}`);

const hasEnv = fs.existsSync(path.join(ROOT, ".env"));
console.log(
  `  ${hasEnv ? "✔" : "—"} .env ${hasEnv ? "— есть (адрес бэкенда)" : "— не нужен для запуска без бэкенда; создать: Copy-Item .env.example .env"}`,
);

// ── итог ────────────────────────────────────────────────────────────────────
console.log("\n──────── ИТОГ ────────");
console.log(`успешно: ${passed.length} | ошибок: ${failed.length}`);

if (problems.length > 0) {
  console.log("\nКак исправить:");
  const assetProblems = problems.filter((row) => row.file.includes("assets"));
  if (assetProblems.length > 0) {
    console.log("  1. Скопировать папку app/assets из архива noir-bijoux-frontend.zip");
    console.log("     При необходимости добавьте реальные PNG по списку public/assets/README.md.");
    console.log("  2. После копирования перезапустить сервер: Ctrl + C, затем npm run dev.");
  } else {
    console.log("  скопировать перечисленные файлы из архива NOIR_BIJOUX.zip");
  }
  process.exitCode = 1;
} else {
  console.log("\nВсё на месте. Запуск сайта: npm run dev  →  http://localhost:5173");
}

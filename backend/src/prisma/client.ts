// ─────────────────────────────────────────────────────────────────────────────
// Единственный экземпляр Prisma Client на всё приложение.
// База — PostgreSQL в облаке Supabase (практическое занятие №7 методички).
// Подключение идёт через драйвер-адаптер @prisma/adapter-pg (библиотека pg),
// которому передаётся строка подключения из .env (DATABASE_URL).
//
// Откуда взять строку подключения — см. docs/ШАГ-5b_База_данных_Supabase.md.
// Кратко (Supabase → кнопка Connect → ORMs → Prisma):
//   postgresql://postgres.<ref>:<новый-пароль>@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true
// ─────────────────────────────────────────────────────────────────────────────
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Не задан DATABASE_URL — заполните файл .env (образец: .env.example)");
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });

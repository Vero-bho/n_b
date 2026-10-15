// ─────────────────────────────────────────────────────────────────────────────
// ДЕМО-ЗАПОЛНЕНИЕ БАЗЫ POSTGRESQL / SUPABASE
//
// Запускать только в отдельной учебной базе: перед заполнением seed.ts удаляет
// текущие данные из таблиц магазина. Для первого запуска в Supabase проще
// выполнить sql-postgres/00_create_all_simple.sql в SQL Editor.
// npm run seed — альтернативный способ для разработчика, не для production.
// Пароли пользователей хранятся только в виде bcrypt-хеша.
// ─────────────────────────────────────────────────────────────────────────────
import bcrypt from "bcryptjs";

import { prisma } from "./client";

// ─────────────────────────────────────────────────────────────────────────────
// Пользователи для демонстрации входа
// ─────────────────────────────────────────────────────────────────────────────
const DEMO_USERS = [
  {
    email: "olga@mail.ru",
    password: "noir1234",
    fullName: "Ольга Иванова",
    phone: "+7 (999) 000-00-00",
    role: "client",
  },
  {
    email: "admin@noir.ru",
    password: "admin1234",
    fullName: "Администратор Noir Bijoux",
    phone: "+7 (383) 000-00-01",
    role: "admin",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Очистка таблиц (сначала «дочерние», затем «родительские»)
// ─────────────────────────────────────────────────────────────────────────────
async function clearDatabase() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.buildItem.deleteMany();
  await prisma.build.deleteMany();
  await prisma.product.deleteMany();
  await prisma.component.deleteMany();
  await prisma.pickupPoint.deleteMany();
  await prisma.chatMessage.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.material.deleteMany();
}

// ─── Автогенерируемая часть
// ─────────────────────────────────────────────────────────────────────────────
// Данные магазина. СГЕНЕРИРОВАНО скриптом _tools/generate_seed.py из файлов
// фронтенда app/data/*.ts — правьте данные во фронтенде и запускайте скрипт
// заново, чтобы каталог, компоненты и пункты выдачи совпадали в базе и на сайте.
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Колье", slug: "necklace" },
  { name: "Браслет", slug: "bracelet" },
  { name: "Серьги", slug: "earrings" },
  { name: "Кольцо", slug: "ring" },
];

const MATERIALS = [
  { name: "Серебро 925" },
  { name: "Ювелирный сплав" },
  { name: "Чёрный родий" },
];

// цена и описание — те же, что в app/data/catalog.ts
const PRODUCTS = [
  { id: 1, name: "Браслет «Dark Star»", slug: "bracelet-dark-star", categorySlug: "bracelet", materialName: "Ювелирный сплав", price: 3200, imageUrl: "/assets/catalog/bracelet-dark-star.png", description: "Браслет из тёмных бусин с шармом-звездой. Доступны размеры 16, 17 и 18 см." },
  { id: 2, name: "Браслет «Лилит»", slug: "bracelet-lilith", categorySlug: "bracelet", materialName: "Серебро 925", price: 3900, imageUrl: "/assets/catalog/bracelet-lilith.png", description: "Жемчужный браслет с серебряным шармом. Доступны размеры 16, 17 и 18 см." },
  { id: 3, name: "Серьги «Чёрная роза»", slug: "earrings-black-rose", categorySlug: "earrings", materialName: "Чёрный родий", price: 3400, imageUrl: "/assets/catalog/earrings-black-rose.png", description: "Серьги с тёмными камнями и фурнитурой с покрытием чёрным родием." },
  { id: 4, name: "Колье «Оникс капля»", slug: "necklace-onyx-drop", categorySlug: "necklace", materialName: "Серебро 925", price: 5200, imageUrl: "/assets/catalog/necklace-onyx-drop.png", description: "Колье с подвеской из чёрного оникса. Доступны длины 35 см — чокер и 60 см — матине." },
  { id: 5, name: "Колье «Ночная Роза»", slug: "necklace-rose", categorySlug: "necklace", materialName: "Серебро 925", price: 4500, imageUrl: "/assets/catalog/necklace-rose.png", description: "Колье на цепочке с подвеской-розой. Доступны длины 35 см — чокер и 60 см — матине." },
];

// id, вкладка (slot) и слой (layerZ) — те же, что в app/data/constructorComponents.ts
const COMPONENTS = [
  { id: 1, name: "Цепочка 1", jewelryType: "necklace", slot: "chain", price: 1500, imageUrl: "/assets/components/necklace/chain-1.png", layerZ: 1 },
  { id: 2, name: "Цепочка 2", jewelryType: "necklace", slot: "chain", price: 900, imageUrl: "/assets/components/necklace/chain-2.png", layerZ: 1 },
  { id: 3, name: "Подвеска «Роза»", jewelryType: "necklace", slot: "pendant", price: 1200, imageUrl: "/assets/components/necklace/pendant-rose.png", layerZ: 5 },
  { id: 4, name: "Подвеска «Оникс»", jewelryType: "necklace", slot: "pendant", price: 1500, imageUrl: "/assets/components/necklace/pendant-onyx.png", layerZ: 5 },
  { id: 5, name: "Подвеска «Крест»", jewelryType: "necklace", slot: "pendant", price: 2000, imageUrl: "/assets/components/necklace/pendant-cross.png", layerZ: 5 },
  { id: 6, name: "Карабин", jewelryType: "necklace", slot: "clasp", price: 300, imageUrl: "/assets/components/necklace/clasp-bracelet.png", layerZ: 8 },
  { id: 7, name: "Магнитная застёжка", jewelryType: "necklace", slot: "clasp", price: 400, imageUrl: "/assets/components/necklace/clasp-magnetic.png", layerZ: 8 },
  { id: 8, name: "Чокер", jewelryType: "necklace", slot: "chain", price: 900, imageUrl: "/assets/components/necklace/choker.png", layerZ: 1 },
  { id: 9, name: "Бусины из оникса", jewelryType: "necklace", slot: "beads", price: 1100, imageUrl: "/assets/components/necklace/beads-onyx.png", layerZ: 3 },
  { id: 10, name: "Подвеска «Him»", jewelryType: "necklace", slot: "pendant", price: 1000, imageUrl: "/assets/components/necklace/pendant-him.png", layerZ: 5 },
  { id: 11, name: "Подвеска «Lilith»", jewelryType: "necklace", slot: "pendant", price: 1200, imageUrl: "/assets/components/necklace/pendant-lilith.png", layerZ: 5 },
  { id: 12, name: "35 см — чокер", jewelryType: "necklace", slot: "length", price: 0, imageUrl: "", layerZ: 0 },
  { id: 13, name: "60 см — матине", jewelryType: "necklace", slot: "length", price: 350, imageUrl: "", layerZ: 0 },
  { id: 14, name: "Чёрные бусины", jewelryType: "bracelet", slot: "beads", price: 1200, imageUrl: "/assets/components/bracelet/beads-black.png", layerZ: 1 },
  { id: 15, name: "Бусины с цепочкой", jewelryType: "bracelet", slot: "beads", price: 1300, imageUrl: "/assets/components/bracelet/beads-chain.png", layerZ: 1 },
  { id: 16, name: "Светлые бусины", jewelryType: "bracelet", slot: "beads", price: 1400, imageUrl: "/assets/components/bracelet/beads-white.png", layerZ: 1 },
  { id: 17, name: "Шарм «Ангел»", jewelryType: "bracelet", slot: "charm", price: 700, imageUrl: "/assets/components/bracelet/charm-angel.png", layerZ: 6 },
  { id: 18, name: "Шарм «Крест»", jewelryType: "bracelet", slot: "charm", price: 900, imageUrl: "/assets/components/bracelet/charm-cross.png", layerZ: 6 },
  { id: 19, name: "Шарм «Him»", jewelryType: "bracelet", slot: "charm", price: 800, imageUrl: "/assets/components/bracelet/charm-him.png", layerZ: 6 },
  { id: 20, name: "Шарм «Lilith»", jewelryType: "bracelet", slot: "charm", price: 800, imageUrl: "/assets/components/bracelet/charm-lilith.png", layerZ: 6 },
  { id: 21, name: "Овальный шарм", jewelryType: "bracelet", slot: "charm", price: 650, imageUrl: "/assets/components/bracelet/charm-oval.png", layerZ: 6 },
  { id: 22, name: "Шарм «Звезда»", jewelryType: "bracelet", slot: "charm", price: 700, imageUrl: "/assets/components/bracelet/charm-star.png", layerZ: 6 },
  { id: 23, name: "Карабин", jewelryType: "bracelet", slot: "clasp", price: 400, imageUrl: "/assets/components/bracelet/clasp-bracelet.png", layerZ: 8 },
  { id: 24, name: "Застёжка-сердце", jewelryType: "bracelet", slot: "clasp", price: 450, imageUrl: "/assets/components/bracelet/clasp-heart.png", layerZ: 8 },
  { id: 25, name: "Магнитная застёжка", jewelryType: "bracelet", slot: "clasp", price: 450, imageUrl: "/assets/components/bracelet/clasp-magnetic.png", layerZ: 8 },
  { id: 26, name: "16 см", jewelryType: "bracelet", slot: "size", price: 0, imageUrl: "", layerZ: 0 },
  { id: 27, name: "17 см", jewelryType: "bracelet", slot: "size", price: 0, imageUrl: "", layerZ: 0 },
  { id: 28, name: "18 см", jewelryType: "bracelet", slot: "size", price: 100, imageUrl: "", layerZ: 0 },
  { id: 29, name: "Английский замок", jewelryType: "earrings", slot: "clasp", price: 900, imageUrl: "/assets/components/earrings/lock-english.png", layerZ: 8 },
  { id: 30, name: "Пуссеты", jewelryType: "earrings", slot: "clasp", price: 300, imageUrl: "/assets/components/earrings/lock-studs.png", layerZ: 8 },
  { id: 31, name: "Камень «Чёрная роза»", jewelryType: "earrings", slot: "stone", price: 1500, imageUrl: "/assets/components/earrings/stone-black-rose.png", layerZ: 5 },
  { id: 32, name: "Камень «Крест»", jewelryType: "earrings", slot: "stone", price: 900, imageUrl: "/assets/components/earrings/stone-cross.png", layerZ: 5 },
  { id: 33, name: "Оникс", jewelryType: "earrings", slot: "stone", price: 1000, imageUrl: "/assets/components/earrings/stone-onyx.png", layerZ: 5 },
  { id: 34, name: "Жемчуг", jewelryType: "earrings", slot: "stone", price: 1100, imageUrl: "/assets/components/earrings/stone-pearle.png", layerZ: 5 },
  { id: 35, name: "Короткие (до 2 см)", jewelryType: "earrings", slot: "length", price: 0, imageUrl: "", layerZ: 0 },
  { id: 36, name: "Средние (3–4 см)", jewelryType: "earrings", slot: "length", price: 150, imageUrl: "", layerZ: 0 },
  { id: 37, name: "Длинные (5 см и более)", jewelryType: "earrings", slot: "length", price: 300, imageUrl: "", layerZ: 0 },
  { id: 38, name: "Профиль «Классика», золото", jewelryType: "ring", slot: "profile", price: 2500, imageUrl: "/assets/components/ring/profile-classic-gold.png", layerZ: 1 },
  { id: 39, name: "Профиль «Классика», серебро", jewelryType: "ring", slot: "profile", price: 2300, imageUrl: "/assets/components/ring/profile-classic-silver.png", layerZ: 1 },
  { id: 40, name: "Профиль «Плоский», золото", jewelryType: "ring", slot: "profile", price: 2500, imageUrl: "/assets/components/ring/profile-flat-gold.png", layerZ: 1 },
  { id: 41, name: "Профиль «Плоский», серебро", jewelryType: "ring", slot: "profile", price: 2300, imageUrl: "/assets/components/ring/profile-flat-silver.png", layerZ: 1 },
  { id: 42, name: "Оникс, золото", jewelryType: "ring", slot: "stone", price: 1200, imageUrl: "/assets/components/ring/stone-onyx-gold.png", layerZ: 6 },
  { id: 43, name: "Оникс, серебро", jewelryType: "ring", slot: "stone", price: 1200, imageUrl: "/assets/components/ring/stone-onyx-silver.png", layerZ: 6 },
  { id: 44, name: "Жемчуг", jewelryType: "ring", slot: "stone", price: 1500, imageUrl: "/assets/components/ring/stone-pearl.png", layerZ: 6 },
  { id: 45, name: "Размер 16", jewelryType: "ring", slot: "size", price: 0, imageUrl: "", layerZ: 0 },
  { id: 46, name: "Размер 17", jewelryType: "ring", slot: "size", price: 0, imageUrl: "", layerZ: 0 },
  { id: 47, name: "Размер 18", jewelryType: "ring", slot: "size", price: 0, imageUrl: "", layerZ: 0 },
  { id: 48, name: "Размер 19", jewelryType: "ring", slot: "size", price: 0, imageUrl: "", layerZ: 0 },
];

// точки самовывоза (pickup) и пункты выдачи (pvz) — как в app/data/delivery.ts
const PICKUP_POINTS = [
  { id: 1, kind: "pickup", provider: "Мастерская Noir Bijoux", city: "Новосибирск", address: "ул. Дуси Ковальчук, 250, 2 этаж, офис 12", workHours: "Пн–Пт 10:00–19:00, Сб 11:00–16:00", phone: "+7 (383) 000-00-01" },
  { id: 2, kind: "pickup", provider: "Шоурум «Aesthetics»", city: "Новосибирск", address: "Красный проспект, 100, 1 этаж", workHours: "Ежедневно 10:00–20:00", phone: "+7 (383) 000-00-02" },
  { id: 3, kind: "pvz", provider: "ПВЗ СДЭК", city: "Новосибирск", address: "ул. Ленина, 12", workHours: "Пн–Сб 10:00–20:00", phone: null },
  { id: 4, kind: "pvz", provider: "ПВЗ Boxberry", city: "Новосибирск", address: "ул. Гоголя, 15", workHours: "Пн–Пт 09:00–19:00", phone: null },
  { id: 5, kind: "pvz", provider: "ПВЗ СДЭК", city: "Бердск", address: "ул. Первомайская, 8", workHours: "Пн–Сб 10:00–19:00", phone: null },
];

// демонстрационные сборки пользователя «Ольга» и один заказ в истории
const DEMO_BUILDS = [
  { jewelryType: "necklace", article: "NB-NK-1-3-6-12", totalPrice: 3000, components: [1, 3, 6, 12], layers: [1, 5, 8, 0] }, 
  { jewelryType: "bracelet", article: "NB-BR-14-22-23-27", totalPrice: 2300, components: [14, 22, 23, 27], layers: [1, 6, 8, 0] }, 
];

const DEMO_PRODUCT = {
  name: "Браслет «Dark Star»",
  price: 3200,
};
// ─── Конец автогенерируемой части ───────────────────────────────────────────

async function main() {
  console.log("Заполнение базы Noir Bijoux…");

  await clearDatabase();

  // ── 1. Категории изделий ────────────────────────────────────────────────
  for (const category of CATEGORIES) {
    await prisma.category.create({ data: category });
  }
  const categories = await prisma.category.findMany();
  const categoryIdBySlug = new Map(categories.map((row) => [row.slug, row.id]));
  console.log(`  категории: ${categories.length}`);

  // ── 2. Материалы ────────────────────────────────────────────────────────
  for (const material of MATERIALS) {
    await prisma.material.create({ data: material });
  }
  const materials = await prisma.material.findMany();
  const materialIdByName = new Map(materials.map((row) => [row.name, row.id]));
  console.log(`  материалы: ${materials.length}`);

  // ── 3. Каталог готовых изделий ──────────────────────────────────────────
  for (const product of PRODUCTS) {
    const categoryId = categoryIdBySlug.get(product.categorySlug);
    const materialId = materialIdByName.get(product.materialName);

    if (!categoryId || !materialId) {
      throw new Error(`Не найдена категория «${product.categorySlug}» или материал «${product.materialName}»`);
    }

    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        categoryId,
        materialId,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
      },
    });
  }
  console.log(`  изделий в каталоге: ${PRODUCTS.length}`);

  // ── 4. Компоненты конструктора ──────────────────────────────────────────
  for (const component of COMPONENTS) {
    await prisma.component.create({ data: { ...component, materialId: null } });
  }
  console.log(`  компонентов конструктора: ${COMPONENTS.length}`);

  // ── 5. Точки самовывоза и пункты выдачи ─────────────────────────────────
  for (const point of PICKUP_POINTS) {
    await prisma.pickupPoint.create({ data: point });
  }
  console.log(`  точек получения: ${PICKUP_POINTS.length}`);

  // ── 6. Пользователи ─────────────────────────────────────────────────────
  const users = new Map<string, number>();

  for (const demo of DEMO_USERS) {
    const user = await prisma.user.create({
      data: {
        email: demo.email,
        password: await bcrypt.hash(demo.password, 10),
        fullName: demo.fullName,
        phone: demo.phone,
        role: demo.role,
      },
    });
    users.set(demo.email, user.id);
  }
  console.log(`  пользователей: ${DEMO_USERS.length} (olga@mail.ru / noir1234, admin@noir.ru / admin1234)`);

  // ── 7. Демонстрационные сборки пользователя «Ольга» ─────────────────────
  const olgaId = users.get("olga@mail.ru")!;
  const buildIds: number[] = [];

  for (const demo of DEMO_BUILDS) {
    const build = await prisma.build.create({
      data: {
        userId: olgaId,
        jewelryType: demo.jewelryType,
        article: demo.article,
        totalPrice: demo.totalPrice,
        items: {
          create: demo.components.map((componentId, index) => ({
            componentId,
            layerZ: demo.layers[index],
          })),
        },
      },
    });
    buildIds.push(build.id);
  }
  console.log(`  сборок: ${DEMO_BUILDS.length} (${DEMO_BUILDS.map((row) => row.article).join(", ")})`);

  // ── 8. Избранная сборка ─────────────────────────────────────────────────
  await prisma.favorite.create({ data: { userId: olgaId, buildId: buildIds[0] } });

  // ── 9. История заказов ──────────────────────────────────────────────────
  await prisma.order.create({
    data: {
      orderNumber: "4821",
      userId: olgaId,
      customerName: "Ольга Иванова",
      phone: "+7 (999) 000-00-00",
      email: "olga@mail.ru",
      deliveryType: "Самовывоз",
      pickupPointId: 1,
      total: DEMO_PRODUCT.price + DEMO_BUILDS[0].totalPrice,
      status: "done",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 дней назад
      items: {
        create: [
          { productId: 1, title: DEMO_PRODUCT.name, price: DEMO_PRODUCT.price, quantity: 1 },
          {
            buildId: buildIds[0],
            title: `Колье (авторская сборка ${DEMO_BUILDS[0].article})`,
            price: DEMO_BUILDS[0].totalPrice,
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: "4822",
      userId: olgaId,
      customerName: "Ольга Иванова",
      phone: "+7 (999) 000-00-00",
      email: "olga@mail.ru",
      deliveryType: "Пункт выдачи",
      pickupPointId: 3,
      total: 3400 * 2 + 250,
      status: "new",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
      items: {
        create: [{ productId: 3, title: "Серьги «Чёрная роза»", price: 3400, quantity: 2 }],
      },
    },
  });
  console.log("  заказов: 2 (№ 4821 — выполнен, № 4822 — новый)");

  console.log("\nГотово. Проверить данные: GET /api/products, GET /api/components, GET /api/delivery/points");
}

main()
  .catch((error) => {
    console.error("Ошибка заполнения базы:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* ============================================================================
   04 — ЗАПОЛНЕНИЕ БАЗЫ ДАННЫМИ МАГАЗИНА
   ----------------------------------------------------------------------------
   Файл СГЕНЕРИРОВАН скриптом _tools/generate_sql_seed.py из данных фронтенда
   (frontend/app/data/*.ts). Поэтому идентификаторы, названия и цены в базе
   совпадают с тем, что показывает сайт, а также с генератором src/prisma/seed.ts.

   Что вставляется:
     • 4 категории, 3 материала, 5 изделий каталога;
     • 48 компонентов конструктора (36 PNG-слоёв и 12 параметров размера/длины);
     • 5 точек получения (2 самовывоза + 3 пункта выдачи);
     • 2 пользователя: olga@mail.ru / noir1234 (клиент),
                       admin@noir.ru / admin1234 (администратор);
     • 2 авторские сборки «Ольги», одна из них в избранном;
     • 2 заказа в истории (№ 4821 выполнен, № 4822 новый).

   Пароли хранятся только в виде bcrypt-хешей — открытого пароля в базе нет.

   Скрипт можно запускать повторно: перед вставкой данные удаляются
   (порядок удаления учитывает связи между таблицами).
   ============================================================================ */

USE [noir_bijoux];
GO

SET NOCOUNT ON;
GO

/* ------------------------------------------- 1. ОЧИСТКА ПЕРЕД ЗАПОЛНЕНИЕМ --- */
DELETE FROM [dbo].[order_items];
DELETE FROM [dbo].[orders];
DELETE FROM [dbo].[favorites];
DELETE FROM [dbo].[build_items];
DELETE FROM [dbo].[builds];
DELETE FROM [dbo].[products];
DELETE FROM [dbo].[components];
DELETE FROM [dbo].[pickup_points];
DELETE FROM [dbo].[chat_messages];
DELETE FROM [dbo].[users];
DELETE FROM [dbo].[categories];
DELETE FROM [dbo].[materials];
DBCC CHECKIDENT ('dbo.builds', RESEED, 0) WITH NO_INFOMSGS;
DBCC CHECKIDENT ('dbo.orders', RESEED, 0) WITH NO_INFOMSGS;
DBCC CHECKIDENT ('dbo.users', RESEED, 0) WITH NO_INFOMSGS;
GO

/* --------------------------------------------- 2. КАТЕГОРИИ И МАТЕРИАЛЫ --- */
SET IDENTITY_INSERT [dbo].[categories] ON;
INSERT INTO [dbo].[categories] ([id], [name], [slug]) VALUES
    (1, N'Колье', N'necklace'),
    (2, N'Браслет', N'bracelet'),
    (3, N'Серьги', N'earrings'),
    (4, N'Кольцо', N'ring');
SET IDENTITY_INSERT [dbo].[categories] OFF;
SET IDENTITY_INSERT [dbo].[materials] ON;
INSERT INTO [dbo].[materials] ([id], [name]) VALUES
    (1, N'Серебро 925'),
    (2, N'Ювелирный сплав'),
    (3, N'Чёрный родий');
SET IDENTITY_INSERT [dbo].[materials] OFF;

/* ------------------------------------------------- 3. ИЗДЕЛИЯ КАТАЛОГА --- */
SET IDENTITY_INSERT [dbo].[products] ON;
INSERT INTO [dbo].[products] ([id], [name], [slug], [categoryId], [materialId], [price], [imageUrl], [description], [isActive]) VALUES
    (1, N'Браслет «Dark Star»', N'bracelet-dark-star', 2, 2, 3200, N'/assets/catalog/bracelet-dark-star.png', N'Браслет из тёмных бусин с шармом-звездой. Доступны размеры 16, 17 и 18 см.', 1),
    (2, N'Браслет «Лилит»', N'bracelet-lilith', 2, 1, 3900, N'/assets/catalog/bracelet-lilith.png', N'Жемчужный браслет с серебряным шармом. Доступны размеры 16, 17 и 18 см.', 1),
    (3, N'Серьги «Чёрная роза»', N'earrings-black-rose', 3, 3, 3400, N'/assets/catalog/earrings-black-rose.png', N'Серьги с тёмными камнями и фурнитурой с покрытием чёрным родием.', 1),
    (4, N'Колье «Оникс капля»', N'necklace-onyx-drop', 1, 1, 5200, N'/assets/catalog/necklace-onyx-drop.png', N'Колье с подвеской из чёрного оникса. Доступны длины 35 см — чокер и 60 см — матине.', 1),
    (5, N'Колье «Ночная Роза»', N'necklace-rose', 1, 1, 4500, N'/assets/catalog/necklace-rose.png', N'Колье на цепочке с подвеской-розой. Доступны длины 35 см — чокер и 60 см — матине.', 1);
SET IDENTITY_INSERT [dbo].[products] OFF;

/* --------------------------------------- 4. КОМПОНЕНТЫ КОНСТРУКТОРА --- */
SET IDENTITY_INSERT [dbo].[components] ON;
INSERT INTO [dbo].[components] ([id], [name], [jewelryType], [slot], [materialId], [price], [imageUrl], [layerZ], [isActive]) VALUES
    (1, N'Цепочка 1', N'necklace', N'chain', NULL, 1500, N'/assets/components/necklace/chain-1.png', 1, 1),
    (2, N'Цепочка 2', N'necklace', N'chain', NULL, 900, N'/assets/components/necklace/chain-2.png', 1, 1),
    (3, N'Подвеска «Роза»', N'necklace', N'pendant', NULL, 1200, N'/assets/components/necklace/pendant-rose.png', 5, 1),
    (4, N'Подвеска «Оникс»', N'necklace', N'pendant', NULL, 1500, N'/assets/components/necklace/pendant-onyx.png', 5, 1),
    (5, N'Подвеска «Крест»', N'necklace', N'pendant', NULL, 2000, N'/assets/components/necklace/pendant-cross.png', 5, 1),
    (6, N'Карабин', N'necklace', N'clasp', NULL, 300, N'/assets/components/necklace/clasp-bracelet.png', 8, 1),
    (7, N'Магнитная застёжка', N'necklace', N'clasp', NULL, 400, N'/assets/components/necklace/clasp-magnetic.png', 8, 1),
    (8, N'Чокер', N'necklace', N'chain', NULL, 900, N'/assets/components/necklace/choker.png', 1, 1),
    (9, N'Бусины из оникса', N'necklace', N'beads', NULL, 1100, N'/assets/components/necklace/beads-onyx.png', 3, 1),
    (10, N'Подвеска «Him»', N'necklace', N'pendant', NULL, 1000, N'/assets/components/necklace/pendant-him.png', 5, 1),
    (11, N'Подвеска «Lilith»', N'necklace', N'pendant', NULL, 1200, N'/assets/components/necklace/pendant-lilith.png', 5, 1),
    (12, N'35 см — чокер', N'necklace', N'length', NULL, 0, N'', 0, 1),
    (13, N'60 см — матине', N'necklace', N'length', NULL, 350, N'', 0, 1),
    (14, N'Чёрные бусины', N'bracelet', N'beads', NULL, 1200, N'/assets/components/bracelet/beads-black.png', 1, 1),
    (15, N'Бусины с цепочкой', N'bracelet', N'beads', NULL, 1300, N'/assets/components/bracelet/beads-chain.png', 1, 1),
    (16, N'Светлые бусины', N'bracelet', N'beads', NULL, 1400, N'/assets/components/bracelet/beads-white.png', 1, 1),
    (17, N'Шарм «Ангел»', N'bracelet', N'charm', NULL, 700, N'/assets/components/bracelet/charm-angel.png', 6, 1),
    (18, N'Шарм «Крест»', N'bracelet', N'charm', NULL, 900, N'/assets/components/bracelet/charm-cross.png', 6, 1),
    (19, N'Шарм «Him»', N'bracelet', N'charm', NULL, 800, N'/assets/components/bracelet/charm-him.png', 6, 1),
    (20, N'Шарм «Lilith»', N'bracelet', N'charm', NULL, 800, N'/assets/components/bracelet/charm-lilith.png', 6, 1),
    (21, N'Овальный шарм', N'bracelet', N'charm', NULL, 650, N'/assets/components/bracelet/charm-oval.png', 6, 1),
    (22, N'Шарм «Звезда»', N'bracelet', N'charm', NULL, 700, N'/assets/components/bracelet/charm-star.png', 6, 1),
    (23, N'Карабин', N'bracelet', N'clasp', NULL, 400, N'/assets/components/bracelet/clasp-bracelet.png', 8, 1),
    (24, N'Застёжка-сердце', N'bracelet', N'clasp', NULL, 450, N'/assets/components/bracelet/clasp-heart.png', 8, 1),
    (25, N'Магнитная застёжка', N'bracelet', N'clasp', NULL, 450, N'/assets/components/bracelet/clasp-magnetic.png', 8, 1),
    (26, N'16 см', N'bracelet', N'size', NULL, 0, N'', 0, 1),
    (27, N'17 см', N'bracelet', N'size', NULL, 0, N'', 0, 1),
    (28, N'18 см', N'bracelet', N'size', NULL, 100, N'', 0, 1),
    (29, N'Английский замок', N'earrings', N'clasp', NULL, 900, N'/assets/components/earrings/lock-english.png', 8, 1),
    (30, N'Пуссеты', N'earrings', N'clasp', NULL, 300, N'/assets/components/earrings/lock-studs.png', 8, 1),
    (31, N'Камень «Чёрная роза»', N'earrings', N'stone', NULL, 1500, N'/assets/components/earrings/stone-black-rose.png', 5, 1),
    (32, N'Камень «Крест»', N'earrings', N'stone', NULL, 900, N'/assets/components/earrings/stone-cross.png', 5, 1),
    (33, N'Оникс', N'earrings', N'stone', NULL, 1000, N'/assets/components/earrings/stone-onyx.png', 5, 1),
    (34, N'Жемчуг', N'earrings', N'stone', NULL, 1100, N'/assets/components/earrings/stone-pearle.png', 5, 1),
    (35, N'Короткие (до 2 см)', N'earrings', N'length', NULL, 0, N'', 0, 1),
    (36, N'Средние (3–4 см)', N'earrings', N'length', NULL, 150, N'', 0, 1),
    (37, N'Длинные (5 см и более)', N'earrings', N'length', NULL, 300, N'', 0, 1),
    (38, N'Профиль «Классика», золото', N'ring', N'profile', NULL, 2500, N'/assets/components/ring/profile-classic-gold.png', 1, 1),
    (39, N'Профиль «Классика», серебро', N'ring', N'profile', NULL, 2300, N'/assets/components/ring/profile-classic-silver.png', 1, 1),
    (40, N'Профиль «Плоский», золото', N'ring', N'profile', NULL, 2500, N'/assets/components/ring/profile-flat-gold.png', 1, 1),
    (41, N'Профиль «Плоский», серебро', N'ring', N'profile', NULL, 2300, N'/assets/components/ring/profile-flat-silver.png', 1, 1),
    (42, N'Оникс, золото', N'ring', N'stone', NULL, 1200, N'/assets/components/ring/stone-onyx-gold.png', 6, 1),
    (43, N'Оникс, серебро', N'ring', N'stone', NULL, 1200, N'/assets/components/ring/stone-onyx-silver.png', 6, 1),
    (44, N'Жемчуг', N'ring', N'stone', NULL, 1500, N'/assets/components/ring/stone-pearl.png', 6, 1),
    (45, N'Размер 16', N'ring', N'size', NULL, 0, N'', 0, 1),
    (46, N'Размер 17', N'ring', N'size', NULL, 0, N'', 0, 1),
    (47, N'Размер 18', N'ring', N'size', NULL, 0, N'', 0, 1),
    (48, N'Размер 19', N'ring', N'size', NULL, 0, N'', 0, 1);
SET IDENTITY_INSERT [dbo].[components] OFF;

/* -------------------------------------------- 5. ТОЧКИ ПОЛУЧЕНИЯ --- */
SET IDENTITY_INSERT [dbo].[pickup_points] ON;
INSERT INTO [dbo].[pickup_points] ([id], [kind], [provider], [city], [address], [workHours], [phone]) VALUES
    (1, N'pickup', N'Мастерская Noir Bijoux', N'Новосибирск', N'ул. Дуси Ковальчук, 250, 2 этаж, офис 12', N'Пн–Пт 10:00–19:00, Сб 11:00–16:00', N'+7 (383) 000-00-01'),
    (2, N'pickup', N'Шоурум «Aesthetics»', N'Новосибирск', N'Красный проспект, 100, 1 этаж', N'Ежедневно 10:00–20:00', N'+7 (383) 000-00-02'),
    (3, N'pvz', N'ПВЗ СДЭК', N'Новосибирск', N'ул. Ленина, 12', N'Пн–Сб 10:00–20:00', NULL),
    (4, N'pvz', N'ПВЗ Boxberry', N'Новосибирск', N'ул. Гоголя, 15', N'Пн–Пт 09:00–19:00', NULL),
    (5, N'pvz', N'ПВЗ СДЭК', N'Бердск', N'ул. Первомайская, 8', N'Пн–Сб 10:00–19:00', NULL);
SET IDENTITY_INSERT [dbo].[pickup_points] OFF;

/* ---------------------------------------------------- 6. ПОЛЬЗОВАТЕЛИ ---
   Пароли: noir1234 (клиент) и admin1234 (администратор) — в виде bcrypt-хешей. */
INSERT INTO [dbo].[users] ([email], [password], [fullName], [phone], [role]) VALUES
    (N'olga@mail.ru', N'$2b$10$4eEsF97qrPEIKtw0oLB1.eeRCkcTjgx.3JKDQw0.yzzl9i4.8JMA6', N'Ольга Иванова', N'+7 (999) 000-00-00', N'client'),
    (N'admin@noir.ru', N'$2b$10$ZIy3eXImL9726zcSPIaG4eOj2qiWlMHHrfL3GNngR0fqi44/XfW0O', N'Администратор Noir Bijoux', N'+7 (383) 000-00-01', N'admin');
DECLARE @olgaId INT = (SELECT [id] FROM [dbo].[users] WHERE [email] = N'olga@mail.ru');

/* ------------------------------- 7. АВТОРСКИЕ СБОРКИ И ИЗБРАННОЕ --- */
INSERT INTO [dbo].[builds] ([userId], [jewelryType], [article], [totalPrice]) VALUES
    (@olgaId, N'necklace', N'NB-NK-1-3-6-12', 3000);
DECLARE @buildNBNK13612 INT = (SELECT [id] FROM [dbo].[builds] WHERE [article] = N'NB-NK-1-3-6-12');
INSERT INTO [dbo].[build_items] ([buildId], [componentId], [layerZ]) VALUES
    (@buildNBNK13612, 1, 1),
    (@buildNBNK13612, 3, 5),
    (@buildNBNK13612, 6, 8),
    (@buildNBNK13612, 12, 0);
INSERT INTO [dbo].[builds] ([userId], [jewelryType], [article], [totalPrice]) VALUES
    (@olgaId, N'bracelet', N'NB-BR-14-22-23-27', 2300);
DECLARE @buildNBBR14222327 INT = (SELECT [id] FROM [dbo].[builds] WHERE [article] = N'NB-BR-14-22-23-27');
INSERT INTO [dbo].[build_items] ([buildId], [componentId], [layerZ]) VALUES
    (@buildNBBR14222327, 14, 1),
    (@buildNBBR14222327, 22, 6),
    (@buildNBBR14222327, 23, 8),
    (@buildNBBR14222327, 27, 0);
INSERT INTO [dbo].[favorites] ([userId], [buildId]) VALUES
    (@olgaId, @buildNBNK13612);   -- сборка в избранном

/* ------------------------------------------------------- 8. ЗАКАЗЫ ---
   Заказ № 4821 — выполнен (изделие + авторская сборка), № 4822 — новый (2 пары серёг). */
INSERT INTO [dbo].[orders] ([orderNumber], [userId], [customerName], [phone], [email], [deliveryType], [pickupPointId], [total], [status], [createdAt]) VALUES
    (N'4821', @olgaId, N'Ольга Иванова', N'+7 (999) 000-00-00', N'olga@mail.ru', N'Самовывоз', 1, 6200, N'done', DATEADD(DAY, -12, SYSDATETIME()));
INSERT INTO [dbo].[orders] ([orderNumber], [userId], [customerName], [phone], [email], [deliveryType], [pickupPointId], [total], [status], [createdAt]) VALUES
    (N'4822', @olgaId, N'Ольга Иванова', N'+7 (999) 000-00-00', N'olga@mail.ru', N'Пункт выдачи', 3, 7050, N'new', DATEADD(DAY, -2, SYSDATETIME()));

DECLARE @order1 INT = (SELECT [id] FROM [dbo].[orders] WHERE [orderNumber] = N'4821');
DECLARE @order2 INT = (SELECT [id] FROM [dbo].[orders] WHERE [orderNumber] = N'4822');

INSERT INTO [dbo].[order_items] ([orderId], [productId], [buildId], [title], [price], [quantity]) VALUES
    (@order1, 1, NULL, N'Браслет «Dark Star»', 3200, 1),
    (@order1, NULL, @buildNBNK13612, N'Колье (авторская сборка NB-NK-1-3-6-12)', 3000, 1),
    (@order2, 3, NULL, N'Серьги «Чёрная роза»', 3400, 2);

/* ------------------------------------------------------- 9. ПРОВЕРКА --- */
SELECT [Таблица] = t.name, [Строк] = p.rows
FROM sys.tables AS t
JOIN sys.partitions AS p ON p.object_id = t.object_id AND p.index_id IN (0, 1)
ORDER BY t.name;
GO

PRINT N'База заполнена. Вход на сайт: olga@mail.ru / noir1234 (клиент), admin@noir.ru / admin1234 (администратор).';
GO

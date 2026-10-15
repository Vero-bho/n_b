// ─────────────────────────────────────────────────────────────────────────────
// Типы и интерфейсы приложения (занятие 10 — папка types)
// ─────────────────────────────────────────────────────────────────────────────

/** Тип изделия так, как он показывается пользователю */
export type JewelryType = "Колье" | "Браслет" | "Серьги" | "Кольцо";

/** Тип изделия для адресов и данных (латиницей) */
export type JewelrySlug = "necklace" | "bracelet" | "earrings" | "ring";

/** Слот (категория) компонента в конструкторе */
export type ComponentSlot =
  | "chain" // цепочка / основа колье
  | "pendant" // подвеска
  | "clasp" // застёжка
  | "length" // длина (без картинки)
  | "beads" // бусины
  | "charm" // шарм / висюлька
  | "stone" // камень
  | "material" // материал основы
  | "size" // размер (без картинки)
  | "profile"; // профиль / форма

/** Вкладка конструктора */
export interface SlotConfig {
  slot: ComponentSlot;
  title: string;
  /** true — можно выбрать несколько компонентов (например, шармы) */
  multiple?: boolean;
}

/** Готовое изделие каталога */
export interface CatalogProduct {
  id: number;
  name: string;
  slug: string;
  type: JewelryType;
  typeSlug: JewelrySlug;
  material: string;
  price: number;
  image: string;
  description: string;
}

/** Компонент конструктора */
export interface JewelryComponent {
  id: number;
  name: string;
  slot: ComponentSlot;
  jewelryType: JewelrySlug;
  price: number;
  /** PNG/SVG-слой для наложения на эскиз; у «длины» и «размера» картинки нет */
  image?: string;
  /** Порядок наложения слоёв: больше число — выше слой */
  layerZ: number;
}

/** Описание типа изделия (карточка «С чего начнем творить?») */
export interface JewelryTypeInfo {
  type: JewelryType;
  slug: JewelrySlug;
  icon: string;
  description: string;
  image: string;
}

/** Сохранённая (избранная) сборка */
export interface SavedBuild {
  id: string;
  article: string;
  jewelryType: JewelrySlug;
  jewelryTitle: string;
  totalPrice: number;
  createdAt: string;
  components: Array<{ name: string; price: number; slot: ComponentSlot; image?: string; layerZ: number; }>;
}

/** Позиция корзины: готовое изделие или сборка из конструктора */
export interface CartItem {
  /** уникальный ключ: `product-3` или `build-NB-NK-2-4-6` */
  key: string;
  kind: "product" | "build";
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  article?: string;
}

export type DeliveryType = "Самовывоз" | "Курьер" | "Пункт выдачи";

/** Точка самовывоза или ПВЗ */
export interface DeliveryPoint {
  id: number;
  kind: "pickup" | "pvz";
  provider: string;
  city: string;
  address: string;
  workHours: string;
  phone?: string;
}

export type OrderStatus = "new" | "confirmed" | "making" | "ready" | "done" | "canceled";

export interface OrderItem {
  key: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryType: DeliveryType;
  deliveryPoint?: string;
  address?: string;
  comment?: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export interface CheckoutFormValues {
  customerName: string;
  phone: string;
  email?: string;
  deliveryType: DeliveryType;
  comment?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface AddressFormValues {
  city: string;
  street: string;
  house: string;
  flat?: string;
  index?: string;
}

export interface ProfileFormValues {
  fullName: string;
  phone: string;
  email: string;
}

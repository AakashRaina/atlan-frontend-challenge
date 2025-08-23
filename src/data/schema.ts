/* Schema types and table definitions for the mock SQL runner */

// Row types
export type Region = {
  region_id: number;
  region_name: string;
};

export type Customer = {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  region_id: number;
  created_at: string; // ISO
};

export type Shipper = {
  shipper_id: number;
  shipper_name: string;
  phone: string;
};

export type Supplier = {
  supplier_id: number;
  supplier_name: string;
  contact_name: string;
  phone: string;
  region_id: number;
};

export type Category = {
  category_id: number;
  category_name: string;
  description: string;
};

export type Product = {
  product_id: number;
  product_name: string;
  category_id: number;
  supplier_id: number;
  unit_price: number;
  units_in_stock: number;
  discontinued: 0 | 1;
};

export type Order = {
  order_id: number;
  customer_id: number;
  order_date: string; // ISO
  required_date: string; // ISO
  shipped_date: string | null; // ISO
  shipper_id: number;
  freight: number;
  ship_name: string;
  ship_city: string;
  ship_region_id: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
};

export type OrderItem = {
  order_item_id: number;
  order_id: number;
  product_id: number;
  unit_price: number;
  quantity: number;
  discount: number; // 0..0.3
};

// Aggregate row types (handy for typing db shape)
export type RowTypes = {
  regions: Region;
  customers: Customer;
  shippers: Shipper;
  suppliers: Supplier;
  categories: Category;
  products: Product;
  orders: Order;
  order_items: OrderItem;
};

// Column/table schema types for UI/validation/autocomplete
export type ColumnSchema = {
  name: string;
  type: "INTEGER" | "TEXT" | "REAL";
  nullable?: boolean;
  primaryKey?: boolean;
  references?: { table: string; column: string };
};

export type TableSchema = {
  name: string;
  columns: ColumnSchema[];
};

export const schema: Record<string, TableSchema> = {
  regions: {
    name: "regions",
    columns: [
      { name: "region_id", type: "INTEGER", primaryKey: true },
      { name: "region_name", type: "TEXT" },
    ],
  },
  customers: {
    name: "customers",
    columns: [
      { name: "customer_id", type: "INTEGER", primaryKey: true },
      { name: "first_name", type: "TEXT" },
      { name: "last_name", type: "TEXT" },
      { name: "email", type: "TEXT" },
      { name: "phone", type: "TEXT" },
      {
        name: "region_id",
        type: "INTEGER",
        references: { table: "regions", column: "region_id" },
      },
      { name: "created_at", type: "TEXT" },
    ],
  },
  shippers: {
    name: "shippers",
    columns: [
      { name: "shipper_id", type: "INTEGER", primaryKey: true },
      { name: "shipper_name", type: "TEXT" },
      { name: "phone", type: "TEXT" },
    ],
  },
  suppliers: {
    name: "suppliers",
    columns: [
      { name: "supplier_id", type: "INTEGER", primaryKey: true },
      { name: "supplier_name", type: "TEXT" },
      { name: "contact_name", type: "TEXT" },
      { name: "phone", type: "TEXT" },
      {
        name: "region_id",
        type: "INTEGER",
        references: { table: "regions", column: "region_id" },
      },
    ],
  },
  categories: {
    name: "categories",
    columns: [
      { name: "category_id", type: "INTEGER", primaryKey: true },
      { name: "category_name", type: "TEXT" },
      { name: "description", type: "TEXT" },
    ],
  },
  products: {
    name: "products",
    columns: [
      { name: "product_id", type: "INTEGER", primaryKey: true },
      { name: "product_name", type: "TEXT" },
      {
        name: "category_id",
        type: "INTEGER",
        references: { table: "categories", column: "category_id" },
      },
      {
        name: "supplier_id",
        type: "INTEGER",
        references: { table: "suppliers", column: "supplier_id" },
      },
      { name: "unit_price", type: "REAL" },
      { name: "units_in_stock", type: "INTEGER" },
      { name: "discontinued", type: "INTEGER" },
    ],
  },
  orders: {
    name: "orders",
    columns: [
      { name: "order_id", type: "INTEGER", primaryKey: true },
      {
        name: "customer_id",
        type: "INTEGER",
        references: { table: "customers", column: "customer_id" },
      },
      { name: "order_date", type: "TEXT" },
      { name: "required_date", type: "TEXT" },
      { name: "shipped_date", type: "TEXT", nullable: true },
      {
        name: "shipper_id",
        type: "INTEGER",
        references: { table: "shippers", column: "shipper_id" },
      },
      { name: "freight", type: "REAL" },
      { name: "ship_name", type: "TEXT" },
      { name: "ship_city", type: "TEXT" },
      {
        name: "ship_region_id",
        type: "INTEGER",
        references: { table: "regions", column: "region_id" },
      },
      { name: "status", type: "TEXT" },
    ],
  },
  order_items: {
    name: "order_items",
    columns: [
      { name: "order_item_id", type: "INTEGER", primaryKey: true },
      {
        name: "order_id",
        type: "INTEGER",
        references: { table: "orders", column: "order_id" },
      },
      {
        name: "product_id",
        type: "INTEGER",
        references: { table: "products", column: "product_id" },
      },
      { name: "unit_price", type: "REAL" },
      { name: "quantity", type: "INTEGER" },
      { name: "discount", type: "REAL" },
    ],
  },
};

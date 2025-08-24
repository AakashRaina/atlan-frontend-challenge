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
  type:
    | "SERIAL"
    | "INTEGER"
    | "VARCHAR"
    | "TEXT"
    | "DECIMAL"
    | "TIMESTAMP"
    | "DATE"
    | "BOOLEAN"
    | "ENUM";
  length?: number;
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
      { name: "region_id", type: "SERIAL", primaryKey: true },
      { name: "region_name", type: "VARCHAR", length: 100 },
    ],
  },
  customers: {
    name: "customers",
    columns: [
      { name: "customer_id", type: "SERIAL", primaryKey: true },
      { name: "first_name", type: "VARCHAR", length: 50 },
      { name: "last_name", type: "VARCHAR", length: 50 },
      { name: "email", type: "VARCHAR", length: 255 },
      { name: "phone", type: "VARCHAR", length: 20 },
      {
        name: "region_id",
        type: "INTEGER",
        references: { table: "regions", column: "region_id" },
      },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  shippers: {
    name: "shippers",
    columns: [
      { name: "shipper_id", type: "SERIAL", primaryKey: true },
      { name: "shipper_name", type: "VARCHAR", length: 100 },
      { name: "phone", type: "VARCHAR", length: 20 },
    ],
  },
  suppliers: {
    name: "suppliers",
    columns: [
      { name: "supplier_id", type: "SERIAL", primaryKey: true },
      { name: "supplier_name", type: "VARCHAR", length: 100 },
      { name: "contact_name", type: "VARCHAR", length: 100 },
      { name: "phone", type: "VARCHAR", length: 20 },
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
      { name: "category_id", type: "SERIAL", primaryKey: true },
      { name: "category_name", type: "VARCHAR", length: 50 },
      { name: "description", type: "TEXT" },
    ],
  },
  products: {
    name: "products",
    columns: [
      { name: "product_id", type: "SERIAL", primaryKey: true },
      { name: "product_name", type: "VARCHAR", length: 100 },
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
      { name: "unit_price", type: "DECIMAL" },
      { name: "units_in_stock", type: "INTEGER" },
      { name: "discontinued", type: "BOOLEAN" },
    ],
  },
  orders: {
    name: "orders",
    columns: [
      { name: "order_id", type: "SERIAL", primaryKey: true },
      {
        name: "customer_id",
        type: "INTEGER",
        references: { table: "customers", column: "customer_id" },
      },
      { name: "order_date", type: "DATE" },
      { name: "required_date", type: "DATE" },
      { name: "shipped_date", type: "DATE", nullable: true },
      {
        name: "shipper_id",
        type: "INTEGER",
        references: { table: "shippers", column: "shipper_id" },
      },
      { name: "freight", type: "DECIMAL" },
      { name: "ship_name", type: "VARCHAR", length: 100 },
      { name: "ship_city", type: "VARCHAR", length: 50 },
      {
        name: "ship_region_id",
        type: "INTEGER",
        references: { table: "regions", column: "region_id" },
      },
      { name: "status", type: "ENUM" },
    ],
  },
  order_items: {
    name: "order_items",
    columns: [
      { name: "order_item_id", type: "SERIAL", primaryKey: true },
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
      { name: "unit_price", type: "DECIMAL" },
      { name: "quantity", type: "INTEGER" },
      { name: "discount", type: "DECIMAL" },
    ],
  },
  // Analytics database tables (mock schemas for demo)
  sales_metrics: {
    name: "sales_metrics",
    columns: [
      { name: "metric_id", type: "SERIAL", primaryKey: true },
      { name: "date", type: "DATE" },
      { name: "revenue", type: "DECIMAL" },
      { name: "orders_count", type: "INTEGER" },
      { name: "avg_order_value", type: "DECIMAL" },
    ],
  },
  user_analytics: {
    name: "user_analytics",
    columns: [
      { name: "user_id", type: "SERIAL", primaryKey: true },
      { name: "session_count", type: "INTEGER" },
      { name: "page_views", type: "INTEGER" },
      { name: "bounce_rate", type: "DECIMAL" },
      { name: "last_active", type: "TIMESTAMP" },
    ],
  },
  revenue_reports: {
    name: "revenue_reports",
    columns: [
      { name: "report_id", type: "SERIAL", primaryKey: true },
      { name: "period", type: "VARCHAR", length: 20 },
      { name: "total_revenue", type: "DECIMAL" },
      { name: "growth_rate", type: "DECIMAL" },
      { name: "generated_at", type: "TIMESTAMP" },
    ],
  },
  conversion_funnel: {
    name: "conversion_funnel",
    columns: [
      { name: "funnel_id", type: "SERIAL", primaryKey: true },
      { name: "step_name", type: "VARCHAR", length: 100 },
      { name: "visitors", type: "INTEGER" },
      { name: "conversions", type: "INTEGER" },
      { name: "conversion_rate", type: "DECIMAL" },
    ],
  },
  traffic_sources: {
    name: "traffic_sources",
    columns: [
      { name: "source_id", type: "SERIAL", primaryKey: true },
      { name: "source_name", type: "VARCHAR", length: 100 },
      { name: "visitors", type: "INTEGER" },
      { name: "sessions", type: "INTEGER" },
      { name: "avg_session_duration", type: "DECIMAL" },
    ],
  },
  campaign_performance: {
    name: "campaign_performance",
    columns: [
      { name: "campaign_id", type: "SERIAL", primaryKey: true },
      { name: "campaign_name", type: "VARCHAR", length: 100 },
      { name: "impressions", type: "INTEGER" },
      { name: "clicks", type: "INTEGER" },
      { name: "ctr", type: "DECIMAL" },
      { name: "cost", type: "DECIMAL" },
    ],
  },
};

/* Mock data rows for the schema (no real SQL execution) */
import type {
  RowTypes,
  Region,
  Customer,
  Shipper,
  Supplier,
  Category,
  Product,
  Order,
  OrderItem,
} from "@/data/schema";

// Database shape for the mock data rows
export type Database = { [K in keyof RowTypes]: RowTypes[K][] };

import { addDays, toISO } from "@/lib/database-utils";
const idxPick = <T>(arr: T[], index: number): T => arr[index % arr.length];
const priceFromIndex = (i: number): number =>
  parseFloat(((((i * 97) % 3000) + 200) / 100).toFixed(2));
const stockFromIndex = (i: number): number => (i * 13) % 201;

// Seed vocabularies for mock data generation
const regionNames = [
  "North-East",
  "North-West",
  "South-East",
  "South-West",
  "Mid-West",
  "Pacific",
  "Mountain",
  "Atlantic",
  "Central",
  "Gulf",
  "Great Lakes",
  "Plains",
  "Desert",
  "Coastal",
  "Highlands",
  "Lowlands",
  "Valley",
  "Delta",
  "Forest",
  "Tundra",
  "Steppe",
  "Savanna",
  "Rainforest",
  "Taiga",
  "Cape",
  "Peninsula",
  "Archipelago",
  "Basin",
  "Plateau",
  "Foothills",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
];

const firstNames = [
  "Alex",
  "Jordan",
  "Taylor",
  "Casey",
  "Riley",
  "Morgan",
  "Quinn",
  "Avery",
  "Harper",
  "Reese",
  "Parker",
  "Rowan",
  "Skyler",
  "Drew",
  "Hayden",
  "Jamie",
  "Kendall",
  "Logan",
  "Peyton",
  "Blake",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
];

const shipperNames = [
  "Speedy Express",
  "United Package",
  "Federal Shipping",
  "Arrow Logistics",
  "Blue Dart",
  "Oceanic Freight",
  "AirWave Couriers",
  "RoadRunner",
  "UrbanShip",
  "Prime Carrier",
  "NovaShip",
  "SwiftLink",
  "ParcelPro",
  "RapidX",
  "CargoHub",
  "ShipRight",
  "NextDay",
  "GlobalTrans",
  "MetroFreight",
  "Eagle Logistics",
];

const supplierNames = [
  "Acme Foods",
  "Global Produce",
  "Fresh Farms",
  "Sunrise Suppliers",
  "GreenLeaf",
  "Northern Goods",
  "Pacific Imports",
  "Summit Traders",
  "Highland Provisions",
  "Golden Harvest",
  "Silverline Co.",
  "Riverbend Supply",
  "BlueSky Trading",
  "Oak & Vine",
  "Crescent Wholesale",
  "Everest Foods",
  "Cascade Foods",
  "Prairie Produce",
  "Seaside Imports",
  "Desert Goods",
];

const categoryNames = [
  "Beverages",
  "Condiments",
  "Confections",
  "Dairy",
  "Grains/Cereals",
  "Meat/Poultry",
  "Produce",
  "Seafood",
  "Snacks",
  "Frozen Foods",
  "Baked Goods",
  "Canned Foods",
  "Spices",
  "Sauces",
  "Oils & Vinegars",
  "Health Foods",
  "Organic",
  "Gourmet",
  "International",
  "House Brands",
];

const productWordsA = [
  "Classic",
  "Premium",
  "Organic",
  "Artisan",
  "Smoked",
  "Roasted",
  "Spicy",
  "Sweet",
  "Savory",
  "Crispy",
  "Creamy",
  "Tangy",
];

const productWordsB = [
  "Cola",
  "Tea",
  "Coffee",
  "Cookies",
  "Chocolate",
  "Cheese",
  "Pasta",
  "Rice",
  "Olive Oil",
  "Vinegar",
  "Chips",
  "Yogurt",
  "Salmon",
  "Tuna",
  "Chicken",
  "Beef",
  "Granola",
  "Nuts",
];

// Counts (20–30 as requested)
const REGION_COUNT = 20;
const CUSTOMER_COUNT = 25;
const SHIPPER_COUNT = 20;
const SUPPLIER_COUNT = 20;
const CATEGORY_COUNT = 20;
const PRODUCT_COUNT = 25;
const ORDER_COUNT = 25;
const ORDER_ITEM_COUNT = 30;

export const regions: Region[] = Array.from(
  { length: REGION_COUNT },
  (_, i) => ({
    region_id: i + 1,
    region_name: regionNames[i % regionNames.length],
  })
);

export const shippers: Shipper[] = Array.from(
  { length: SHIPPER_COUNT },
  (_, i) => ({
    shipper_id: i + 1,
    shipper_name: shipperNames[i % shipperNames.length],
    phone: `+1-555-${String(1000 + i).padStart(4, "0")}`,
  })
);

export const suppliers: Supplier[] = Array.from(
  { length: SUPPLIER_COUNT },
  (_, i) => ({
    supplier_id: i + 1,
    supplier_name: supplierNames[i % supplierNames.length],
    contact_name: `${idxPick(firstNames, i)} ${idxPick(lastNames, i * 2)}`,
    phone: `+1-444-${String(2000 + i).padStart(4, "0")}`,
    region_id: regions[(i * 7) % regions.length].region_id,
  })
);

export const categories: Category[] = Array.from(
  { length: CATEGORY_COUNT },
  (_, i) => ({
    category_id: i + 1,
    category_name: categoryNames[i % categoryNames.length],
    description: `${categoryNames[i % categoryNames.length]} related products`,
  })
);

export const products: Product[] = Array.from(
  { length: PRODUCT_COUNT },
  (_, i) => {
    const category = categories[(i * 3) % categories.length];
    const supplier = suppliers[(i * 5) % suppliers.length];
    const name = `${idxPick(productWordsA, i)} ${idxPick(
      productWordsB,
      i * 2
    )}`;
    return {
      product_id: i + 1,
      product_name: name,
      category_id: category.category_id,
      supplier_id: supplier.supplier_id,
      unit_price: priceFromIndex(i),
      units_in_stock: stockFromIndex(i),
      discontinued: i % 10 === 0 ? 1 : 0,
    };
  }
);

export const customers: Customer[] = Array.from(
  { length: CUSTOMER_COUNT },
  (_, i) => {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[(i * 3) % lastNames.length];
    const region = regions[(i * 2) % regions.length];
    const created = addDays(
      new Date("2023-01-01T00:00:00.000Z"),
      (i * 17) % 366
    );
    return {
      customer_id: i + 1,
      first_name: first,
      last_name: last,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      phone: `+1-333-${String(3000 + i).padStart(4, "0")}`,
      region_id: region.region_id,
      created_at: toISO(created),
    };
  }
);

export const orders: Order[] = Array.from({ length: ORDER_COUNT }, (_, i) => {
  const customer = customers[(i * 7) % customers.length];
  const shipper = shippers[(i * 3) % shippers.length];
  const orderDate = addDays(
    new Date("2024-01-01T00:00:00.000Z"),
    (i * 11) % 121
  );
  const required = addDays(orderDate, ((i * 7) % 13) + 2);
  const shipped = i % 5 !== 0 ? addDays(orderDate, ((i * 3) % 10) + 1) : null;
  const status: Order["status"] = shipped
    ? i % 7 !== 0
      ? "Delivered"
      : "Shipped"
    : i % 20 === 0
    ? "Cancelled"
    : "Pending";

  return {
    order_id: i + 1,
    customer_id: customer.customer_id,
    order_date: toISO(orderDate),
    required_date: toISO(required),
    shipped_date: shipped ? toISO(shipped) : null,
    shipper_id: shipper.shipper_id,
    freight: priceFromIndex(100 + i),
    ship_name: `${customer.first_name} ${customer.last_name}`,
    ship_city: idxPick(cities, i * 3),
    ship_region_id: customer.region_id,
    status,
  };
});

export const order_items: OrderItem[] = (() => {
  const rows: OrderItem[] = [];
  let id = 1;
  for (let i = 0; i < ORDER_ITEM_COUNT; i++) {
    const order = orders[(i * 5) % orders.length];
    const product = products[(i * 11) % products.length];
    const qty = (i % 10) + 1;
    const disc =
      i % 5 === 0 ? parseFloat(((5 + (i % 26)) / 100).toFixed(2)) : 0;
    rows.push({
      order_item_id: id++,
      order_id: order.order_id,
      product_id: product.product_id,
      unit_price: product.unit_price,
      quantity: qty,
      discount: disc,
    });
  }
  return rows;
})();

export const db: Database = {
  regions,
  customers,
  shippers,
  suppliers,
  categories,
  products,
  orders,
  order_items,
};

"use server";

import { client } from "../db/postgres";

export type Item = {
  id: number;
  title: string;
  barcode: string;
  category: string;
  store: string;
  brand: string;
  quantity: number;
  warranty_start_date: string; // Ensure it's a string
  warranty_end_date: string; // Ensure it's a string
  supplier_name: string;
  invoice_number: string;
  unit_price: number;
  memo: string;
};

// Function to format dates to YYYY-MM-DD
const formatDate = (date: Date | null): string => {
  return date ? date.toISOString().split("T")[0] : "N/A"; // Converts to "YYYY-MM-DD"
};

// Fetch all items with category and store names
export async function getAllItems(): Promise<Item[]> {
  try {
    const items = await client`
      SELECT 
        i.id,
        i.title,
        i.barcode,
        c.name AS category,
        s.name AS store,
        i.brand,
        i.quantity,
        i.warranty_start_date,
        i.warranty_end_date,
        i.invoice_number,
        sup.short_name AS "supplier_name",
        i.unit_price,
        i.memo
      FROM physical_item i
      LEFT JOIN item_category c ON i.category_id = c.id
      LEFT JOIN store s ON i.store_id = s.id
      LEFT JOIN supplier sup ON i.supplier_id = sup.id
      ORDER BY i.id DESC
    `;

    // Convert Date fields before returning
    return items.map((item) => ({
      ...item,
      warranty_start_date: formatDate(item.warranty_start_date),
      warranty_end_date: formatDate(item.warranty_end_date),
    })) as Item[];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { client } from "../db/postgres";

export async function addItem(formData: FormData) {
  // Parse input data
  const title = formData.get("title") as string;
  const barcode = formData.get("barcode") as string;
  const categoryId = Number(formData.get("category-id"));
  const storeId = Number(formData.get("store-id"));
  const brand = formData.get("brand") as string;
  const quantity = Number(formData.get("quantity"));
  const warrantyStart = formData.get("warranty-start") as string;
  const warrantyEnd = formData.get("warranty-end") as string;
  const invoiceNumber = formData.get("invoice-number") as string;
  const invoiceSupplierCode = formData.get("invoice-supplier-code") as string;
  const memo = formData.get("memo") as string;

  const organizationId = 1; // Hard coded MiraiTS

  try {
    await client`INSERT INTO physical_item (
      title,
      barcode,
      category_id,
      store_id,
      brand,
      quantity,
      warranty_start_date,
      warranty_end_date,
      invoice_number,
      invoice_supplier_code,
      organization_id,
      memo
    ) VALUES (
      ${title},
      ${barcode},
      ${categoryId},
      ${storeId},
      ${brand},
      ${quantity},
      ${warrantyStart},
      ${warrantyEnd},
      ${invoiceNumber},
      ${invoiceSupplierCode},
      ${organizationId},
      ${memo}
    )`;
  } catch (error) {
    console.error("Error inserting item:", error);
    return;
  }

  // Revalidate and redirect after adding an item
  revalidatePath("/warehouse/list");
  redirect("/warehouse/list");
}

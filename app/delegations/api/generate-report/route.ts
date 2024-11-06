import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { client } from "@/lib/db/postgres";

// Helper function to format dates to "dd.mm.yy hh:mm"
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

async function getDelegationsList() {
  const delegations = await client`
    SELECT
      delegation_id, start_time, start_location, end_time, end_location,
      start_meter, end_meter, (end_meter - start_meter) AS distance
    FROM trip
    ORDER BY delegation_id;
  `;

  // Generate LaTeX table format
  const header = `
\\begin{table}[h!]
\\centering
\\begin{tabular}{|c|c|c|c|c|c|c|c|}
\\hline
Delegation ID & Start Time & Start Location & End Time & End Location & Start Meter & End Meter & Distance \\\\
\\hline
`;

  const rows = delegations
    .map((row) => {
      return `${row.delegation_id} & ${formatDate(row.start_time)} & ${row.start_location} & ${formatDate(row.end_time)} & ${row.end_location} & ${row.start_meter} & ${row.end_meter} & ${row.distance} \\\\ \\hline`;
    })
    .join("\n");

  const footer = `
\\end{tabular}
\\caption{Delegations List}
\\end{table}
`;

  // Combine header, rows, and footer to form full table
  const latexTable = header + rows + footer;
  return latexTable;
}

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "generated_table.tex");
  const content = await getDelegationsList();

  try {
    await fs.writeFile(filePath, content);
    return NextResponse.json({
      message: "File generated successfully in LaTeX format",
      filePath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate file: " + error },
      { status: 500 },
    );
  }
}

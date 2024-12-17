import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { client } from "@/lib/db/postgres";

// Helper function to format dates to "dd.mm.yy hh:mm"
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Query to fetch trips for a specific month
async function getDelegationsList(month: string) {
  // Ensure month is valid
  if (!month || !/\d{4}-\d{2}/.test(month)) {
    throw new Error("Invalid month format. Use YYYY-MM.");
  }

  const startOfMonth = `${month}-01`;
  const endOfMonth = new Date(
    new Date(startOfMonth).getFullYear(),
    new Date(startOfMonth).getMonth() + 1,
    0,
  );

  const delegations = await client`
    SELECT
      delegation_id, start_time, start_location, end_time, end_location,
      start_meter, end_meter, (end_meter - start_meter) AS distance
    FROM trip
    WHERE start_time >= ${startOfMonth} AND start_time <= ${endOfMonth}
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
\\caption{Delegations Report for ${month}}
\\end{table}
`;

  return header + rows + footer;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");

    if (!month) {
      return NextResponse.json(
        { error: "Month parameter is required" },
        { status: 400 },
      );
    }

    // Define the correct filename and path
    const fileName = `report_${month}.tex`;
    const filePath = path.join(process.cwd(), "public", fileName);
    const publicUrlPath = `/${fileName}`; // This is the path accessible via the browser

    // Generate the LaTeX table content
    const content = await getDelegationsList(month);

    // Write the file to the public folder
    await fs.writeFile(filePath, content);

    return NextResponse.json({
      message: "File generated successfully",
      filePath: publicUrlPath, // Return the public URL path
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate file: " + error.message },
      { status: 500 },
    );
  }
}

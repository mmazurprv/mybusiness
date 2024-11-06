import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { client } from '@/lib/db/postgres';

async function getDelegationsList() {
  const delegations = await client`
    SELECT *
    FROM delegation
  `;
  // Convert each row to JSON and join with a newline for readability
  return delegations.map(row => JSON.stringify(row)).join('\n');
}

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'generated.txt');
  const content = await getDelegationsList();

  try {
    await fs.writeFile(filePath, content);
    return NextResponse.json({ message: 'File generated successfully', filePath });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate file: ' + error }, { status: 500 });
  }
}

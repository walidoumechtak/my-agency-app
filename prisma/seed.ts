import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

const prisma = new PrismaClient();

async function loadCSV(file: string) {
  return new Promise<any[]>((resolve) => {
    const rows: any[] = [];
    fs.createReadStream(file)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", () => resolve(rows));
  });
}

async function importAgencies() {
  const file = path.join(__dirname, "../data/agencies_agency_rows.csv");
  const rows = await loadCSV(file);

  for (const row of rows) {
    await prisma.agency.upsert({
      where: { id: row.id },
      update: {},
      create: {
        id: row.id,
        name: row.name || null,
        state: row.state || null,
        state_code: row.state_code || null,
        type: row.type || null,
        population: row.population ? Number(row.population) : null,
        website: row.website || null,
        county: row.county || null,
        created_at: row.created_at ? new Date(row.created_at) : null,
        updated_at: row.updated_at ? new Date(row.updated_at) : null,
      },
    });
  }
}

async function importContacts() {
  const file = path.join(__dirname, "../data/contacts_contact_rows.csv");
  const rows = await loadCSV(file);

  for (const row of rows) {
    if (row.agency_id) {
      const exists = await prisma.agency.findUnique({
        where: { id: row.agency_id },
      });

      if (!exists) {
        console.warn(
          `⚠️ Agency ${row.agency_id} not found, skipping Contact ${row.id}`
        );
        continue;
      }
    }

    await prisma.contact.upsert({
      where: { id: row.id },
      update: {},
      create: {
        id: row.id,
        first_name: row.first_name || null,
        last_name: row.last_name || null,
        email: row.email || null,
        phone: row.phone || null,
        title: row.title || null,
        email_type: row.email_type || null,
        department: row.department || null,
        created_at: row.created_at ? new Date(row.created_at) : null,
        updated_at: row.updated_at ? new Date(row.updated_at) : null,
        agency_id: row.agency_id || null,
      },
    });
  }
}

async function main() {
  console.log("🌱 Importing agencies & contacts...");
  await importAgencies();
  await importContacts();
  console.log("✅ Done seeding!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });

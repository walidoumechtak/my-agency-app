-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "state" TEXT,
    "state_code" TEXT,
    "type" TEXT,
    "population" INTEGER,
    "website" TEXT,
    "county" TEXT,
    "created_at" DATETIME,
    "updated_at" DATETIME
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "title" TEXT,
    "email_type" TEXT,
    "department" TEXT,
    "created_at" DATETIME,
    "updated_at" DATETIME,
    "agency_id" TEXT,
    CONSTRAINT "Contact_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "Agency" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserViewLimit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "count" INTEGER NOT NULL
);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var sqlite3_1 = require("sqlite3");
var prisma = new client_1.PrismaClient();
var sqliteDb = new sqlite3_1.default.Database("prisma/dev.db", sqlite3_1.default.OPEN_READONLY);
function migrateTable(table, mapFn) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    sqliteDb.all("SELECT * FROM ".concat(table), function (err, rows) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, rows_1, row, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err)
                                        return [2 /*return*/, reject(err)];
                                    _i = 0, rows_1 = rows;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < rows_1.length)) return [3 /*break*/, 6];
                                    row = rows_1[_i];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, mapFn(row)];
                                case 3:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_1 = _a.sent();
                                    console.error("Error inserting row in table ".concat(table, ":"), e_1);
                                    return [3 /*break*/, 5];
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 6:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                })];
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Migrating Agencies...");
                    return [4 /*yield*/, migrateTable("Agency", function (row) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.agency.create({
                                            data: {
                                                id: row.id,
                                                name: row.name,
                                                state: row.state,
                                                state_code: row.state_code,
                                                type: row.type,
                                                population: row.population,
                                                website: row.website,
                                                county: row.county,
                                                created_at: row.created_at,
                                                updated_at: row.updated_at,
                                            },
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    console.log("Migrating Contacts...");
                    return [4 /*yield*/, migrateTable("Contact", function (row) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.contact.create({
                                            data: {
                                                id: row.id,
                                                first_name: row.first_name,
                                                last_name: row.last_name,
                                                email: row.email,
                                                phone: row.phone,
                                                title: row.title,
                                                email_type: row.email_type,
                                                department: row.department,
                                                agency_id: row.agency_id,
                                                created_at: row.created_at,
                                                updated_at: row.updated_at,
                                            },
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 2:
                    _a.sent();
                    console.log("Migrating UserViewLimit...");
                    return [4 /*yield*/, migrateTable("UserViewLimit", function (row) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma.userViewLimit.create({
                                            data: {
                                                id: row.id,
                                                userId: row.userId,
                                                date: row.date,
                                                count: row.count,
                                            },
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    console.log("Migration complete!");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(console.error)
    .finally(function () {
    sqliteDb.close();
    prisma.$disconnect();
});
// import { PrismaClient } from "@prisma/client";
// import fs from "fs";
// import path from "path";
// import csv from "csv-parser";
// const prisma = new PrismaClient();
// async function loadCSV(file: string) {
//   return new Promise<any[]>((resolve) => {
//     const rows: any[] = [];
//     fs.createReadStream(file)
//       .pipe(csv())
//       .on("data", (row) => rows.push(row))
//       .on("end", () => resolve(rows));
//   });
// }
// async function importAgencies() {
//   const file = path.join(__dirname, "../data/agencies_agency_rows.csv");
//   const rows = await loadCSV(file);
//   for (const row of rows) {
//     await prisma.agency.upsert({
//       where: { id: row.id },
//       update: {},
//       create: {
//         id: row.id,
//         name: row.name || null,
//         state: row.state || null,
//         state_code: row.state_code || null,
//         type: row.type || null,
//         population: row.population ? Number(row.population) : null,
//         website: row.website || null,
//         county: row.county || null,
//         created_at: row.created_at ? new Date(row.created_at) : null,
//         updated_at: row.updated_at ? new Date(row.updated_at) : null,
//       },
//     });
//   }
// }
// async function importContacts() {
//   const file = path.join(__dirname, "../data/contacts_contact_rows.csv");
//   const rows = await loadCSV(file);
//   for (const row of rows) {
//     if (row.agency_id) {
//       const exists = await prisma.agency.findUnique({
//         where: { id: row.agency_id },
//       });
//       if (!exists) {
//         console.warn(
//           `⚠️ Agency ${row.agency_id} not found, skipping Contact ${row.id}`
//         );
//         continue;
//       }
//     }
//     await prisma.contact.upsert({
//       where: { id: row.id },
//       update: {},
//       create: {
//         id: row.id,
//         first_name: row.first_name || null,
//         last_name: row.last_name || null,
//         email: row.email || null,
//         phone: row.phone || null,
//         title: row.title || null,
//         email_type: row.email_type || null,
//         department: row.department || null,
//         created_at: row.created_at ? new Date(row.created_at) : null,
//         updated_at: row.updated_at ? new Date(row.updated_at) : null,
//         agency_id: row.agency_id || null,
//       },
//     });
//   }
// }
// async function main() {
//   console.log("🌱 Importing agencies & contacts...");
//   await importAgencies();
//   await importContacts();
//   console.log("✅ Done seeding!");
// }
// main()
//   .then(() => prisma.$disconnect())
//   .catch((err) => {
//     console.error(err);
//     prisma.$disconnect();
//     process.exit(1);
//   });

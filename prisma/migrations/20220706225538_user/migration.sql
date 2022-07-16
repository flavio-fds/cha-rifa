/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberPhone" TEXT NOT NULL,
    "name" TEXT
);
INSERT INTO "new_User" ("name", "numberPhone") SELECT "name", "numberPhone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_numberPhone_key" ON "User"("numberPhone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

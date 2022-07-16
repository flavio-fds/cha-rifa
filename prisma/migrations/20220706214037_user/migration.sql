/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `numberPhone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "numberPhone" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT
);
INSERT INTO "new_User" ("name", "numberPhone") SELECT "name", "numberPhone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_numberPhone_key" ON "User"("numberPhone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Added the required column `weakness` to the `Hero` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "secretIdentity" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Hero_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hero" ("id", "name", "secretIdentity", "userId") SELECT "id", "name", "secretIdentity", "userId" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

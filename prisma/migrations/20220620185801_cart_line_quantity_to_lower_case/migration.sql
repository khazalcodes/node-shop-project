/*
  Warnings:

  - You are about to drop the column `Quantity` on the `cartline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cartline` DROP COLUMN `Quantity`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `totalPrice`;

-- AlterTable
ALTER TABLE `cartline` ALTER COLUMN `quantity` DROP DEFAULT;

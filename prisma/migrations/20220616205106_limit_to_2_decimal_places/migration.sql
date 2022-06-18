/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `totalPrice` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `totalPrice` DECIMAL(65, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `order` MODIFY `totalPrice` DECIMAL(65, 2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `product` MODIFY `price` DECIMAL(65, 2) NOT NULL DEFAULT 0.00;

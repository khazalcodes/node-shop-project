/*
  Warnings:

  - You are about to drop the `_carttoproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_carttoproduct` DROP FOREIGN KEY `_CartToProduct_B_fkey`;

-- DropTable
DROP TABLE `_carttoproduct`;

-- CreateTable
CREATE TABLE `CartLine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 2) NOT NULL DEFAULT 0.00,
    `productId` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `cartId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartLine` ADD CONSTRAINT `CartLine_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartLine` ADD CONSTRAINT `CartLine_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

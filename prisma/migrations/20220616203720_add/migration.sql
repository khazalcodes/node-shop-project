-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_authorId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `authorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

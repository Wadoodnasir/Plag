-- AlterTable
ALTER TABLE `auth` MODIFY `role` ENUM('ADMIN', 'EMPLOYEE', 'USER', 'API') NOT NULL;

-- CreateTable
CREATE TABLE `SubscriptionPackageDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packageName` VARCHAR(191) NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,
    `availableDocuments` INTEGER NOT NULL,
    `cost` DOUBLE NOT NULL,
    `subscriptionId` INTEGER NOT NULL,

    UNIQUE INDEX `SubscriptionPackageDetail_subscriptionId_key`(`subscriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `duration` INTEGER NOT NULL,
    `features` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `packageId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubscriptionPackageDetail` ADD CONSTRAINT `SubscriptionPackageDetail_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Auth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Packages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

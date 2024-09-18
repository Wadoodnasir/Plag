-- CreateTable
CREATE TABLE `Auth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'EMPLOYEE', 'USER') NOT NULL,
    `resetPasswordToken` VARCHAR(191) NULL,
    `resetPasswordExpires` BIGINT NULL,

    UNIQUE INDEX `Auth_email_key`(`email`),
    UNIQUE INDEX `Auth_username_key`(`username`),
    UNIQUE INDEX `Auth_phoneNumber_key`(`phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Submissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `status` VARCHAR(191) NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turnitin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `minioId` VARCHAR(191) NULL,
    `processSettings` JSON NULL,
    `turnitinSubmissionId` BIGINT NULL,
    `wordCount` VARCHAR(191) NULL,
    `isPlagiarismReportAvailable` BOOLEAN NULL DEFAULT false,
    `similarity` VARCHAR(191) NULL,
    `plagiarismReportMinio` VARCHAR(191) NULL,
    `isAiReportAvailable` BOOLEAN NULL DEFAULT false,
    `aiPlag` VARCHAR(191) NULL,
    `aiPlagReportMinio` VARCHAR(191) NULL,
    `pageCount` VARCHAR(191) NULL,
    `aiReportStatus` VARCHAR(191) NULL,
    `isAiReportError` BOOLEAN NULL DEFAULT false,
    `aiReportErrorCode` VARCHAR(191) NULL,
    `aiReportErrorMessage` VARCHAR(191) NULL,
    `submissionId` INTEGER NOT NULL,

    UNIQUE INDEX `Turnitin_submissionId_key`(`submissionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submissions` ADD CONSTRAINT `Submissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Auth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Turnitin` ADD CONSTRAINT `Turnitin_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `admissionYear` INTEGER NULL,
    ADD COLUMN `studentGroupId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `StudentGroup` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `admissionYear` INTEGER NOT NULL,
    `programId` VARCHAR(191) NOT NULL,
    `advisorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `StudentGroup_programId_idx`(`programId`),
    INDEX `StudentGroup_admissionYear_idx`(`admissionYear`),
    UNIQUE INDEX `StudentGroup_programId_admissionYear_name_key`(`programId`, `admissionYear`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClassSectionToStudentGroup` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClassSectionToStudentGroup_AB_unique`(`A`, `B`),
    INDEX `_ClassSectionToStudentGroup_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentGroup` ADD CONSTRAINT `StudentGroup_programId_fkey` FOREIGN KEY (`programId`) REFERENCES `Program`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentGroup` ADD CONSTRAINT `StudentGroup_advisorId_fkey` FOREIGN KEY (`advisorId`) REFERENCES `Personnel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_studentGroupId_fkey` FOREIGN KEY (`studentGroupId`) REFERENCES `StudentGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassSectionToStudentGroup` ADD CONSTRAINT `_ClassSectionToStudentGroup_A_fkey` FOREIGN KEY (`A`) REFERENCES `ClassSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassSectionToStudentGroup` ADD CONSTRAINT `_ClassSectionToStudentGroup_B_fkey` FOREIGN KEY (`B`) REFERENCES `StudentGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

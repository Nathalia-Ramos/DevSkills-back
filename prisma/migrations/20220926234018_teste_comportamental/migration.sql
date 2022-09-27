/*
  Warnings:

  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `tblemblema` MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento` MODIFY `data_pagamento` DATETIME NOT NULL,
    MODIFY `juros` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblplanos` MODIFY `valor` DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE `tblquestao_teste_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` TEXT NOT NULL,
    `id_teste_comportamental` INTEGER NOT NULL,

    UNIQUE INDEX `tblquestao_teste_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblalternativa_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opcao` VARCHAR(90) NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblalternativa_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_comportamental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste_usuario` INTEGER NOT NULL,
    `id_alternativa` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_comportamental_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblquestao_teste_comportamental` ADD CONSTRAINT `tblquestao_teste_comportamental_id_teste_comportamental_fkey` FOREIGN KEY (`id_teste_comportamental`) REFERENCES `tblteste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_comportamental` ADD CONSTRAINT `tblalternativa_comportamental_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_teste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_comportamental` ADD CONSTRAINT `tblresposta_comportamental_id_teste_usuario_fkey` FOREIGN KEY (`id_teste_usuario`) REFERENCES `tblusuario_teste_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_comportamental` ADD CONSTRAINT `tblresposta_comportamental_id_alternativa_fkey` FOREIGN KEY (`id_alternativa`) REFERENCES `tblalternativa_comportamental`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

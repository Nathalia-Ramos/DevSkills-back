/*
  Warnings:

  - You are about to alter the column `data_solicitacao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_solucao` on the `tblDenuncia` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `condicao` on the `tblemblema` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `data_pagamento` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `juros` on the `tblpagamento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `valor` on the `tblplanos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `ultima_atualizacao` on the `tblprova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_inicio` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_fim` on the `tblprova_andamento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_entrega` on the `tblusuario_prova` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `nome_fantasia` to the `tblempresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblDenuncia` MODIFY `data_solicitacao` DATETIME NOT NULL,
    MODIFY `data_solucao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblemblema` MODIFY `condicao` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblempresa` ADD COLUMN `nome_fantasia` VARCHAR(180) NOT NULL;

-- AlterTable
ALTER TABLE `tblpagamento` MODIFY `data_pagamento` DATETIME NOT NULL,
    MODIFY `juros` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblplanos` MODIFY `valor` DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE `tblprova` MODIFY `ultima_atualizacao` DATETIME NULL;

-- AlterTable
ALTER TABLE `tblprova_andamento` MODIFY `data_inicio` DATETIME NOT NULL,
    MODIFY `data_fim` DATETIME NOT NULL,
    MODIFY `duracao` TIME NULL;

-- AlterTable
ALTER TABLE `tblusuario_prova` MODIFY `data_entrega` DATETIME NULL;

-- CreateTable
CREATE TABLE `tblteste_competencia_stack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_stack` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_stack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia_habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_habilidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_habilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_teste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tblquestao_teste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia_todas_questoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_questao_teste` INTEGER NOT NULL,
    `id_teste` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_todas_questoes_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblalternativa_teste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `alternativa` VARCHAR(50) NOT NULL,
    `alternativa_correta` BOOLEAN NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblalternativa_teste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_teste_competencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_alternativa` INTEGER NOT NULL,
    `id_usuario_teste` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_teste_competencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_teste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pontuacao` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_teste` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_teste_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbltestes_competencia_salvos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tbltestes_competencia_salvos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblteste_competencia_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_teste` INTEGER NOT NULL,
    `id_idioma` INTEGER NOT NULL,

    UNIQUE INDEX `tblteste_competencia_idioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_stack` ADD CONSTRAINT `tblteste_competencia_stack_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_stack` ADD CONSTRAINT `tblteste_competencia_stack_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_habilidade` ADD CONSTRAINT `tblteste_competencia_habilidade_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_habilidade` ADD CONSTRAINT `tblteste_competencia_habilidade_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `tblhabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_todas_questoes` ADD CONSTRAINT `tblteste_competencia_todas_questoes_id_questao_teste_fkey` FOREIGN KEY (`id_questao_teste`) REFERENCES `tblquestao_teste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_todas_questoes` ADD CONSTRAINT `tblteste_competencia_todas_questoes_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_teste_competencia` ADD CONSTRAINT `tblalternativa_teste_competencia_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_teste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_teste_competencia` ADD CONSTRAINT `tblresposta_teste_competencia_id_alternativa_fkey` FOREIGN KEY (`id_alternativa`) REFERENCES `tblalternativa_teste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_teste_competencia` ADD CONSTRAINT `tblresposta_teste_competencia_id_usuario_teste_fkey` FOREIGN KEY (`id_usuario_teste`) REFERENCES `tblusuario_teste`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste` ADD CONSTRAINT `tblusuario_teste_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_teste` ADD CONSTRAINT `tblusuario_teste_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbltestes_competencia_salvos` ADD CONSTRAINT `tbltestes_competencia_salvos_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbltestes_competencia_salvos` ADD CONSTRAINT `tbltestes_competencia_salvos_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_idioma` ADD CONSTRAINT `tblteste_competencia_idioma_id_teste_fkey` FOREIGN KEY (`id_teste`) REFERENCES `tblteste_competencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblteste_competencia_idioma` ADD CONSTRAINT `tblteste_competencia_idioma_id_idioma_fkey` FOREIGN KEY (`id_idioma`) REFERENCES `tblidioma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
CREATE TABLE `tblprova_andamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATETIME NOT NULL,
    `data_fim` DATETIME NOT NULL,
    `duracao` TIME NULL,
    `id_empresa` INTEGER NOT NULL,
    `id_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_andamento_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tblprova_tipo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(50) NOT NULL,
    `descricao` TEXT NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `link_repositorio` VARCHAR(100) NULL,
    `ultima_atualizacao` DATETIME NULL,
    `id_tipo` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_idioma` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_idioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_stack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_stack` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_stack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_habilidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_habilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfeedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estrela` INTEGER NOT NULL,
    `avaliacao` TEXT NOT NULL,
    `id_prova_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblfeedback_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `finalizada` BOOLEAN NOT NULL,
    `data_entrega` DATETIME NULL,
    `pontuacao` INTEGER NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_prova_andamento` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprovas_salvas_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblprovas_salvas_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_questao_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `resposta` TEXT NOT NULL,
    `correta` BOOLEAN NULL,
    `id_prova_usuario` INTEGER NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_questao_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_prova_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblquestao_prova_tipo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblquestao_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` TEXT NOT NULL,
    `foto` VARCHAR(150) NULL,
    `id_tipo` INTEGER NOT NULL,

    UNIQUE INDEX `tblquestao_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblalternativa_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `opcao` VARCHAR(180) NOT NULL,
    `correta` BOOLEAN NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblalternativa_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblresposta_alternativa_prova` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_prova_usuario` INTEGER NOT NULL,
    `id_alternativa` INTEGER NOT NULL,
    `id_questao` INTEGER NOT NULL,

    UNIQUE INDEX `tblresposta_alternativa_prova_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblprova_todas_questoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_questao_prova` INTEGER NOT NULL,
    `id_prova` INTEGER NOT NULL,

    UNIQUE INDEX `tblprova_todas_questoes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblprova_andamento` ADD CONSTRAINT `tblprova_andamento_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_andamento` ADD CONSTRAINT `tblprova_andamento_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova` ADD CONSTRAINT `tblprova_id_tipo_fkey` FOREIGN KEY (`id_tipo`) REFERENCES `tblprova_tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_idioma` ADD CONSTRAINT `tblprova_idioma_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_idioma` ADD CONSTRAINT `tblprova_idioma_id_idioma_fkey` FOREIGN KEY (`id_idioma`) REFERENCES `tblidioma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_stack` ADD CONSTRAINT `tblprova_stack_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_stack` ADD CONSTRAINT `tblprova_stack_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_habilidade` ADD CONSTRAINT `tblprova_habilidade_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_habilidade` ADD CONSTRAINT `tblprova_habilidade_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `tblhabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfeedback` ADD CONSTRAINT `tblfeedback_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_prova` ADD CONSTRAINT `tblusuario_prova_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_prova` ADD CONSTRAINT `tblusuario_prova_id_prova_andamento_fkey` FOREIGN KEY (`id_prova_andamento`) REFERENCES `tblprova_andamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprovas_salvas_usuario` ADD CONSTRAINT `tblprovas_salvas_usuario_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprovas_salvas_usuario` ADD CONSTRAINT `tblprovas_salvas_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_questao_prova` ADD CONSTRAINT `tblresposta_questao_prova_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_questao_prova` ADD CONSTRAINT `tblresposta_questao_prova_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblquestao_prova` ADD CONSTRAINT `tblquestao_prova_id_tipo_fkey` FOREIGN KEY (`id_tipo`) REFERENCES `tblquestao_prova_tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblalternativa_prova` ADD CONSTRAINT `tblalternativa_prova_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_alternativa_prova` ADD CONSTRAINT `tblresposta_alternativa_prova_id_prova_usuario_fkey` FOREIGN KEY (`id_prova_usuario`) REFERENCES `tblusuario_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_alternativa_prova` ADD CONSTRAINT `tblresposta_alternativa_prova_id_alternativa_fkey` FOREIGN KEY (`id_alternativa`) REFERENCES `tblalternativa_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblresposta_alternativa_prova` ADD CONSTRAINT `tblresposta_alternativa_prova_id_questao_fkey` FOREIGN KEY (`id_questao`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_todas_questoes` ADD CONSTRAINT `tblprova_todas_questoes_id_questao_prova_fkey` FOREIGN KEY (`id_questao_prova`) REFERENCES `tblquestao_prova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblprova_todas_questoes` ADD CONSTRAINT `tblprova_todas_questoes_id_prova_fkey` FOREIGN KEY (`id_prova`) REFERENCES `tblprova`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

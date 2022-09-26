/*
  Warnings:

  - Added the required column `id_endereco` to the `tblempresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tblempresa` ADD COLUMN `id_endereco` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tblplanos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(40) NOT NULL,
    `valor` DECIMAL NOT NULL,
    `ativo` BOOLEAN NOT NULL,

    UNIQUE INDEX `tblplanos_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblassinatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_inicio` DATE NOT NULL,
    `data_fim` DATE NOT NULL,
    `renovacao_automatica` BOOLEAN NOT NULL,
    `id_plano` INTEGER NOT NULL,
    `id_empresa` INTEGER NOT NULL,

    UNIQUE INDEX `tblassinatura_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_pagamento` DATETIME NOT NULL,
    `juros` DECIMAL NOT NULL,
    `id_assinatura` INTEGER NOT NULL,

    UNIQUE INDEX `tblpagamento_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblbeneficio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NOT NULL,

    UNIQUE INDEX `tblbeneficio_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblplano_beneficio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_plano` INTEGER NOT NULL,
    `id_beneficio` INTEGER NOT NULL,

    UNIQUE INDEX `tblplano_beneficio_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpagamento_pix` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chave` VARCHAR(45) NULL,
    `qrcode` TEXT NULL,
    `id_pagamento` INTEGER NOT NULL,

    UNIQUE INDEX `tblpagamento_pix_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpagamento_cartao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_validade` DATE NOT NULL,
    `id_bandeira` INTEGER NOT NULL,

    UNIQUE INDEX `tblpagamento_cartao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcartao_bandeira` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblcartao_bandeira_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcartao_forma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cartao` INTEGER NOT NULL,
    `id_forma` INTEGER NOT NULL,

    UNIQUE INDEX `tblcartao_forma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblforma_pagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblforma_pagamento_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblassinatura` ADD CONSTRAINT `tblassinatura_id_plano_fkey` FOREIGN KEY (`id_plano`) REFERENCES `tblplanos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblassinatura` ADD CONSTRAINT `tblassinatura_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento` ADD CONSTRAINT `tblpagamento_id_assinatura_fkey` FOREIGN KEY (`id_assinatura`) REFERENCES `tblassinatura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblplano_beneficio` ADD CONSTRAINT `tblplano_beneficio_id_plano_fkey` FOREIGN KEY (`id_plano`) REFERENCES `tblplanos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblplano_beneficio` ADD CONSTRAINT `tblplano_beneficio_id_beneficio_fkey` FOREIGN KEY (`id_beneficio`) REFERENCES `tblbeneficio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento_pix` ADD CONSTRAINT `tblpagamento_pix_id_pagamento_fkey` FOREIGN KEY (`id_pagamento`) REFERENCES `tblpagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblpagamento_cartao` ADD CONSTRAINT `tblpagamento_cartao_id_bandeira_fkey` FOREIGN KEY (`id_bandeira`) REFERENCES `tblcartao_bandeira`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblcartao_forma` ADD CONSTRAINT `tblcartao_forma_id_cartao_fkey` FOREIGN KEY (`id_cartao`) REFERENCES `tblpagamento_cartao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblcartao_forma` ADD CONSTRAINT `tblcartao_forma_id_forma_fkey` FOREIGN KEY (`id_forma`) REFERENCES `tblforma_pagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblempresa` ADD CONSTRAINT `tblempresa_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tblendereco_empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

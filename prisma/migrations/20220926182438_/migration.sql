-- CreateTable
CREATE TABLE `tblestado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tblestado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `tblcidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblendereco_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `bairro` VARCHAR(120) NOT NULL,
    `cep` VARCHAR(15) NOT NULL,
    `complemento` VARCHAR(45) NULL,
    `id_cidade` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblendereco_usuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblendereco_empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `bairro` VARCHAR(120) NOT NULL,
    `cep` VARCHAR(15) NOT NULL,
    `complemento` VARCHAR(45) NULL,
    `id_cidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblendereco_empresa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblempresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` INTEGER NOT NULL,
    `email` VARCHAR(180) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `biografia` TEXT NULL,
    `logo` VARCHAR(120) NULL,

    UNIQUE INDEX `tblempresa_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblempresa_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ddd` VARCHAR(2) NOT NULL,
    `numero` VARCHAR(22) NOT NULL,
    `id_empresa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblempresa_telefone_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblfotos_ambiente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foto` VARCHAR(200) NOT NULL,
    `legenda` VARCHAR(45) NOT NULL,
    `id_empresa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblfotos_ambiente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblavaliacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `estrelas` INTEGER NOT NULL,
    `comentario` TEXT NOT NULL,
    `id_empresa` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblavaliacoes_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblcidade` ADD CONSTRAINT `tblcidade_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `tblestado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblendereco_usuario` ADD CONSTRAINT `tblendereco_usuario_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tblcidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblendereco_usuario` ADD CONSTRAINT `tblendereco_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblendereco_empresa` ADD CONSTRAINT `tblendereco_empresa_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tblcidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblempresa_telefone` ADD CONSTRAINT `tblempresa_telefone_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblfotos_ambiente` ADD CONSTRAINT `tblfotos_ambiente_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblavaliacoes` ADD CONSTRAINT `tblavaliacoes_id_empresa_fkey` FOREIGN KEY (`id_empresa`) REFERENCES `tblempresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

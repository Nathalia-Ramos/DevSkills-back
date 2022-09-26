-- CreateTable
CREATE TABLE `tblusuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(180) NOT NULL,
    `email` VARCHAR(110) NOT NULL,
    `senha` VARCHAR(60) NOT NULL,
    `cpf` INTEGER NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `tag` VARCHAR(45) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `pontuacao_plataforma` INTEGER NOT NULL,
    `foto_perfil` VARCHAR(150) NULL,
    `biografia` TEXT NULL,
    `link_github` TEXT NULL,
    `link_portifolio` TEXT NULL,
    `id_genero` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblusuario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblgenero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(22) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblgenero_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ddd` VARCHAR(2) NOT NULL,
    `numero` VARCHAR(10) NOT NULL,
    `id_tipo_telefone` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tblusuario_telefone_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbltipo_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tbltipo_telefone_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblidioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `tblidioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblhabilidade_tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `ativo` BOOLEAN NOT NULL,

    UNIQUE INDEX `tblhabilidade_tipo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblstack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tblstack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblhabilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `icone` VARCHAR(45) NOT NULL,
    `ativo` BOOLEAN NOT NULL,
    `id_stack` INTEGER NOT NULL,
    `id_habilidade_tipo` INTEGER NOT NULL,

    UNIQUE INDEX `tblhabilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_habilidade` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_habilidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_stack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `id_stack` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_stack_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblusuario_idioma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_idioma` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    UNIQUE INDEX `tblusuario_idioma_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblusuario` ADD CONSTRAINT `tblusuario_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tblgenero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_telefone` ADD CONSTRAINT `tblusuario_telefone_id_tipo_telefone_fkey` FOREIGN KEY (`id_tipo_telefone`) REFERENCES `tbltipo_telefone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_telefone` ADD CONSTRAINT `tblusuario_telefone_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblhabilidade` ADD CONSTRAINT `tblhabilidade_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblhabilidade` ADD CONSTRAINT `tblhabilidade_id_habilidade_tipo_fkey` FOREIGN KEY (`id_habilidade_tipo`) REFERENCES `tblhabilidade_tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_habilidade` ADD CONSTRAINT `tblusuario_habilidade_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_habilidade` ADD CONSTRAINT `tblusuario_habilidade_id_habilidade_fkey` FOREIGN KEY (`id_habilidade`) REFERENCES `tblhabilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_stack` ADD CONSTRAINT `tblusuario_stack_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_stack` ADD CONSTRAINT `tblusuario_stack_id_stack_fkey` FOREIGN KEY (`id_stack`) REFERENCES `tblstack`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_idioma` ADD CONSTRAINT `tblusuario_idioma_id_idioma_fkey` FOREIGN KEY (`id_idioma`) REFERENCES `tblidioma`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tblusuario_idioma` ADD CONSTRAINT `tblusuario_idioma_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tblusuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

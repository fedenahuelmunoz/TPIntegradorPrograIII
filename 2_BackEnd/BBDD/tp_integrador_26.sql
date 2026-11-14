-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2026 a las 18:29:39
-- Versión del servidor: 10.11.16-MariaDB
-- Versión de PHP: 8.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp_integrador_26`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('notebook','cellphone') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'MacBook Pro 14 M3', 'https://http2.mlstatic.com/D_NQ_NP_2X_738079-MLA83154293958_032025-F.webp', 'notebook', 1999.99, 1),
(2, 'Dell XPS 13 Plus', 'https://http2.mlstatic.com/D_NQ_NP_2X_764463-MLA116381712810_092026-F.webp', 'notebook', 1499.50, 1),
(3, 'Lenovo ThinkPad X1 Carbon Gen 11', 'https://http2.mlstatic.com/D_NQ_NP_2X_860075-CBT113724298588_072026-F.webp', 'notebook', 1650.00, 1),
(4, 'HP Spectre x360 14', 'https://http2.mlstatic.com/D_NQ_NP_2X_669463-MLA91140860557_082025-F.webp', 'notebook', 1399.00, 1),
(5, 'Asus ROG Zephyrus G14', 'https://http2.mlstatic.com/D_NQ_NP_2X_944845-MLA115638274050_092026-F.webp', 'notebook', 1799.99, 1),
(6, 'Acer Swift 3 OLED', 'https://http2.mlstatic.com/D_NQ_NP_2X_742095-MLA92532265842_092025-F.webp', 'notebook', 799.00, 1),
(7, 'Microsoft Surface Laptop 5', 'https://http2.mlstatic.com/D_NQ_NP_2X_741196-CBT110304501052_052026-F.webp', 'notebook', 1199.00, 1),
(8, 'MSI Creator Z16', 'https://http2.mlstatic.com/D_NQ_NP_2X_760274-MLA117898647220_102026-F.webp', 'notebook', 1899.00, 1),
(9, 'Razer Blade 15', 'https://http2.mlstatic.com/D_NQ_NP_2X_688269-MLA90071032242_082025-F.webp', 'notebook', 2299.99, 1),
(10, 'Samsung Galaxy Book3 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_826892-MLA99556859396_122025-F.webp', 'notebook', 1449.00, 1),
(11, 'Huawei MateBook D 15', 'https://http2.mlstatic.com/D_NQ_NP_2X_723510-MLA89101369798_082025-F.webp', 'notebook', 699.00, 1),
(12, 'Gigabyte Aero 16', 'https://http2.mlstatic.com/D_NQ_NP_2X_818842-MLA118518244067_092026-F.webp', 'notebook', 1749.00, 1),
(13, 'Lenovo Legion 5 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_860897-MLA93693376463_092025-F.webp', 'notebook', 1299.00, 1),
(14, 'HP Pavilion 15', 'https://http2.mlstatic.com/D_NQ_NP_2X_797396-MLA99554474430_122025-F.webp', 'notebook', 649.99, 1),
(15, 'Asus ZenBook 14 OLED', 'https://http2.mlstatic.com/D_NQ_NP_2X_601922-MLA115594932362_092026-F.webp', 'notebook', 999.00, 1),
(16, 'iPhone 15 Pro Max', 'https://http2.mlstatic.com/D_NQ_NP_2X_933234-MLA95498909620_102025-F.webp', 'cellphone', 1199.00, 1),
(17, 'Samsung Galaxy S24 Ultra', 'https://http2.mlstatic.com/D_NQ_NP_2X_687567-CBT120842125085_112026-F.webp', 'cellphone', 1299.99, 1),
(18, 'Google Pixel 8 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_815980-MLA72598570782_112023-F.webp', 'cellphone', 999.00, 1),
(19, 'Xiaomi 14 Ultra', 'https://http2.mlstatic.com/D_NQ_NP_2X_839531-MLA109214300924_042026-F.webp', 'cellphone', 1099.00, 1),
(20, 'OnePlus 12', 'https://http2.mlstatic.com/D_NQ_NP_2X_996135-CBT116664279484_092026-F.webp', 'cellphone', 799.00, 1),
(21, 'Motorola Edge 40 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_980424-MLA99929528305_112025-F.webp', 'cellphone', 899.00, 1),
(22, 'Nothing Phone (2)', 'https://http2.mlstatic.com/D_NQ_NP_2X_866149-MLA117537807389_092026-F.webp', 'cellphone', 699.00, 1),
(23, 'Sony Xperia 1 V', 'https://http2.mlstatic.com/D_NQ_NP_2X_896698-CBT121524417127_112026-F.webp', 'cellphone', 1399.00, 1),
(24, 'Asus ROG Phone 8', 'https://http2.mlstatic.com/D_NQ_NP_2X_712303-MLA116058990180_092026-F.webp', 'cellphone', 1199.00, 1),
(25, 'iPhone 13', 'https://http2.mlstatic.com/D_NQ_NP_2X_748074-MLA99517857624_112025-F.webp', 'cellphone', 599.00, 1),
(26, 'Samsung Galaxy A54', 'https://http2.mlstatic.com/D_NQ_NP_2X_601781-CBT119016564469_102026-F.webp', 'cellphone', 349.99, 1),
(27, 'Xiaomi Redmi Note 13 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_897205-MLA99948557459_112025-F.webp', 'cellphone', 399.00, 1),
(28, 'Motorola Moto G84', 'https://http2.mlstatic.com/D_NQ_NP_2X_613780-MLA99526823934_122025-F.webp', 'cellphone', 299.00, 1),
(29, 'Realme GT 5 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_809125-MLA119853881939_102026-F.webp', 'cellphone', 749.00, 1),
(30, 'Vivo X100 Pro', 'https://http2.mlstatic.com/D_NQ_NP_2X_841606-CBT116428805630_092026-F.webp', 'cellphone', 949.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sales`
--

CREATE TABLE `product_sales` (
  `product_id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_sales`
--

INSERT INTO `product_sales` (`product_id`, `sale_id`) VALUES
(1, 8),
(2, 1),
(4, 9),
(6, 5),
(9, 4),
(16, 2),
(17, 6),
(18, 10),
(22, 7),
(26, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(1, '2026-01-15 13:20:15', 1499.50, 'Lucas'),
(2, '2026-02-10 17:35:22', 1199.00, 'Sofia'),
(3, '2026-03-05 12:12:44', 349.99, 'Mateo'),
(4, '2026-04-12 22:40:10', 2299.99, 'Valentina'),
(5, '2026-05-20 19:55:03', 799.00, 'Joaquin'),
(6, '2026-06-01 14:05:30', 1299.99, 'Camila'),
(7, '2026-06-15 16:22:19', 699.00, 'Franco'),
(8, '2026-07-08 21:10:45', 1999.99, 'Martina'),
(9, '2026-08-19 23:15:00', 1399.00, 'Agustin'),
(10, '2026-09-10 15:30:55', 999.00, 'Lucia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Aragorn', 'aragorn@lotr.com', 'rohan123'),
(2, 'Gandalf el Gris', 'gandalf@wizard.com', 'mellon'),
(3, 'Frodo Bolson', 'frodo@shire.com', 'anillo'),
(4, 'Sauron', 'sauron@mordor.com', 'ojo123'),
(5, 'Homero Simpson', 'homero@springfield.com', 'duff'),
(6, 'Marge Simpson', 'marge@springfield.com', 'homero'),
(7, 'Bruce Wayne', 'bruce@waynecorp.com', 'batman'),
(8, 'Clark Kent', 'clark@dailyplanet.com', 'krypton'),
(9, 'Peter Parker', 'peter@bugle.com', 'spidey'),
(10, 'Tony Stark', 'tony@starkindustries.com', '$2b$10$ScA2GLrUcopmXa3OLxTqGemQ/DuYpS1fDomc1LRgArJCLaF22Okx6'),
(11, 'Steve Rogers', 'steve@shield.com', '$2b$10$Zma8h06soNQZbr1tjx0FtueQ.G/H5iu6IwqrhtaiwIuOYa80pLl6q'),
(12, 'Sherlock Holmes', 'sherlock@bakerstreet.com', 'watson'),
(13, 'Harry Potter', 'harry@hogwarts.com', 'lumos'),
(14, 'Hermione Granger', 'hermione@hogwarts.com', '$2b$10$wemYF.qxnldHTJnMdxNcQeUBqZHz.FhqUBEmmCCcp/ODZTjq7E3yi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

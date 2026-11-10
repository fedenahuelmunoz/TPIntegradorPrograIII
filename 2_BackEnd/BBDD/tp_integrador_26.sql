-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2026 a las 05:11:21
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
(1, 'MacBook Pro 14 M3', 'https://www.gettyimages.com/detail/photo/apple-macbook-pro-royalty-free-image/1358386001.png', 'notebook', 1999.99, 1),
(2, 'Dell XPS 13 Plus', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45.png', 'notebook', 1499.50, 1),
(3, 'Lenovo ThinkPad X1 Carbon Gen 11', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed.png', 'notebook', 1650.00, 1),
(4, 'HP Spectre x360 14', 'https://images.unsplash.com/photo-1544717305-2782549b5136.png', 'notebook', 1399.00, 1),
(5, 'Asus ROG Zephyrus G14', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302.png', 'notebook', 1799.99, 1),
(6, 'Acer Swift 3 OLED', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8.png', 'notebook', 799.00, 1),
(7, 'Microsoft Surface Laptop 5', 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546.png', 'notebook', 1199.00, 1),
(8, 'MSI Creator Z16', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1.png', 'notebook', 1899.00, 1),
(9, 'Razer Blade 15', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2.png', 'notebook', 2299.99, 1),
(10, 'Samsung Galaxy Book3 Pro', 'https://images.unsplash.com/photo-1515255557674-722a4f6d0f66.png', 'notebook', 1449.00, 1),
(11, 'Huawei MateBook D 15', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef.png', 'notebook', 699.00, 1),
(12, 'Gigabyte Aero 16', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf.png', 'notebook', 1749.00, 1),
(13, 'Lenovo Legion 5 Pro', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9.png', 'notebook', 1299.00, 1),
(14, 'HP Pavilion 15', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853.png', 'notebook', 649.99, 1),
(15, 'Asus ZenBook 14 OLED', 'https://images.unsplash.com/photo-1504707748692-419802cf939d.png', 'notebook', 999.00, 1),
(16, 'iPhone 15 Pro Max', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569.png', 'cellphone', 1199.00, 1),
(17, 'Samsung Galaxy S24 Ultra', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf.png', 'cellphone', 1299.99, 1),
(18, 'Google Pixel 8 Pro', 'https://images.unsplash.com/photo-1598327105666-5b89351aff97.png', 'cellphone', 999.00, 1),
(19, 'Xiaomi 14 Ultra', 'http://i05.appmifile.com/396_item_uk/26/02/2024/29b007446a4755b6fd44709dc80e656c.png', 'cellphone', 1099.00, 1),
(20, 'OnePlus 12', 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0.png', 'cellphone', 799.00, 1),
(21, 'Motorola Edge 40 Pro', 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025.png', 'cellphone', 899.00, 1),
(22, 'Nothing Phone (2)', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9.png', 'cellphone', 699.00, 1),
(23, 'Sony Xperia 1 V', 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2.png', 'cellphone', 1399.00, 1),
(24, 'Asus ROG Phone 8', 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7.png', 'cellphone', 1199.00, 1),
(25, 'iPhone 13', 'https://images.unsplash.com/photo-1605236453806-6ff36851218e.png', 'cellphone', 599.00, 1),
(26, 'Samsung Galaxy A54', 'https://images.unsplash.com/photo-1580910051074-3eb694886505.png', 'cellphone', 349.99, 1),
(27, 'Xiaomi Redmi Note 13 Pro', 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48.png', 'cellphone', 399.00, 1),
(28, 'Motorola Moto G84', 'https://images.unsplash.com/photo-1567581935884-3349723552ca.png', 'cellphone', 299.00, 1),
(29, 'Realme GT 5 Pro', 'https://images.unsplash.com/photo-1573148197772-a633a6b32813.png', 'cellphone', 749.00, 1),
(30, 'Vivo X100 Pro', 'https://images.unsplash.com/photo-1556656793-08538906a9f8.png', 'cellphone', 949.00, 1);

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

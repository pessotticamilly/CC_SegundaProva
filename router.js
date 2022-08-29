import { Router } from "express";
const router = Router();

import Users from "./api/autores/autores.controller";
import Orders from "./api/autoresLivros/autoresLivros.controller";
import OrdersProducts from "./api/clientes/clientes.controller";
import Products from "./api/editoras/editoras.controller";


router.use("/users", Users);
router.use("/orders", Orders);
router.use("/orders-products", OrdersProducts);
router.use("/products", Products);


export default router;
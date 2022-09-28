import { Router } from "express";
import EnderecoController from "../src/api/controller/AdressController";

const router = Router()

router.post('/', EnderecoController.create)

export default router
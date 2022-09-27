import { Router } from "express";
import EnderecoController from "../src/api/controller/EnderecoController";

const router = Router()

router.post('/endereco', EnderecoController.create)

export default router
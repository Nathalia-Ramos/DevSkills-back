import { Router } from "express";
import CityController from "../src/api/controller/CityController";

const router = Router()

router.post('/', CityController.create)

export default router
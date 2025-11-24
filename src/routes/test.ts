import TestController from "@/controllers/test";
import { Router } from "express";

const TestRouter:Router = Router();

TestRouter.get("/", TestController.getTests)

export default TestRouter;
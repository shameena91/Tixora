import { CategoryController } from "../presentation/controllers/CategoryController";
import { CategoryUseCaseFactory } from "./CategoryUseCaseFactory";

const categoryUseCaseFactory = new CategoryUseCaseFactory(
);

export const categoryController = new CategoryController(
  categoryUseCaseFactory,
);
import { Nillable } from "./nillable";
import { Unit } from "./Unit";

export enum OperationType {
  Income = "income",
  Expense = "expense",
}

export type Category = {
  id: number;
  name: string;
  operation_type: OperationType;
  unit?: Nillable<Unit>;
  percentage: Nillable<number>;
};

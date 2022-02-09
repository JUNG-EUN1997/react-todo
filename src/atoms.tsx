import { atom } from "recoil";

export interface IForm {
  toDo: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; //category는 3가지 값만 가능
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

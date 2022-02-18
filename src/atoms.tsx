import { atom, selector } from "recoil";
// atom은 단순히 배열을 전달하고, selector는 atom의 output을 조정할 수 있음

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

export const toDoSelector = selector({
  key:"toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState)
    return toDos.length
  }
});

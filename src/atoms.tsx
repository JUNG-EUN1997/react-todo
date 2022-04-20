import { atom, selector } from "recoil";
/* // atom은 단순히 배열을 전달하고, selector는 atom의 output을 조정할 수 있음

// export type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories { //enum은 생성할 때 기본적으로 값이 number로 선언됨
  "TO_DO" = "TO_DO", // = 로 해서 값을 넣지 않으면 0>1>2 로 순서가 들어감
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IForm {
  toDo: string;
}

export interface ICategoryForm {
  category: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories; //category는 3가지 값만 가능
}

export interface ICategory {
  category: string | Categories; 
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const allCategoryState = atom<ICategory[]>({
  key: "allCategory",
  default: [],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((todo) => todo.category === category);
  },
});
 */

export const toDoState = atom({
  key : "toDo",
  default : ["a", "b", "c", "d", "e"]
})
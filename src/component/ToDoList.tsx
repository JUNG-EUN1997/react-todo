import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Categories,
  categoryState,
  IToDo,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector); // useRecoilValue로 selector도 받을 수 있음

  const [allToDo, setAllToDo] = useRecoilState(toDoState);
  useEffect(() => {
    (async () => {
      const localStorageTodos = JSON.parse(
        localStorage.getItem("toDos") as any
      );
      setAllToDo(localStorageTodos);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      localStorage.setItem("toDos", JSON.stringify(allToDo));
    })();
  });

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const [value, setValue] = useState();
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value as any);
  };

  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    console.log(event);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <CreateCategory />
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
      </select>
      <hr />
      <CreateToDo />
      <h2>{category}</h2>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

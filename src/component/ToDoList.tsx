import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allCategoryState,
  Categories,
  categoryState,
  ICategoryForm,
  IToDo,
  toDoSelector,
  toDoState,
} from "../atoms";
import Category from "./Category";
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

  const category = useRecoilValue(categoryState)

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
        <Category />
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

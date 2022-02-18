import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  /* 방법 1- 인자값으로 받기
   const onClick = (newCategory: IToDo["category"]) => { //IToDo의 category 값 이라는 선언
  */
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      /* 여기 id가 어떻게 클릭한 값의 id로 노출되는 것 일까? 
          >> ToDoList에서 li마다 Todo를 호출하기 때문에, 호출 할 때 당시에 onClick이벤트도 생성이 되서 props에 있는 id 값을 갖고올 수 있는 것 같음
      */
      const oldToDo = oldToDos[targetIndex];
      // const newToDo = { text, id, category: name as any }; // as any 는 ts에게 체크하지 말라는 뜻 (권장X)
      const newToDo = { text, id, category: name as IToDo['category'] };
      console.log(oldToDo, newToDo);

      // 방법 1 -> 필요한 부분 잘라서 앞뒤로 붙여주기
      // return [
      //   ...oldToDos.slice(0, targetIndex),
      //   newToDo,
      //   ...oldToDos.slice(targetIndex + 1),
      // ];

      // 방법 2 -> 새로운 배열 생성 후 거기에서 변경해주기
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex,1,newToDo);
      return newToDos
    });
  };
  return (
    <>
      <li>
        <span>{text}</span>
        {/* 방법 1 - 인자값으로 받기
        {category != "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>} 
        */}
        {category != "DOING" && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category != "TO_DO" && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category != "DONE" ? (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        ) : (
          ""
        )}
      </li>
    </>
  );
}

export default ToDo;

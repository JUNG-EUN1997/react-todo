import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE"; //category는 3가지 값만 가능
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  /*
    const [값, 값을수정Fn] = useRecoilState(atom명);
      > '값'과 '값을수정Fn'을 동시에 불러오는 hook / setState와 비슷한 형식 
    const 값 = useRecoilValue(atom명);
      > '값'만 갖고오고 싶을 때
    const 값을수정Fn = useSetRecoilState(atom명);
      > '값을수정Fn'만 사용하고 싶을 때
  */
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //값을 새로 설정하는 것
  } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDo) => [{ text: toDo, id:Date.now(), category: "TO_DO" }, ...oldToDo]);
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "값을 입력해주세요." })}
          type="text"
          placeholder="Write HERE!"
        />
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
      </ul>
    </div>
  );
}

export default ToDoList;

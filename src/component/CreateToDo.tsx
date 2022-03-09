import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IForm, toDoState } from "../atoms";

function CreateToDo() {
  /*
    const [값, 값을수정Fn] = useRecoilState(atom명);
      > '값'과 '값을수정Fn'을 동시에 불러오는 hook / setState와 비슷한 형식 
    const 값 = useRecoilValue(atom명);
      > '값'만 갖고오고 싶을 때
    const 값을수정Fn = useSetRecoilState(atom명);
      > '값을수정Fn'만 사용하고 싶을 때
  */
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState)
  console.log(category)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //값을 새로 설정하는 것
  } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDo) => [{ text: toDo, id:Date.now(), category }, ...oldToDo]);
    setValue("toDo", "");
  };
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: "값을 입력해주세요." })}
          type="text"
          placeholder="Write HERE!"
        />
        <button>ADD</button>
      </form>
    </>
  );
}

export default CreateToDo;

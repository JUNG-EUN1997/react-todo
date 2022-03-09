import React from "react";
import { useForm } from "react-hook-form";
// 방법 1 - react-hook-form을 사용하지 않음
/* 
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={toDo}
          placeholder="Write HERE!"
        />
        <button>ADD</button>
      </form>
    </div>
  );
} */

interface IForm {
  email: string;
  name?: string;
  toDo?: string;
  password: string;
  password1: string;
  extraError?: string;
}

// 방법 2 - react-hook-form 사용
function Registration() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  /*
  - register : 방법 1에서 사용한 하나의 input값에서 필요한 코드들(onchange 등)을 1줄로 줄여줌
    > onBlur, onChange, onClick, ref를 return
  - watch : form 입력 값들의 변화 확인
  - handleSubmit : onSubmit event, onSubmit={handleSubmit(참값*필수*,거짓값)}
  - formState : form의 상태값을 확인해볼 수 있음 
  - setError : 특정한 에러를 발생시켜 줌
   */
  const onValid = (data: IForm) => {
    console.log(data);
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "password가 같지 않습니다." },
        { shouldFocus: true } // submit할 때 error 발생 시, focus 시켜줌
      );
      return;
    }
    // setError("extraError", { message: "SEVER ERROR" }); // 서버가 연결이 안되었거나 등 특정에러를 설정할 수 있음
  };
  const onInvalid = (data: any) => {
    console.error(data);
  };
  console.log(errors);
  console.log(watch())
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column", width: "50%" }}
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <input
          {...register("email", {
            required: "내용을 입력하셔야 합니다.",
            minLength: { value: 5, message: "너무 짧습니다." },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "네이버 메일만 입력하실 수 있습니다.",
            },
          })}
          type="text"
          placeholder="Write HERE!"
        />
        <span>{errors?.email?.message}</span>
        {/* object뒤에 ?를 붙이면, 해당 내용이 undefined 일 때 뒤의 내용이 실행 X */}
        <input
          {...register("name", {
            required: "내용을 입력하셔야 합니다.",
            minLength: { value: 5, message: "너무 짧습니다." },
            validate: {
              noNico: (value) =>
                value?.includes("nico")
                  ? "nico가 포함된 단어는 불가합니다."
                  : true,
              noBri: (value) =>
                value?.includes("bri")
                  ? "bri가 포함된 단어는 불가합니다."
                  : true,
            },
          })}
          type="text"
          placeholder="Write name HERE!"
        />
        <span>{errors?.name?.message}</span>
        <input
          {...register("password", {
            required: "내용을 입력하셔야 합니다.",
            minLength: { value: 5, message: "너무 짧습니다." },
          })}
          type="text"
          placeholder="Write password HERE!"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "내용을 입력하셔야 합니다.",
            minLength: { value: 5, message: "너무 짧습니다." },
          })}
          type="text"
          placeholder="Write password1 HERE!"
        />
        <span>{errors?.password1?.message}</span>
        <input
          {...register("toDo")}
          type="text"
          placeholder="Write TO DO HERE!"
        />
        <button>ADD</button>
        <div>{errors?.extraError?.message}</div>
      </form>
    </div>
  );
}

export default Registration;

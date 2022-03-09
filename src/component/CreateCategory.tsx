import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { allCategoryState, ICategoryForm } from "../atoms";

function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //값을 새로 설정하는 것
  } = useForm<ICategoryForm>();

  const setToCategory = useSetRecoilState(allCategoryState);


  const onValid = ({ category }: ICategoryForm) => {
    setToCategory((oldCategory) => [{ category }, ...oldCategory]);
    setValue("category", "");
    console.log(category)
  };

  

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("category", { required: "값을 입력해주세요." })}
          type="text"
          placeholder="Write HERE!"
        />
        <button>ADD category</button>
      </form>
    </>
  );
}

export default CreateCategory;

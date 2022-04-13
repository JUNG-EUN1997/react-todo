import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { allCategoryState, Categories, categoryState, ICategoryForm } from "../atoms";

function Category() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //값을 새로 설정하는 것
  } = useForm<ICategoryForm>();

  const setToCategory = useSetRecoilState(allCategoryState);

  const [cats, setCats] = useState<string[]>([]);

  const onValid = ({ category }: ICategoryForm) => {
    setToCategory((oldCategory) => [{ category }, ...oldCategory]);
    setValue("category", "");
    console.log(category);
    setCats((oldCats) => [...oldCats, category]);
  };

  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  console.log(cats);

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
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>DOING</option>
        <option value={Categories.DONE}>DONE</option>
        {cats?.map((cat) => (
          <option value={cat}>{cat}</option>
        ))}
      </select>
      
    </>
  );
}

export default Category;

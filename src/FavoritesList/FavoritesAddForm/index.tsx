import {useForm} from "react-hook-form";
import {useFavorites} from "@root/FavoritesList/reducer";
import {FavoritesItem} from "@root/FavoritesList/FavoritesIcon/types";
import {DNDTypes} from "@root/types";

type FormSchema = Omit<FavoritesItem, "type" | "id">

export function FavoritesAddForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormSchema>();
    const {add} = useFavorites();
    const onSubmit = (values: FormSchema) => {
        add({...values, type: DNDTypes.FAVORITES})
    }
    return <form onSubmit={handleSubmit(onSubmit)} draggable={false}>
        <input placeholder={"title"} type={"text"} {...register("title", {required: true})} />
        {errors.title && <div>Title field is required</div>}
        <input placeholder={"icon"} type={"text"} {...register("icon", {required: true})}/>
        {errors.title && <div>Icon field is required</div>}
        <input type={"submit"} value={"add item"}/>
    </form>
}

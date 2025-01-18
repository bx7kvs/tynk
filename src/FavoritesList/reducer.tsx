import {createContext, PropsWithChildren, useContext, useReducer} from "react";
import {FavoritesItem} from "@root/FavoritesList/FavoritesIcon/types";
import {nanoid} from "nanoid";

type FavoritesState = {
    drag: {
        target: FavoritesItem["id"] | null
    },
    favorites: FavoritesItem[],
}
const defaultFavoritesState: FavoritesState = {
    drag: {
        target: null
    },
    favorites: []
}

type FavoriteItemData = Omit<FavoritesItem, 'id'>

type FavoritesActions =
    {
        type: 'add',
        payload: { data: FavoriteItemData }
    } |
    {
        type: 'remove',
        payload: { id: FavoritesItem['id'] }
    } |
    {
        type: 'setDragTarget',
        payload: { id: FavoritesItem['id'] | null }
    } |
    {
        type: 'order',
        payload: { id: FavoritesItem['id'], to: number }
    };


export function useFavorites() {
    return useContext(FavoriteContext)
}

function FavoritesReducer(state: FavoritesState, {type, payload}: FavoritesActions): FavoritesState {
    switch (type) {
        case "add":
            return {...state, favorites: [...state.favorites, {...payload.data, id: nanoid(4)}]}
        case "remove":
            if (!state.favorites.find(item => item.id === payload.id)) {
                console.error(`Unable to delete Favorite[${payload.id}] does not exist`)
                return state;
            }
            return {...state, favorites: state.favorites.filter(item => item.id !== payload.id)}
        case "setDragTarget":
            if (state.drag.target === payload.id) return state;
            if (payload.id !== null && !state.favorites.find(item => item.id === payload.id)) {
                console.error(`Invalid Favorites[id]. Favorite[${payload.id}] does not exist`);
                return state;
            }
            if (state.drag.target && payload.id !== null) {
                console.error(`Cannot set [${payload.id}] as drag target. [${state.drag.target}] already being dragged`);
                return state
            }
            return {...state, drag: {...state.drag, target: payload.id}};
        case "order":
            if (payload.to < 0) {
                console.error(`Position must be a positive number. Given ${payload.to}.`)
                return state;
            }
            const currentPosition = state.favorites.findIndex((item) => item.id === payload.id);
            if (currentPosition === payload.to) return state;
            if (currentPosition < 0) {
                console.warn(`Can not reorder. Does not exist. Given id [${payload.id}]`);
                return state;
            }
            const currentItem = state.favorites.splice(currentPosition, 1)[0];
            state.favorites.splice(payload.to, 0, currentItem)
            return {
                ...state,
                favorites: [...state.favorites]
            }
        default :
            return state;
    }
}

type FavoritesContextData = {
    dragTarget: FavoritesItem['id'] | null,
    favorites: FavoritesItem[],
    setDragTarget: (id: FavoritesItem['id'] | null) => void,
    add: (data: FavoriteItemData) => void,
    remove: (id: FavoritesItem["id"]) => void,
    setOrder: (id: FavoritesItem['id'], to: number) => void
}
const dummy = () => console.error('Context was not defined');

const FavoriteContext = createContext<FavoritesContextData>({
        dragTarget: null,
        favorites: [],
        setDragTarget: dummy,
        add: dummy,
        remove: dummy,
        setOrder: dummy
    }
)

export function ProvideFavorites({children}: PropsWithChildren) {
    const [{favorites, drag}, dispatch] = useReducer(FavoritesReducer, defaultFavoritesState);
    return (
        <FavoriteContext.Provider
            value={
                {
                    favorites,
                    dragTarget: drag.target,
                    add(data) {
                        dispatch({type: 'add', payload: {data}})
                    },
                    remove(id) {
                        dispatch({type: 'remove', payload: {id}})
                    },
                    setOrder(id, to) {
                        dispatch({type: 'order', payload: {id, to}})
                    },
                    setDragTarget(id) {
                        dispatch({type: 'setDragTarget', payload: {id}})
                    }
                }}>
            {children}
        </FavoriteContext.Provider>
    )
}

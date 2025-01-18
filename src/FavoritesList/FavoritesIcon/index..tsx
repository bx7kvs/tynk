import {css} from "@linaria/core";
import {FavoritesItem} from "@root/FavoritesList/FavoritesIcon/types";
import {useDrag} from "react-dnd";
import {useEffect} from "react";
import {useFavorites} from "@root/FavoritesList/reducer";
import classNames from "classnames";

const FavoriteIconContainerStyle = css`
    display: block;
`;
const FavoriteIconContainerDraggingStyle = css`
    border: 1px sold red;
`;

export function FavoritesIcon({id, title, icon, type}: FavoritesItem) {
    const {setDragTarget, favorites} = useFavorites();
    const [{isDragging}, drag] = useDrag(() => ({
        type,
        canDrag: () => favorites.length > 0,
        collect(monitor) {
            return {
                isDragging: monitor.isDragging()
            }
        }
    }));
    useEffect(() => {
        setDragTarget(isDragging ? id : null)
    }, [isDragging]);
    return drag(
        <div className={classNames(FavoriteIconContainerStyle, isDragging && FavoriteIconContainerDraggingStyle)}>
            {icon}
            {title}
        </div>
    );
}

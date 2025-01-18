import {css} from "styled-components";
import {FavoritesItem} from "@root/FavoritesList/FavoritesIcon/types";
import {useDrag} from "react-dnd";
import classNames from "classnames";
import {useEffect} from "react";
import {useFavorites} from "@root/FavoritesList/reducer";

const FavoriteIconContainerStyle = css`
    display: block;
`;
const FavoriteIconContainerDraggingStyle = css`
    border: 1px sold red;
`;

export function FavoritesIcon({type, title, icon, id}: FavoritesItem) {
    const {setDragTarget} = useFavorites();
    const [{isDragging}, drag] = useDrag(() => ({
        type,
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

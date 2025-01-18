import {useDrop} from "react-dnd";
import {DNDTypes} from "@root/types";
import {PropsWithChildren, useState} from "react";
import {useFavorites} from "@root/FavoritesList/reducer";
import {css} from "@linaria/core";
import classNames from "classnames";

interface FavoritesIconCellProps extends PropsWithChildren {
    order: number
}

const FavoritesIconCellStyle = css`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #d3d3d3;
`;

const FavoritesIconCellDragOverStyle = css`
    background: #c7baba;
`

export function FavoritesIconCell({children, order}: FavoritesIconCellProps) {
    const {dragTarget, setOrder} = useFavorites();
    const [dragOver, setDragOver] = useState(false);
    const [, drop] = useDrop(() => ({
        accept: DNDTypes.FAVORITES,
        hover: (_, monitor) => setDragOver(Boolean(dragTarget && monitor.isOver({shallow: true}))),
        drop: () => {
            if (!dragTarget) throw new Error("No drag target");
            setOrder(dragTarget, order)
        }
    }), [dragTarget]);
    return drop(<div className={classNames(FavoritesIconCellStyle, dragOver && FavoritesIconCellDragOverStyle)}>
        {children}
    </div>)
}

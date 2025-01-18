import {useDrop} from "react-dnd";
import {DNDTypes} from "@root/types";
import {PropsWithChildren} from "react";
import {useFavorites} from "@root/FavoritesList/reducer";
import {css} from "styled-components";
import classNames from "classnames";

interface FavoritesIconCellProps extends PropsWithChildren {
    order: number
}

const FavoritesIconCellStyle = css`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #d3d3d3;
`;

export function FavoritesIconCell({children, order}: FavoritesIconCellProps) {
    const {dragTarget, setOrder} = useFavorites();
    const [, drop] = useDrop(() => ({
        accept: DNDTypes.FAVORITES,
        drop: () => {
            if (!dragTarget) throw new Error("No drag target");
            setOrder(dragTarget, order)
        }
    }), [dragTarget]);
    return drop(<div className={classNames(FavoritesIconCellStyle)}>
        {children}
    </div>)
}

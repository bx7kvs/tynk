
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {FavoritesIcon} from "@root/FavoritesList/FavoritesIcon/index.";
import {useFavorites} from "@root/FavoritesList/reducer";
import {FavoritesIconCell} from "@root/FavoritesList/FavoritesIconCell";
import {FavoritesAddForm} from "@root/FavoritesList/FavoritesAddForm";
import {styled} from "@linaria/react";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    max-width: 1024px;
    margin: 0 auto;
`;

export function FavoritesIconsList() {
    const {favorites} = useFavorites();
    return <DndProvider backend={HTML5Backend}>
        <Container>
            {
                favorites.map((item, key) => <FavoritesIconCell key={item.id} order={key}>
                    <FavoritesIcon {...item}/>
                </FavoritesIconCell>)
            }
            <FavoritesAddForm/>
        </Container>
    </DndProvider>
}

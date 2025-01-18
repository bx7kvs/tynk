import {ProvideFavorites} from "@root/FavoritesList/reducer";
import {FavoritesIconsList} from "@root/FavoritesList";

export function App() {
    return <ProvideFavorites>
        <FavoritesIconsList/>
    </ProvideFavorites>
}

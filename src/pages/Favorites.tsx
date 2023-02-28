import { useAppSelector } from "../app/hooks";
import { PhotosList } from "../components/photos/PhotosList";
import { photosCache } from "../features/photo-info/photosSlice";

export function FavoritesPage(props: any) {

    //const { data, loading, error } = useSelector((state: any) => state.photos);
    const data = useAppSelector(photosCache);

    let sorted = [...data];
    sorted = sorted.filter((item: any) => item.favorited);

    return (
        <PhotosList items={sorted}></PhotosList>
    );
}


import { useAppSelector } from "../app/hooks";
import { PhotosList } from "../components/photos/PhotosList";
import { photosCache } from "../features/photo-info/photosSlice";

export function RecentlyAddedPage(props: any) {

    //const { data, loading, error } = useSelector((state: any) => state.photos);
    const data = useAppSelector(photosCache);

    let sorted = [...data];
    
    sorted.sort((a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

    return (
        <PhotosList items={sorted}></PhotosList>
    );
}



import styles from './PhotoItem.module.css';

import { selectedPhotoId, setSelectedId } from '../../features/photo-info/photosSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sizeConverter } from '../../utils/utils';

export function PhotoItem(props: any) {

    const selectedId = useAppSelector(selectedPhotoId);

    const photo = props.data;
    const dispatch = useAppDispatch();  
    
    const isVertical: boolean = photo.dimensions.width < photo.dimensions.height; 
    const isSelected: boolean = photo.id === selectedId;

    return (
        <figure className={`${isVertical ? styles.vertical : styles.horizontal} ${isSelected ? styles.selected : ''}`} onClick={() => dispatch(setSelectedId(photo.id))}>
            <div className={`${styles["image-cover"]}`}>
                <img src={photo.url} alt={photo.filename} />
            </div>
            <figcaption>
                <span className={`${styles.title}`}>{photo.filename}</span>
                <span className={`${styles.size}`}>{sizeConverter(photo.sizeInBytes)}</span>
            </figcaption>
        </figure>
    );
}
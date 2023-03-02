import heartIcon from '../../heart.svg';
import heartSolidIcon from '../../heart-solid.svg';

import styles from './PhotoItem.module.css';

import { selectedPhoto, selectedPhotoId, toggleFavorite } from '../../features/photo-info/photosSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sizeConverter } from '../../utils/utils';
import PhotoModel from '../../photo';

export function PhotoItem(props: any) {

    const activePhotoId = useAppSelector(selectedPhotoId);    
    const dispatch = useAppDispatch(); 
    const photo = props.data;
    
    // Determines the orientation of the image's aspect ratio.
    // This is to accomodate the appropriate styling and prevents
    // the gap between the edges of the image and the container 
    // being visible.
    const isImgVertical: boolean = photo.dimensions.width < photo.dimensions.height; 
    // If this item is selected
    const isSelected: boolean = photo.id === activePhotoId;
    // Whether to show the favorite button or not
    const enableFavoriteButton = props.favoriteButton;
    // Wheter to replace the image with a text
    const imgReplacementText = props.imageReplacementText;

    const photoClickHandler = (data: PhotoModel) => () => { dispatch(selectedPhoto(data)); };

    const classNames = `${isImgVertical ? styles.vertical : styles.horizontal} ${isSelected ? styles.selected : ''} ${props.noEffects ? styles.noEffects : ''}`;

    return (
        <figure className={classNames} onClick={photoClickHandler(photo)}>
            <div className={styles.imgCover}>
                {imgReplacementText ? <p><em>{imgReplacementText}</em></p> : <img src={photo.url} alt={photo.filename} />}
            </div>
            <figcaption>
                <span className={`${styles.title}`}>{photo.filename !== "" ? photo.filename : "--"}</span>
                <span className={`${styles.size}`}>{photo.sizeInBytes <= 0 ? '--' : sizeConverter(photo.sizeInBytes)}</span>
                {enableFavoriteButton &&
                <button  className={styles.btnFavorite} onClick={() => dispatch(toggleFavorite(photo.id))}>
                    <img src={photo.favorited ? heartSolidIcon : heartIcon} alt="Favorite" />
                </button>}
            </figcaption>
        </figure>
    );
}
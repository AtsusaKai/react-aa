import heartIcon from '../../heart.svg';
import heartSolidIcon from '../../heart-solid.svg';

import styles from './PhotoInfo.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePhoto, photosCache, selectedPhotoId, toggleFavorite, unselectPhoto } from '../../features/photo-info/photosSlice';
import { formatDate, sizeConverter } from '../../utils/utils';
import PhotoModel from '../../photo';

export function PhotoInfo() {

    
    const openMobileInfo = () => {
        let appEl = document.querySelectorAll(".App-xxl");
        if (appEl.length > 0) {
            appEl[0].classList.add('mobile-info-open');
        }

        let infoEl = document.querySelectorAll(".photoInfo");
        if (infoEl.length > 0) {
            (appEl[0] as HTMLElement).style.maxHeight = "1222px";
        }
    };

    const clearSelection = () => {
        let el = document.getElementsByClassName("App-xxl");
        if (el.length > 0) {
            el[0].classList.remove('mobile-info-open');
        }
    };
    
    const dispatch = useAppDispatch();
    const data = useAppSelector(photosCache);
    const selectedId = useAppSelector(selectedPhotoId);
    
    let result = data.filter((item: any) => item.id === selectedId);
    const photo: PhotoModel =  (result.length ? result[0] : ({
        id: "",
        url: "",
        filename: "",
        description: "",
        uploadedBy: "",
        createdAt: "",
        updatedAt: "",
        dimensions: {
            width: 0,
            height: 0
        },
        resolution: {
            width: 0,
            height: 0
        },
        sizeInBytes: 0,
        sharedWith: [],
        favorited: false
    }));

    let hasSelected: boolean = result.length > 0;


    if (!hasSelected) {
        return (
            <section className={styles.photoInfo}>
                <figure>
                    <div className={styles.photoCover}>                        
                        <p><em>No selection</em></p>
                    </div>
                </figure>
            </section>
        );
    } else {
        openMobileInfo();
    }

    const isVertical: boolean = photo.dimensions.width < photo!.dimensions.height; 
    
    return (
        <section className={`${styles.photoInfo} ${hasSelected ? styles.selected : styles.unselected}`}>
            <button className={styles.closeInfo} onClick={() => { dispatch(unselectPhoto()); clearSelection(); }}>Close</button>
            <figure className={isVertical ? styles.vertical : styles.horizontal}>
                <div className={styles.photoCover}>
                    <img src={photo.url} alt={photo.filename} />
                </div>
                <figcaption>
                    <span className={styles.title}>{photo.filename}</span>
                    <span className={styles.size}>{sizeConverter(photo.sizeInBytes)}</span>
                    <button  className={styles.btnFavorite} onClick={() => dispatch(toggleFavorite(photo.id))}>
                        <img src={photo.favorited ? heartSolidIcon : heartIcon} alt="Favorite" />
                    </button>
                </figcaption>
            </figure>
            <div className={styles.details}>
                <h4>Information</h4>
                <div className={styles.infoItem}>
                    <span className={styles.heading}>Uploaded by</span>
                    <span className={styles.content}>{photo.uploadedBy}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.heading}>Created</span>
                    <span className={styles.content}>{formatDate(photo.createdAt)}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.heading}>Last modified</span>
                    <span className={styles.content}>{formatDate(photo.updatedAt)}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.heading}>Dimensions</span>
                    <span className={styles.content}>{photo.dimensions.width} x {photo.dimensions.height}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.heading}>Resolution</span>
                    <span className={styles.content}>{photo.resolution.width} x {photo.resolution.height}</span>
                </div>
            </div>
            <div className={styles.description}>
                <h4>Description</h4>
                <p>{photo.description ? photo.description : <em>(No description)</em>}</p>
            </div>
            <div className={styles.actions}>
                <button onClick={() => { dispatch(deletePhoto(photo.id)); clearSelection(); }}>Delete</button>
            </div>
        </section>
    );
}
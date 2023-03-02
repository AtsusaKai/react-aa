
import styles from './PhotoInfo.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePhoto, photosCache, selectedPhotoId, unselectPhoto } from '../../features/photo-info/photosSlice';
import { formatDate } from '../../utils/utils';
import PhotoModel from '../../photo';
import { PhotoItem } from './PhotoItem';
import { ModelDefaults } from '../../factory';

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

    const renderInformaton = (
        uploadedBy: string = "--", 
        createdAt: string = "--", 
        modifiedAt: string = "--", 
        dimensions: string = "--", 
        resolution: string = "--",
        description: string = "--") => 
    {
        return (
            <div className='info-content'>
                <div className={styles.details}>
                    <h4>Information</h4>
                    <div className={styles.infoItem}>
                        <span className={styles.heading}>Uploaded by</span>
                        <span className={styles.content}>{uploadedBy}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.heading}>Created</span>
                        <span className={styles.content}>{createdAt}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.heading}>Last modified</span>
                        <span className={styles.content}>{modifiedAt}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.heading}>Dimensions</span>
                        <span className={styles.content}>{dimensions}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.heading}>Resolution</span>
                        <span className={styles.content}>{resolution}</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <h4>Description</h4>
                    <p>{description !== "--" ? description : <em>(No description)</em>}</p>
                </div>
            </div>
        );
    };
    
    const dispatch = useAppDispatch();
    const data = useAppSelector(photosCache);
    const selectedId = useAppSelector(selectedPhotoId);
    
    let result = data.filter((item: any) => item.id === selectedId);
    const photo: PhotoModel = (result.length ? result[0] : ModelDefaults.photo);

    let hasSelected: boolean = result.length > 0;

    if (!hasSelected) {
        return (
            <section className={styles.photoInfo}>
                <PhotoItem data={ModelDefaults.photo} imageReplacementText="Select a photo to view." noEffects />                
                {renderInformaton()}                
                <div className={styles.actions}>
                    <button disabled={true}>Delete</button>
                </div>
            </section>
        );
    } else {
        openMobileInfo();
    }
    
    return (
        <section className={`${styles.photoInfo} ${hasSelected ? styles.selected : styles.unselected}`}>
            <button className={styles.closeInfo} onClick={() => { dispatch(unselectPhoto()); clearSelection(); }}>Close</button>
            <PhotoItem data={photo} favoriteButton noEffects />
            <div className={styles.details}>
            {renderInformaton(
                photo.uploadedBy, 
                formatDate(photo.createdAt), 
                formatDate(photo.updatedAt), 
                `${photo.dimensions.width} x ${photo.dimensions.height}`,
                `${photo.resolution.width} x ${photo.resolution.height}`,
                photo.description
            )}
            </div>
            <div className={styles.actions}>
                <button onClick={() => { dispatch(deletePhoto(photo.id)); clearSelection(); }}>Delete</button>
            </div>
        </section>
    );
}
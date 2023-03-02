
import { PhotoItem } from './PhotoItem';

import styles from './PhotosList.module.css';

export function PhotosList(props: any) {
    
    if (!props.items || props.items.length === 0) {
        return (
            <section className={styles.photoList}>
                <div className={styles.zilch}>
                    <p>You have no items at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.photoList}>
        {
            props.items.map((item: any, i: number) => 
            <PhotoItem 
                key={i} 
                data={item} 
            />)
        }
        </section>
    );
}
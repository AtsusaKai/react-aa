import styles from './ErrorNotFound.module.css';

export function ErrorNotFoundPage(props: any) {
    return (
        <section className={styles.photoList}>
            <div className={styles.zilch}>
                <p>Oops! You must have navigated to the abyss...</p>
            </div>
        </section>
    );
}
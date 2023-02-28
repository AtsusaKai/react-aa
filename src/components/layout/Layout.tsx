
import { Navigation } from './Navigation';

export function Layout(props: any) {
    return (
        <main>
            <Navigation />
            {props.children}
        </main>
    );
}
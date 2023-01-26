import styles from './Header.module.css';
import todoLogo from './../assets/todo-logo.svg';
export function Header () {
    return (
        <header className={styles.header}>
            <h1><img src={todoLogo} /> to<span>do</span></h1>
        </header>
    )
}


import Clipboard from './../assets/clipboard.svg'
import styles from './EmptyList.module.css'
export function EmptyList() {
    return (
        <div className={styles.emptyList}>
            <img src={Clipboard} />
            <p><strong>You don't have tasks registred yet</strong></p>
            <p>Create tasks and organize your to-do items</p>
        </div>
    )
}
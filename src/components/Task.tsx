import { Trash } from 'phosphor-react'
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import styles from './Task.module.css'

export interface TaskProps {
  idTask: string;
  content: string;
  finished: boolean;
  onFinishTask: (idTask: string) => void;
  onDeleteTask: (idTask: string) => void;
}

export function Task({idTask, content, onFinishTask, onDeleteTask, finished }: TaskProps) {

  const [finish, setFinish] = useState(finished); 

  function handleFinishTask() {
    setFinish(!finish);
    onFinishTask(idTask);
  }
  function handleDeleteTask() {
    onDeleteTask(idTask);
  }

  return (
    <article className={styles.task}>
      <input type="checkbox"
        checked={finish}
        onChange={handleFinishTask}
      />
      <p className={finish ? styles.lineTrought : ''}>{content}</p>
      <button onClick={handleDeleteTask}><Trash size={14} /></button>
    </article>
  )
}
import { ChangeEvent, FormEvent, useState } from 'react'
import { Header } from './components/Header'
import styles from './App.module.css'
import {PlusCircle} from 'phosphor-react'
import { EmptyList } from './components/EmptyList'
import { Task, TaskProps } from './components/Task'
import { v4 as uuidv4 } from 'uuid';

interface ITask {
  idTask: string;
  content: string;
  finished: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  function onFinishTask (idTask: string) {
    const taskListWithFinishedTasks = tasks.map(task => {
      if(task.idTask === idTask) {
        task.finished = !task.finished;
      }
      return task;
    });
    setTasks(taskListWithFinishedTasks);
  }

 

  function onDeleteTask (idTask: string) {
    let taskList = tasks.filter(el => el.idTask !== idTask);
    setTasks(taskList);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const newTaskObject = {
      idTask: uuidv4(),
      content: newTaskText,
      finished: false,
    }
    const newTaskListWithNewTask = [...tasks, newTaskObject];
    setTasks(newTaskListWithNewTask);
    setNewTaskText('');
  }

  const isNewTaskTextEmpty = newTaskText.length === 0;

  const finishedCount = tasks.reduce((acc, task) => {
    return acc += task.finished ? 1 : 0;
  }, 0);


  return (
    <>
      <Header/>
      <main className={styles.app}>
        <form className={styles.form} onSubmit={handleCreateTask}>
          <input type="text" placeholder="Add a new task" value={newTaskText} onChange={handleNewTaskChange} />
          <button disabled={isNewTaskTextEmpty}>Create <PlusCircle size={20} /></button>
        </form>

        <div className={styles.taskList}>
          <header>
            <div className={styles.tasksCreated}>
              <strong>Created Task</strong> <span>{tasks.length}</span>
            </div>
            <div className={styles.tasksFinished}>
              <strong>Finished</strong> <span>{finishedCount}</span>
            </div>
          </header>

          <section className={styles.taskListContent}>
            {
              tasks.length === 0 
              ? 
              <EmptyList />
              : 
              tasks.map(task => {
                return (
                  <Task 
                    key={task.idTask} 
                    idTask={task.idTask}
                    content={task.content} 
                    finished={task.finished}
                    onFinishTask={onFinishTask}
                    onDeleteTask={onDeleteTask}
                  />
                )}
              )
            }
          </section>
        </div>
      </main>
    </>
  )
}

export default App

import { useState } from 'react'
import { PlusCircle, Check, Trash } from 'phosphor-react'

import styles from './App.module.css'

export function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)


  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }

  function handleRemoveTask(id) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)
  }

  function handleToggleTask( id, value ) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <main>
      <header className={styles.header}>
        <img src="/logo.svg" alt="Lista de Tarefas" />
      </header>
      
      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <input 
            className={styles.input} 
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />

          <button type='button' className={styles.button} onClick={handleAddTask}>
            Criar <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </button>
      
        </div>

        <div className={styles.tasksList}>

          <div className={styles.listTaskHeader}>
            <aside>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </aside>

            <aside>
              <p>Concluidas</p>
              <span>{tasks.length === 0
              ? tasks.length
              : `${checkedTasksCounter} de ${tasks.length}`}</span>
            </aside>
          </div>

          {tasks.length > 0 ? (
           <div className={styles.tasksListContent}>
            {tasks.map((task) => {
               const checkboxCheckedClassname = task.isChecked
               ? styles['checkbox-checked']
               : styles['checkbox-unchecked']
             const paragraphCheckedClassname = task.isChecked
               ? styles['paragraph-checked']
               : ''
              return (             
              <div className={styles.tasksListContentItem} key={task.id}>
                  <div>
                    <label htmlFor="checkbox" onClick={() => handleToggleTask(task.id, !task.isChecked )}>
                      <input readOnly type="checkbox" checked={task.isChecked} />
                      <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                        {task.isChecked && <Check size={12} />}
                      </span>

                      <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>{task.text}</p>
                    </label>

                    <button type='button' onClick={() => handleRemoveTask(task.id)}>
                      <Trash size={16} color="#808080" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          ) : (
            <div className={styles.empty}>
            <img src="/clipboard.png" alt="ícone de prancheta" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}

        </div>
      </section>
    </main>
  )
}
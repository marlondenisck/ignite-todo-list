import { useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { Button } from './components/Button'
import { ItemList } from './components/ItemList'
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

  function handleToggleTask({ id, value }) {
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

          <Button type='button' onClick={handleAddTask}>
            Criar <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
      
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
            {tasks.map((task) => (
               <ItemList
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
              />
            ))}
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
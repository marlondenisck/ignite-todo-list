import { PlusCircle, Check, Trash } from 'phosphor-react'

import styles from './App.module.css'

export function App() {
  return (
    <main>
      <header className={styles.header}>
        <img src="/logo.svg" alt="Lista de Tarefas" />
      </header>
      
      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
        <input className={styles.input} placeholder="Adicione uma nova tarefa" />
        <button className={styles.button}>
          Criar <PlusCircle size={16} color="#f2f2f2" weight="bold" />
        </button>
      
        </div>


        <div className={styles.tasksList}>

        <div className={styles.listTaskHeader}>
          <aside>
            <p>Tarefas criadas</p>
            <span>0</span>
          </aside>

          <aside>
            <p>Concluidas</p>
            <span>123</span>
          </aside>
        </div>

          <div className={styles.tasksListContent}>

          <div className={styles.tasksListContentItem}>
            <div>
              <label htmlFor="checkbox" >
                <input readOnly type="checkbox"  />
                <span >
                  <Check size={12} />
                </span>

                <p>
                 asdasdad
                </p>
              </label>
            </div>

            <button >
              <Trash size={16} color="#808080" />
            </button>
          </div>
          </div>


          <div className={styles.empty}>
          <img src="/clipboard.png" alt="ícone de prancheta" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            Crie tarefas e organize seus itens a fazer
          </p>
        </div>


        </div>
      </section>
    </main>
  )
}
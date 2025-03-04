import styles from './ItemList.module.css'
import { Button } from './Button'

import { Check, Trash } from 'phosphor-react'

interface ItemListProps {
  data: {
    id: number;
    text: string;
    isChecked: boolean;
  },
  removeTask: (id: number) => void;
  toggleTaskStatus: ( {id, value}: {id: number, value: boolean} ) => void;
}

export function ItemList({ data, removeTask, toggleTaskStatus }: ItemListProps) {

function handleTaskToggle() {
  toggleTaskStatus({ id: data.id, value: !data.isChecked })
  }

  function handleRemove() {
    removeTask(data.id)
  }

  const checkboxCheckedClassname = data.isChecked
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked'];
  
  const paragraphCheckedClassname = data.isChecked
    ? styles['paragraph-checked']
    : '';

  return (
      <div className={styles.tasksListContentItem}>
          <div>
            <label htmlFor="check" onClick={handleTaskToggle}>
              <input id={`checkbox-${data.id}`} type="checkbox" checked={data.isChecked} />
              <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
                {data.isChecked && <Check size={12} />}
              </span>

              <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>{data.text}</p>
            </label>

            <Button type='button' onClick={handleRemove}>
              <Trash size={16} color="#808080" />
            </Button>
          </div>
        </div>
      )
}
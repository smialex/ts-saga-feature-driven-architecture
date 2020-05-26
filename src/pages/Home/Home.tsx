import React from 'react'
import { TodoLoadButton, TodoListView } from '../../features/todo'


export const Home = () => {
  return (
    <div>
      <TodoLoadButton>Загрузить данные</TodoLoadButton>
      <TodoListView />
    </div>
  )
}

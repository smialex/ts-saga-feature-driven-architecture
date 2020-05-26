import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectTodoItems } from '../../modules/todo/selectors'
import { TTodoItem } from '../../../../service/api/todoApi'

const TodoListViewRow : FC<{todoItem : TTodoItem}> = ({ todoItem }) =>{
  return (
    <tr>
      <td>{todoItem.userId}</td>  
      <td>{todoItem.id}</td>  
      <td>{todoItem.title}</td>  
      <td>{todoItem.completed.toString()}</td>    
    </tr>
  )
}

export const TodoListView =  () => {
  const todoItems = useSelector(selectTodoItems);

  if( !todoItems || !todoItems.length)
    return null;

  return (
    <table>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Item Id</th>
          <th>Title</th>
          <th>Complited</th>
        </tr>
      </thead>
      <tbody>
        {
          todoItems.map( item=> <TodoListViewRow todoItem={item} key={item.id} />)
        }
      </tbody>
    </table>
  )
}

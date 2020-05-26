import React, {useCallback, FC} from 'react'
import {useDispatch} from 'react-redux';
import { Button } from '../../../ui';
import { useIsLoading } from '../../../store/modules/loader';
import { loadTodoItems } from '../modules/todo/actions'


export const TodoLoadButton : FC = ({children}) => {
  const dispatch = useDispatch()

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(loadTodoItems());
    },
    [dispatch],
  )

  const isLoading = useIsLoading();

  return (
    <Button onClick={onClick} disabled={isLoading}>{ isLoading ? 'Loading...' : children}</Button>
  )
}

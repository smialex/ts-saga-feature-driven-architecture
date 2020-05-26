import React, { FC } from 'react'
import './Button.css'

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button : FC<TProps> = ({children , ...rest}) => {
  return (
    <button className='button' {...rest}>{children}</button>
  )
}

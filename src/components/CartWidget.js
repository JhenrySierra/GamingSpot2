import React from 'react'
import { ShoppingCart } from 'phosphor-react'


export const CartWidget = () => {
  return (
    <div>
      <p>3</p>
      <ShoppingCart size={32} color='green' className='cartContainer' />
    </div>                
  )
}


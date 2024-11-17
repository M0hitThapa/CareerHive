import React from 'react'

const Card = ({ children, bg = 'bg-black'}) => {
  return (
  <div className={`${bg} p-6 rounded-lg shadow-md bg-black shadow-2xl shadow-neutral-200/20  `}>{children}</div>
  )
}

export default Card;
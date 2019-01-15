import React from 'react'

export default function Loading() {
  return (
    <div className='loading-container'>
      <div className='square square-0 loading-icon'>
        <h4 className='main-title'>load<span>ing</span></h4>
      </div>  
      <h2 className='loading-text'>Loading Animations...</h2>
    </div>
  )
}
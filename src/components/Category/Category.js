import React from 'react';
import '../Category/Category.css'

function Category() {
  const content = 'Oops! Function under development';
  return (
    <div>
      <div className='title'>Category</div>
      <div className='content'>{content}</div>
    </div>
  )
}

export default Category
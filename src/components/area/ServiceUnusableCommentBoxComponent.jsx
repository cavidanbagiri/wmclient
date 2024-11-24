
import React from 'react'

function ServiceUnusableCommentBoxComponent(props) {
  return (
    <div className='absolute top-10  right-0 bg-white border rounded-2xl shadow-2xl text-lg text-start p-5 w-96 h-96 z-10 overflow-auto'>
        <p className='text-center text-2xl font-bold mb-5'>Komentler</p>
        <span className='w-full  h-full text-wrap'>
            {props.comment_box}
        </span>
    </div>
  )
}

export default ServiceUnusableCommentBoxComponent

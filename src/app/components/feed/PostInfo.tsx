'use client'

import { deletePost } from '@/lib/action'
import Image from 'next/image'
import { useState } from 'react'

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false)

  const deletePostId = deletePost.bind(null,postId)
  return (
    <div className='relative'>
      <Image
        src='/more.png'
        alt='img'
        width={16}
        height={16}
        className='cursor-pointer'
        onClick={() => setOpen(prev => !prev)}
      />
      {open && (
        <div className='absolute top-4 right-0 bg-white z-10 w-40 flex flex-col p-4 gap-2  rounded-md shadow-md'>
            <span className='cursor-pointer border-b-2 pb-1 '>View</span>
            <span className='cursor-pointer border-b-2 pb-1 '>Re-post</span>
            <form action={deletePostId} >
                <input type='hidden' name='postId' value={postId} />
                <button className='text-red-600'>Delete</button>
            </form>
        </div>
      )}
    </div>
  )
}

export default PostInfo

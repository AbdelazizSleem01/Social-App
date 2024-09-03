"use client"

import { useFormStatus } from 'react-dom'

const AddPostButton = () => {
  const { pending } = useFormStatus()
  return (
    <div>
      <button
        disabled={pending}
        className='bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-300 disabled:cursor-not-allowed'
      >
        {pending ? (
          <div className='flex items-center gap-2 '>
            <div className='inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]'>
            </div>
              Posting
          </div>
        ) : (
          'Post'
        )}
      </button>
    </div>
  )
}

export default AddPostButton

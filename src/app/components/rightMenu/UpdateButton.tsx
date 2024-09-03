"use client"


import { useFormStatus } from 'react-dom'

const UpdateButton = () => {
  const { pending } = useFormStatus()

  return (
    <div className=''>
      <button
        disabled={pending}
        type='submit'
        className='w-full px-4 py-2 mt-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed'
      >
        {pending ? 'Updating...' : 'Update'}
      </button>
    </div>
  )
}

export default UpdateButton

'use client'

import { useUser } from '@clerk/nextjs'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import AddPostButton from './AddPostButton'
import { addPost } from '@/lib/action'

const AddPost = () => {
  const { isLoaded, user } = useUser()
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState<any>('')

  if (!isLoaded)
    return (
      <>
        <div className='flex flex-col items-center gap-2  justify-center text-center'>
          <div className='inline-block h-6 w-6 animate-spin rounded-full border-4 border-blue-600 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
          Loading...
        </div>
      </>
    )

  return (
    <div className='p-4 bg-white rounded-xl shadow-lg flex gap-4 justify-between text-sm'>
      {/* avatar */}
      <Image
        src={user?.imageUrl || '/noAvatar.png'}
        width={48}
        height={48}
        alt='avatar'
        className='w-12 h-12 rounded-full border'
      />
      {/* post */}
      <div className='flex-1'>
        {/* input */}
        <form
          action={formData => {
            addPost(formData, img?.secure_url || '')
          }}
          className='flex gap-4'
        >
          <textarea
            placeholder='Share What do you want..'
            className='flex-1 p-2 bg-slate-200 rounded-lg'
            name='desc'
            onChange={e => setDesc(e.target.value)}
          ></textarea>
          <div>
            <Image
              src='/emoji.png'
              width={20}
              height={20}
              alt='img'
              className='w-5 h-5 cursor-pointer  self-end'
            />
            <AddPostButton />
          </div>
        </form>
        {/* options */}
        <div className='flex items-center gap-4 mt-4  text-gray-500 flex-wrap'>
          <CldUploadWidget
            uploadPreset='Dragon'
            onSuccess={(result, { widget }) => {
              setImg(result.info)
              widget.close()
            }}
          >
            {({ open }) => {
              return (
                <div
                  className='flex items-center gap-3 cursor-pointer'
                  onClick={() => open()}
                >
                  <Image src='/addimage.png' width={20} height={20} alt='img' />
                  Photo
                </div>
              )
            }}
          </CldUploadWidget>
          <div className='flex items-center gap-3 cursor-pointer'>
            <Image src='/addVideo.png' width={20} height={20} alt='img' />
            Video
          </div>
          <div className='flex items-center gap-3 cursor-pointer'>
            <Image src='/poll.png' width={20} height={20} alt='img' />
            Poll
          </div>
          <div className='flex items-center gap-3 cursor-pointer'>
            <Image src='/addevent.png' width={20} height={20} alt='img' />
            Event
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost

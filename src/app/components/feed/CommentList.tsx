'use client'

import { addComment } from '@/lib/action'
import { useUser } from '@clerk/nextjs'
import { Comment, User } from '@prisma/client'
import Image from 'next/image'
import { useOptimistic, useState } from 'react'

type CommentWithUser = Comment & { user: User }

const CommentList =  ({
  comments,
  postId
}: {
  comments: CommentWithUser[]
  postId: number
}) => {
  const { user } = useUser()
  const [commentState, setCommentState] = useState(comments)
  const [desc, setDesc] = useState('')

  const add =async ()=>{
    if(!user || !desc) return;

    addOptimisticComment({
      id:Math.random(),
      desc,
      createdAt:new Date(Date.now()),
       updatedAt:new Date(Date.now()),
       userId:user.id,
       postId:postId,
       user:{
         id:user.id,
         avatar:user.imageUrl || "/noAvatar.png",
         username:"Sending Please Wait...",
         cover:"",
         description:"",
         name:"",
         surname:"",
         city:"",
         work:"",
         school:"",
         website:"",
         createdAt:new Date(Date.now()),
       }
    })

    try{
      const createdComment =await addComment(postId,desc)

      setCommentState((prev)=>[createdComment, ...prev])
    }catch(err){
      console.error('Failed to add comment', err)
      throw new Error('Something went wrong!')
    }

  }

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  )

  return (
    <div>
      {/* Write */}
      {user && (
        <div className=' flex items-center gap-4'>
          <Image
            src={user.imageUrl || '/noAvatar.png'}
            alt='stories'
            width={40}
            height={40}
            className='rounded-full'
          />
          <form
            action={add}
            className='flex-1 flex items-center justify-between bg-slate-100 rounded-2xl px-4 py-2 w-full'
          >
            <input
              type='text'
              placeholder='Write a comment...'
              className='bg-transparent outline-none rounded-full flex-1'
              onChange={e => setDesc(e.target.value)}
            />
            <Image
              src='/emoji.png'
              alt='emoji'
              width={16}
              height={16}
              className='cursor-pointer'
            />
          </form>
        </div>
      )}
      {/* Comment List */}
      <div className=''>
        {optimisticComment.map(comment => (
          <div className='flex  gap-8 justify-between mt-6' key={comment.id}>
            {/* avatar */}
            <Image
              src={comment.user.avatar || '/noAvatar.png'}
              alt='stories'
              width={40}
              height={40}
              className='rounded-full w-10 h-10'
            />
            {/* description */}
            <div className=' flex flex-col gap-2 flex-1'>
              <span className='font-medium'>
                {comment.user.name && comment.user.surname
                  ? comment.user.name + '' + comment.user.surname
                  : comment.user.username}

                <div className='text-sm text-gray-500'>{comment.createdAt.toLocaleString()}</div>
              </span>
              <p className='text-base font-light'>
                {comment.desc}
              </p>
              <div className='flex items-center gap-8 text-sm text-gray-500 mt-3'>
                <div className='flex items-center gap-4'>
                  <Image
                    src='/like.png'
                    alt='emoji'
                    width={12}
                    height={12}
                    className='cursor-pointer w-4 h-4'
                  />
                  <span className='text-gray-300'>|</span>
                  <span className='text-gray-500'>123 Likes</span>
                </div>
                <div className=''>Reply</div>
              </div>
            </div>
            {/* icon */}
            <Image
              src='/more.png'
              alt='emoji'
              width={16}
              height={16}
              className='cursor-pointer w-4 h-4'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList

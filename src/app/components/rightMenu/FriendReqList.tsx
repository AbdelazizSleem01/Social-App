'use client'

import { acceptFollowReq, declineFollowReq } from '@/lib/action'
import prisma from '@/lib/client'
import { FollowReq, User } from '@prisma/client'
import Image from 'next/image'
import { useOptimistic, useState } from 'react'

type RequestWithUser = FollowReq & {
  sender: User
}

const FriendReqList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [reqState, setReqState] = useState(requests)

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticReq(requestId)
    try {
      await acceptFollowReq(userId)
      setReqState(prevState => prevState.filter(req => req.id !== requestId))
    } catch (err) {
      console.error('Error in accept:', err)
      throw new Error('Something went wrong!')
    }
  }
  const decline = async (requestId: number, userId: string) => {
    removeOptimisticReq(requestId)
    try {
      await declineFollowReq(userId)
      setReqState(prevState => prevState.filter(req => req.id !== requestId))
    } catch (err) {
      console.error('Error in accept:', err)
      throw new Error('Something went wrong!')
    }
  }

  const [optimisticReq, removeOptimisticReq] = useOptimistic(
    reqState,
    (state, value: number) => state.filter(req => req.id !== value)
  )
  return (
    <div>
      {optimisticReq.map(request => (
        <div
          className='flex items-center justify-between gap-4'
          key={request.id}
        >
          <div className='flex items-center gap-4'>
            <Image
              src={request.sender.avatar || '/noAvatar.png'}
              alt=''
              width={40}
              height={40}
              className=' w-10 h-10 rounded-full object-cover'
            />
            <span>
              {request.sender.name && request.sender.surname
                ? request.sender.name + ' ' + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className=' flex gap-3 justify-end'>
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src='/accept.png'
                  alt=''
                  width={20}
                  height={20}
                  className='cursor-pointer'
                />
              </button>
            </form>
            <form action={() => decline(request.id, request.sender.id)}>
              <button>
              <Image
                  src='/reject.png'
                  alt=''
                  width={20}
                  height={20}
                  className='cursor-pointer'
                />
              </button>
            </form>
  
          </div>
        </div>
      ))}
    </div>
  )
}

export default FriendReqList

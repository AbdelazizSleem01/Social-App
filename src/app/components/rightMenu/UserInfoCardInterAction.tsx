'use client'

import { switchBlock, switchFollow } from '@/lib/action'
import { useOptimistic, useState } from 'react'

const UserInfoCardInterAction = ({
  userId,
  isFollowing,
  isFollowingSent,
  isUserBlocked
}: {
  userId: string
  isFollowing: boolean
  isFollowingSent: boolean
  isUserBlocked: boolean
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingReqSent: isFollowingSent
  })
  const follow = async () => {
    switchOptimisticState('Follow')
    try {
      await switchFollow(userId)
      setUserState((prevState) => ({
        ...prevState,
        following: prevState.following && false,
        followingReqSent:
          !prevState.following && !prevState.followingReqSent ? true : false
      }))
    } catch (error) {
      console.error('Failed to follow user', error)
    }
  }

  const block = async () => {
    switchOptimisticState('Block')

    try {
      await switchBlock(userId)
      setUserState(prev => ({
        ...prev,
        blocked: !prev.blocked
      }))

      setUserState(prevState => ({
        ...prevState,
        blocked: true
      }))
    } catch (error) {
      console.error('Failed to block user', error)
    }
  }

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: 'Follow' | 'Block') =>
      value === 'Follow'
        ? {
            ...state,
            following: !state.following && false,
            followingReqSent:
              !state.following && !state.followingReqSent ? true : false
          }
        : { ...state, blocked: !state.blocked }
  )

  return (
    <>
      <form action={follow} >
        <button className='w-full bg-blue-500 text-white text-sm rounded-lg py-1 px-2'>
          {optimisticState.following
            ? 'Following'
            : optimisticState.followingReqSent
            ? 'Friend Request Sent'
            : 'Follow'
          }
        </button>
      </form>
      <form action={block} className='self-end'>
        <button>
          <span className='text-red-500 text-sm self-end cursor-pointer'>
            {optimisticState.blocked ? 'Unblock User' : ' Block User'}
          </span>
        </button>
      </form>
    </>
  )
}

export default UserInfoCardInterAction

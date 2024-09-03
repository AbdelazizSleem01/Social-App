import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import FriendReqList from './FriendReqList'

const FriendReq = async () => {
  const { userId } = auth()

  if (!userId) return null

  const requests = await prisma.followReq.findMany({
    where: {
      receiverId: userId
    },
    include: {
      sender: true
    }
  })
  if (requests.length === 0) return null

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 '>
      {/* top */}
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500'>Friend Request</span>
        <Link href={'/'} className='text-blue-500  text-sm'>
          See all
        </Link>
      </div>
      {/* USER */}
      <FriendReqList requests={requests} />
    </div>
  )
}

export default FriendReq

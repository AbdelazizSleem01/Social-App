import prisma from '@/lib/client'
import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

const UserMedCard = async ({ user }: { user?: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user?.id,
      img: {
        not: null
      }
    },
    take: 8,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 '>
      {/* top */}
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500'>User Media</span>
        <Link href={'/'} className='text-blue-500  text-sm'>
          See all
        </Link>
      </div>
      {/* images */}
      <div className='flex gap-4 justify-between flex-wrap'>
        {postsWithMedia.length ? (
          postsWithMedia.map(post => (
            <div className='relative w-1/5 h-24' key={post.id}>
              <Image
                src={post.img!}
                alt='img'
                className='rounded-md object-cover'
                fill
              />
            </div>
          ))
        ) : (
          <>
            <div className='flex justify-center items-center w-full'>
              <h2 className='self-center font-semibold text-base'>No media found! 😌</h2>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserMedCard

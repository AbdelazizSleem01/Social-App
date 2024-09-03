import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'

const ProfileCard = async () => {
  const { userId } = auth()

  if (!userId) return null

  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      _count: {
        select: {
          follower: true
        }
      }
    }
  })

  if (!user) return null

  console.log(user)

  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
      <div className='h-24 relative'>
        <Image
          src={user.cover || '/noCover.png'}
          alt='CoverImg'
          fill
          className='rounded-md object-cover'
        />
        <Image
          src={user.avatar || '/noAvatar.png'}
          alt='AvatarImg'
          width={48}
          height={48}
          className='rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10'
        />
      </div>
      <div className='h-24 flex flex-col gap-2 items-center'>
        <span className='font-semibold'>
          {user.username && user.surname
            ? user.name + ' ' + user.surname
            : user.username}
        </span>
        <div className=' flex items-center gap-4 text-gray-500'>
          {/* <div className='flex'>
            <Image
              src={'/me.jpeg'}
              alt='img'
              width={12}
              height={12}
              className='h-5 w-3 rounded-full object-cover'
            />
            <Image
              src={'/me.jpeg'}
              alt='img'
              width={12}
              height={12}
              className='h-5 w-3 rounded-full object-cover'
            />
            <Image
              src={'/me.jpeg'}
              alt='img'
              width={12}
              height={12}
              className='h-5 w-3 rounded-full object-cover'
            />
          </div> */}
          <span className='text-xs'>{user._count.follower} Followers</span>
        </div>
        <Link href={`/profile/${user.username}`}>
          <button className='bg-blue-500 text-white text-sm py-2 px-4 rounded-md mt-2'>
            My Profile
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileCard

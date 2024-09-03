import Image from 'next/image'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import RightMenu from '@/app/components/rightMenu/RightMenu'
import Feed from '@/app/components/feed/Feed'
import LeftMenu from '@/app/components/leftMenu/LeftMenu'



const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username

  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      _count: {
        select: {
          follower: true,
          following: true,
          Post: true
        }
      }
    }
  })
  console.log('User:', user);


  if (!user)
    return (
      <div className='h-[85vh] flex items-center justify-center'>
        <h1 className=' self-center flex items-center'>
          <span className='font-extrabold text-2xl mr-2'> 404 | </span> This
          page could not be found.
        </h1>
      </div>
    )

  const { userId: currentUserId } = auth()
  
  console.log('currentUserId:', currentUserId);
  let isBlocked
  
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId
      }
    })
    if (res) isBlocked = true
    else isBlocked = false
  }

  if (isBlocked)
    return (
      <div className='h-[85vh] flex items-center justify-center'>
        <h1 className=' self-center flex items-center'>
          <span className='font-extrabold text-2xl mr-2'> 404 | </span> This
          page could not be found.
        </h1>
      </div>
    )

  return (
    <div>
      <div className='flex gap-6 py-6'>
        <div className='hidden xl:block w-[20%]'>
          <LeftMenu
           type='profile' />
        </div>
        <div className=' w-full lg:w-[70%] xl:w-[50%]'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md'>
              <div className='w-full h-64 relative'>
                <Image
                  src={user.cover || '/noCover.png'}
                  alt='CoverImg'
                  className='object-cover rounded-lg'
                  fill
                />
                <Image
                  src={user.avatar || '/noAvatar.png'}
                  alt='AvatarImg'
                  className='object-cover w-32 h-32 absolute left-0 right-0 rounded-full m-auto -bottom-16 ring-4 ring-white'
                  width={128}
                  height={128}
                />
              </div>
              <h1 className='mt-20 mb-4 text-2xl font-medium'>
                {user.username && user.surname
                  ? user.name + ' ' + user.surname
                  : user.username}
              </h1>
              <div className='flex items-center justify-center gap-12 mb-4'>
                <div className='flex flex-col items-center py-1'>
                  <span className='font-medium'>{user._count.Post}</span>
                  <span className='text-sm'>Posts</span>
                </div>
                <div className='flex flex-col items-center py-1'>
                  <span className='font-medium'>{user._count.follower}</span>
                  <span className='text-sm'>Followers</span>
                </div>
                <div className='flex flex-col items-center py-1'>
                  <span className='font-medium'>{user._count.following}</span>
                  <span className='text-sm'>Following</span>
                </div>
              </div>
            </div>
            <Feed username={user.username}/>
          </div>
        </div>
        <div className='hidden lg:block w-[30%]'>
          <RightMenu user={user} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

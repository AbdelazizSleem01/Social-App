import Link from 'next/link'
import Image from 'next/image'
import ProfileCard from './ProfileCard'
import Ad from '../Ad'

const LeftMenu = ({ type }: { type: 'home' | 'profile' }) => {
  return (
    <div className='flex flex-col gap-6 '>
      {type === 'home' && <ProfileCard />}

      <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-2 text-gray-500'>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/posts.png'} alt='post' width={16} height={16} />
          <span>My Post</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/activity.png'} alt='post' width={16} height={16} />
          <span>Activity</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/market.png'} alt='post' width={16} height={16} />
          <span>MarketPlace</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/events.png'} alt='post' width={16} height={16} />
          <span>Events</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/albums.png'} alt='post' width={16} height={16} />
          <span>Albums</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/videos.png'} alt='post' width={16} height={16} />
          <span>Videos</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/news.png'} alt='post' width={16} height={16} />
          <span>News</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/courses.png'} alt='post' width={16} height={16} />
          <span>Courses</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/lists.png'} alt='post' width={16} height={16} />
          <span>Lists</span>
        </Link>
        <hr className='border-t-2 border-gray-300 w-36 self-center'/>
        <Link href={'/'} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-300 duration-150'>
          <Image src={'/settings.png'} alt='post' width={16} height={16} />
          <span>Settings</span>
        </Link>
      </div>
      <Ad size='sm'/>
    </div>
  )
}

export default LeftMenu

import Link from 'next/link'
import MobileMenu from './MobileMenu'
import Image from 'next/image'
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div className='h-24 flex items-center justify-between'>
      {/* Left */}
      <div className=' md:hidden lg:block w-[20%]'>
        <Link href={'/'} className='font-bold text-xl text-blue-500'>
          DRAGON
        </Link>
      </div>
      {/* Center */}
      <div className='hidden md:flex w-[50%] text-sm justify-between items-center'>
        {/* Links */}
        <div className='flex gap-6 text-gray-600'>
          <Link href={'/'} className='flex gap-3 items-center'>
            <Image
              src='/home.png'
              alt='HomePage'
              width={20}
              height={16}
              className='w-5 h-5 '
            />
            <span>HomePage</span>
          </Link>
          <Link href={'/'} className='flex gap-3 items-center'>
            <Image
              src='/friends.png'
              alt='Friends'
              width={20}
              height={16}
              className='w-5 h-5 '
            />
            <span>Friends</span>
          </Link>
          <Link href={'/'} className='flex gap-3 items-center'>
            <Image
              src='/stories.png'
              alt='Stories'
              width={20}
              height={16}
              className='w-5 h-5 '
            />
            <span>Stories</span>
          </Link>
        </div>
        {/* searchBar */}
        <div className='hidden p-2 xl:flex md:flex ml-10 p-2  bg-slate-200 rounded-xl items-center'>
          <input
            type='text'
            className=' outline-none bg-transparent'
            placeholder='Search...'
          />
          <Image  src='/search.png' width={20} height={20} alt='search' />
        </div>
      </div>
      {/* Right */}
      <div className='w-[30%] flex items-center gap-4 xl:gap-8 justify-end'>
        <ClerkLoading>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1s_linear_infinite] dark:text-white' />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <div className='cursor-pointer'>
              <Image src='/people.png' width={20} height={20} alt='people' />
            </div>
            <div className='cursor-pointer'>
              <Image
                src='/messages.png'
                width={20}
                height={20}
                alt='messages'
              />
            </div>
            <div className='cursor-pointer'>
              <Image
                src='/notifications.png'
                width={20}
                height={20}
                alt='notifications'
              />
            </div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className='cursor-pointer flex items-center'>
              <Image
                className='mx-2 h-7 w-7 border rounded-full '
                src='/noAvatar.png'
                width={22}
                height={22}
                alt='login'
              />
              <Link href={'/sign-in'}> Login | Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  )
}

export default Navbar

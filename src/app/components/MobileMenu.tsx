'use client'

import Link from 'next/link'
import { useState } from 'react'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='md:hidden'>
      <div
        className=' flex flex-col gap-1 cursor-pointer'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div
          className={` w-6 h-1 bg-blue-600 rounded-sm ${
            isOpen ? 'rotate-45' : ''
          } origin-left ease-in-out duration-500 `}
        />
        <div
          className={` w-6 h-1 bg-blue-600 rounded-sm ${
            isOpen ? 'opacity-0' : ''
          } ease-in-out duration-500 `}
        />
        <div
          className={` w-6 h-1 bg-blue-600 rounded-sm ${
            isOpen ? '-rotate-45' : ''
          } origin-left ease-in-out duration-500 `}
        />
      </div>
      {isOpen && (
        <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-10 font-medium text-xl z-10'>
          <Link href={'/'} className='text-black'>
            Home
          </Link>
          <Link href={'/'} className='text-black'>
            Friends
          </Link>
          <Link href={'/'} className='text-black'>
            Groups
          </Link>
          <Link href={'/'} className='text-black'>
            Stories
          </Link>
          <Link href={'/'} className='text-black'>
            Profile
          </Link>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
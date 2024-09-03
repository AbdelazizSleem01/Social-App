import Image from 'next/image'
import React from 'react'

const Ad = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm '>
      {/* top */}
      <div className='flex items-center justify-between text-gray-500 font-medium'>
        <span className='text-gray-500'>Sponsored Ads</span>
        <Image src={'/more.png'} alt='more' width={16} height={16} className='object-cover'/>
      </div>
      {/* bottom */}
      <div
        className={`flex flex-col mt-2 ${size === 'sm' ? 'gap-2' : 'gap-4'}`}
      >
        <div
          className={`relative w-full ${
            size === 'sm' ? 'h-24' : size === 'md' ? 'h-36' : 'h-48'
          }`}
        >
          <Image
            src={'/stories.jpg'}
            alt='ad1'
            fill
            className='rounded-lg object-cover mt-2'
          />
        </div>
      </div>
      <div className='flex items-center gap-4 mt-5'>
        <Image
          src={'/stories.jpg'}
          alt='ad1'
          width={24}
          height={24}
          className='rounded-full object-cover w-6 h-6'
        />
        <span className='text-blue-500 font-medium'>Abdelaziz Sleem</span>
      </div>
      <p className={`${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {size === 'sm'
          ? ' Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
          : size === 'md'
          ? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
          : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.  Lorem ipsum dolor sit amet, consectetur adipisicing elit. '}
      </p>
      <button className='bg-gray-200 text-gray-500 text-sm p-2 rounded-lg w-full mt-3 '>
        Learn More
      </button>
    </div>
  )
}

export default Ad

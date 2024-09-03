import Image from 'next/image'
import Link from 'next/link'

const BirthDays = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* top */}
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500'>Birthday</span>
      </div>
      {/* User */}
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <Image
            src='/stories.jpg'
            alt=''
            width={40}
            height={40}
            className=' w-10 h-10 rounded-full object-contain'
          />
          <span>Abdelaziz Sleem</span>
        </div>
        <div className=' flex gap-3 justify-end'>
          <button className='bg-blue-500 text-white text-md px-2 py-1 font-medium rounded-md hover:bg-blue-600 transition-all delay-100'>
            celebrate
          </button>
        </div>
      </div>
      <div className='p-4 bg-slate-100 rounded-lg flex items-center gap-4'>
        <Image src='/gift.png' alt='gift' width={24} height={24} />
        <Link href={'/'} className='flex flex-col gap-1 text-sm '>
        <span className='text-gray-700 font-semibold'>Upcoming Birthday</span>
        <span className='text-gray-500'>see other 16 have upcoming Birthday</span>
        </Link>
      </div>
    </div>
  )
}

export default BirthDays

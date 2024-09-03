'use client'

import { updateProfile } from '@/lib/action'
import { User } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import UpdateButton from './UpdateButton'

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false)
  const [cover, setCover] = useState<any>(false)

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false
  })

  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
    {
      state.success && router.refresh()
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className={`relative inline-flex items-center px-2 py-1 border border-transparent text-[13px] font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        Edit Profile
      </button>
      {open && (
        <div className='absolute w-full h-screen top-0 left-0 right-0 bg-black bg-opacity-65 overflow-x-hidden-hidden flex items-center justify-center z-50 '>
          <form
            action={formData =>
              formAction({ formData, cover: cover?.secure_url || '' })
            }
            className='p-12 bg-white rounded-lg shadow-lg flex flex-col gap-2 w-12 md:w-1/2 sm:w-1/3 relative '
          >
            <h1 className=' text-center'>Update Profile</h1>
            <div className='text-sm mt-4 text-gray-500  text-center'>
              Use the navbar to change the username and avatar.
            </div>
            {/* COVeR */}

            <CldUploadWidget
              uploadPreset='Dragon'
              onSuccess={result => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className='flex flex-col gap-4 my-4'
                  >
                    <label htmlFor=''> Cover Picture</label>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      <Image
                        src={user.cover || '/noCover.png'}
                        alt=''
                        width={48}
                        height={32}
                        className='w-12 h-8 rounded-md object-cover'
                      />
                      <span className='text-sm underline text-gray-500'>
                        Change
                      </span>
                    </div>
                  </div>
                )
              }}
            </CldUploadWidget>
            <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
              {/* inputs */}
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  First Name
                </label>
                <input
                  name='name'
                  type='text'
                  placeholder={user.name || 'John'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>
              {/* inputs */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  Surname
                </label>
                <input
                  name='surname'
                  type='text'
                  placeholder={user.surname || 'Doe'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>

              {/* inputs */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  Description
                </label>
                <input
                  name='description'
                  type='text'
                  placeholder={user.description || 'Write any thing here...'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>

              {/* inputs */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  City
                </label>
                <input
                  name='city'
                  type='text'
                  placeholder={user.city || 'Cairo'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>

              {/* inputs */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  School
                </label>
                <input
                  name='school'
                  type='text'
                  placeholder={user.school || 'STEAM School'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>

              {/* inputs */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  Work
                </label>
                <input
                  name='work'
                  type='text'
                  placeholder={user.work || 'Ula ICU'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>

              {/* inputs */}

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-sm text-gray-600'>
                  Website
                </label>
                <input
                  name='website'
                  type='text'
                  placeholder={user.website || 'ZEZO.dev'}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                />
              </div>
              <div className='w-full'>
                <UpdateButton />
              </div>

              {state.success && (
                <span className='text-green-600'>
                  Profile updated successfully!
                </span>
              )}
              {state.error && (
                <span className='text-red-600'>
                  {' '}
                  Failed to updated Profile!
                </span>
              )}
            </div>

            <button
              onClick={handleClose}
              className='absolute top-3 right-3 px-2 py-1  text-white bg-red-500 rounded-full  hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              X
            </button>
          </form>
          <div></div>
        </div>
      )}
    </div>
  )
}

export default UpdateUser

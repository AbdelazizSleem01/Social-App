import { SignIn } from '@clerk/nextjs'

export default function Page () {
  return (
    <div className='h-auto flex items-center justify-center py-7'>
      <SignIn />
    </div>
  )
}

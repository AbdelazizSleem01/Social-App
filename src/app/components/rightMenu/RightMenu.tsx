import { User } from '@prisma/client'

import { Suspense } from 'react'
import UserInfoCard from './UserInfoCard'
import UserMedCard from './UserMediaCard'
import FriendReq from './FriendReq'
import BirthDays from './BirthDays'
import Ad from '../Ad'

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6'>
      {user ? (
        <>
          <Suspense fallback='Loading...'>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback='Loading...'>
            <UserMedCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendReq />
      <BirthDays />
      <Ad size='md' />
    </div>
  )
}

export default RightMenu

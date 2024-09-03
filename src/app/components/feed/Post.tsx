import Image from 'next/image'
import Comments from './Comments'
import { Post as PostType, User } from '@prisma/client'
import PostInterAction from './PostInterAction'
import { Suspense } from 'react'
import PostInfo from './PostInfo'
import { auth } from '@clerk/nextjs/server'

type feedPostType = PostType & { user: User } & {
  Like: [{ userId: string }]
} & { _count: { Comment: number } }
const Post = ({ post }: { post: feedPostType }) => {
  const {userId} = auth()
  return (
    <div className='flex- flex-col gap-4 bg-white shadow-lg p-5 rounded-xl'>
      {/* User ACTION */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center  gap-4 '>
          <Image
            src={post.user.avatar || '/noAvatar.png'}
            alt='img'
            width={40}
            height={40}
            className='w-10 h-10 rounded-full '
          />

          <span className='font-medium'>
            {post.user.name && post.user.surname
              ? post.user.name + '' + post.user.surname
              : post.user.username}
            <div className='text-sm text-gray-500'>
              {post.createdAt.toLocaleString()}
            </div>
          </span>
        </div>
        {userId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      {/* Dec */}
      <p className='text-base ml-2 my-4'>{post.desc}</p>
      <div className='flex flex-col gap-4  '>
        {post.img && (
          <div className='w-full min-h-96 relative my-4 post-shadow'>
            <Image
              src={post.img}
              alt='img'
              fill
              className='object-contain rounded-md shadow-lg'
            />
          </div>
        )}
      </div>
      {/* Inter Action */}
      <Suspense fallback='Loading...'>
        <PostInterAction
          postId={post.id}
          likes={post.Like.map(like => like.userId)}
          commentNumber={post._count.Comment}
        />
        <Comments postId={post.id} />
      </Suspense>
    </div>
  )
}

export default Post

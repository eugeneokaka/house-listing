import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <SignUp />
    </div>
  )
}

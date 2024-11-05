import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-2 lg:mt-14">
      <SignUp
  signInFallbackRedirectUrl="/portal"
  signUpFallbackRedirectUrl="/portal"/>
    </div>
  )
}
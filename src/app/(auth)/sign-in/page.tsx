'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { signIn } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await signIn({
      email: userInfo.email,
      password: userInfo.password
    })
    if (!response) {
      toast({
        variant: 'destructive',
        title: 'Invalid email or password'
      })
      return
    }

    toast({
      variant: 'default',
      title: 'Login successful'
    })
    router.push('/')
  }
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                value={userInfo.email}
                onChange={e =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                required
                value={userInfo.password}
                onChange={e =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

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
import { signUp } from '@/lib/auth'
import { FormEvent, useState } from 'react'

export default function SignUpPage() {
  const [userObj, setUserObj] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signUp(userObj)
  }
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <form onSubmit={handleSubmit}>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Sign Up</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Full Name</Label>
              <Input
                id='fullName'
                type='text'
                placeholder=''
                required
                value={userObj.fullName}
                onChange={e =>
                  setUserObj({ ...userObj, fullName: e.target.value })
                }
              />
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='m@example.com'
                required
                value={userObj.email}
                onChange={e =>
                  setUserObj({ ...userObj, email: e.target.value })
                }
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                required
                value={userObj.password}
                onChange={e =>
                  setUserObj({ ...userObj, password: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Sign up
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

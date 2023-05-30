'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const {data: session} = useSession()
  const [providers, setProviders] = useState(null)
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setProvider()
  }, [])
  return (
    <div className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='image' width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
      </Link>
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
            <Link href="/profile">
              <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full'/>
            </Link>
          </div>
        ): (
        <>
          {providers && 
          Object.values(providers).map((provider) => (
            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
          ))}
        </>)}
      </div>
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image 
              src={session?.user.image} alt='profile' width={37} height={37} 
              className='rounded-full' onClick={() => setToggle((prev) => !prev)}
            />
            {toggle && (
              <div className='dropdown'>
                <Link href="/profile" className='dropdown_link' onClick={() => setToggle(false)}>
                  My Profile
                </Link>
                <Link href="/create-prompt" className='dropdown_link' onClick={() => setToggle(false)}>
                  Create Prompt
                </Link>
                <button 
                  type='button' 
                  onClick={() => {setToggle(false); signOut();}}
                  className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div>
            )}
            
          </div>
        ): (
          <>
            {providers && 
            Object.values(providers).map((provider) => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>Sign In</button>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Nav
// MONGODB_URI = mongodb+srv://sdqmuibi:sydneytinx@cluster0.4m9iv8s.mongodb.net/?retryWrites=true&w=majority
import { ModeToggle } from '@/components/global/mode_toggle'
import { stripe } from '@/lib/stripe'
import { UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  user?: null | User
}

const Navigation =  async ({ user }: Props) =>  {
  const prices = await stripe.prices.list({
    product: process.env.NEXT_WEBMAKER_PRODUCT_ID,
    active: true,
  })
  return (
    <div className="fixed top-0 right-0 left-0  p-4 flex items-center justify-between z-[1000]">
      <aside className="flex items-center gap-2">
        <Image
          src={'./assets/plura-logo.svg'}
          width={40}
          height={40}
          alt="plur logo"
        />
        <span style={{textShadow:'0 0 3px black'}} className="text-xl font-bold"> Webmaker.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link style={{textShadow:'0 0 5px black'}} href={'#'}>Pricing</Link>
          <Link style={{textShadow:'0 0 5px black'}} href={'#'}>About</Link>
          <Link style={{textShadow:'0 0 5px black'}} href={'#'}>Documentation</Link>
          <Link style={{textShadow:'0 0 5px black'}} href={'#'}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={'/agency'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Login
        </Link>
        <UserButton  />
        <ModeToggle/>
        
      </aside>
    </div>
  )
}

export default Navigation
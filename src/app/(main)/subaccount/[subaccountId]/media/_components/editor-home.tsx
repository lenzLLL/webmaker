"use client"
import React from 'react'

import { useRouter } from 'next/navigation'
import Loading from '@/components/global/loading'
export default function EdiorRoute() {
    const router = useRouter()
    React.useEffect(
        ()=>{
            router.push("/editor")
        }
    )
    return (
    <div className='h-[100vh] w-full flex justify-center items-center '><Loading/></div>
  )
}

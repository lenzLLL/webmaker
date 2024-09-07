"use client"
import { getAuthUserDetails } from '@/lib/queries'
import React,{useState} from 'react'
import CallUi from "@/components/global/CallU"
import BlurPage from '@/components/global/blur_page'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroBgAnimation from './_components/animations'
import Call from '@/components/global/Call'
type Props = {
    params: { agencyId: string }    
}
export default  function Channel({params}:Props) {
  // const user = await getAuthUserDetails()
  // if (!user) return
  const [show,setShow] = useState(false)
  

  return (
    <main className="flex w-full overflow-scroll ml-[20px] flex-col">
  
    {/* <Call linkUrl='/agency' appId={process.env.AGORA_APP_ID!} channelName={user.agencyId+" Channel"}></Call> */}
    {  show && <div className=''><div className='absolute z-50 left-10 top-[100px]'><Button onClick={()=>setShow(false)} className='bg-red-500 hover:bg-red-600'>Fermer</Button></div> <Call /></div>}
    { !show && <BlurPage><div className='m-auto flex flex-col justify-center items-center mt-[50px] relative'>
      <div className="absolute inset-0 z-[20] flex justify-end items-center max-w-[1360px] w-full px-[30px] overflow-hidden transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 md:justify-center md:px-0">
        <HeroBgAnimation/>
    </div>
      <div className='flex items-center justify-center gap-5'><img className='h-[300px] w-[300px] rounded-full' src = "/call.png"/>   <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
   
          <h1 className="text-4xl w-[400px] font-bold  md:text-[100px]">
          Start the video call to join the company meeting
          </h1>
      <Button onClick={()=>setShow(true)} className='bg-red-500 z-[1000] relative mt-3 shadow-lg hover:bg-red-700'>Start  now{" "} <Video className='ml-2'/></Button>

        </div></div>
        
    </div>
    </BlurPage> }
     </main>
  )
}

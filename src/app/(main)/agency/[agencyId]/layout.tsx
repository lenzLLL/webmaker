
import Sidebar from "@/components/sidebar"
import Unauthorized from "@/components/unauthorized"
import { getNotificationAndUser, verifyAndAcceptInvitation } from "@/lib/queries"
import { ClerkProvider } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {dark} from "@clerk/themes"

import React, { useEffect } from "react"
import InfoBar from "@/components/global/infosbar"
import BlurPage from "@/components/global/blur_page"
type Props = {
    children:React.ReactNode,
    params:{agencyId:string}
}

const layout = async ({children,params}:Props) =>{
    const user = await currentUser()
    if(!user){
        redirect("/")
    }
    const agencyId = await verifyAndAcceptInvitation()
    if(!agencyId){
        redirect("/")
    }
     if (
         user.privateMetadata.role !== 'AGENCY_OWNER' &&
         user.privateMetadata.role !== 'AGENCY_ADMIN'
       )
        { return <Unauthorized />}
       let allNoti: any = []
       const notifications = await getNotificationAndUser(agencyId)
       if (notifications) allNoti = notifications
 
    return (
    <div className="h-screen overflow-hidden">
        <Sidebar type={"agency"} id = {params.agencyId} />
        <div className=" pl-0 md:pl-[300px]">
           <InfoBar notifications={allNoti}/>
           <div className="relative">
               <BlurPage>{children}</BlurPage>
           </div>
        </div>
    </div>
    )
}

export default layout
import InfoBar from '@/components/global/infosbar'
import Sidebar from '@/components/sidebar'
import Unauthorized from '@/components/unauthorized'
import { getAuthUserDetails, getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs/server'
import { Role } from '@prisma/client'

import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children:React.ReactNode,
    params :{subaccountId:string}
}

export default async function Layout({children,params}:Props) {
  const agencyId = await verifyAndAcceptInvitation()
  if(!agencyId) return <Unauthorized/>
  const user = await currentUser()
  if(!user){
    redirect("/")
  }
  let notifications: any = []

  if (!user.privateMetadata.role) {
    return <Unauthorized />
  } else {
    const allPermissions = await getAuthUserDetails()
    const hasPermission = allPermissions?.Permissions.find(
      (permissions) =>
        permissions.access && permissions.subAccountId === params.subaccountId
    )
    if (!hasPermission) {
      return <Unauthorized />
    }

    const allNotifications = await getNotificationAndUser(agencyId)

    if (
      user.privateMetadata.role === 'AGENCY_ADMIN' ||
      user.privateMetadata.role === 'AGENCY_OWNER'
    ) {
      notifications = allNotifications
    } else {
      const filteredNoti = allNotifications?.filter(
        (item) => item.subAccountId === params.subaccountId
      )
      if (filteredNoti) notifications = filteredNoti
    }
  }
  
  return (
    <div className="h-screen overflow-hidden z-[1]">
    <Sidebar
      id={params.subaccountId}
      type="subaccount"
    />

    <div className=" pl-0 md:pl-[300px]">
      <InfoBar
        notifications={notifications}
        role={user.privateMetadata.role as Role}
        subAccountId={params.subaccountId as string}
      />
      <div className="relative">{children}</div>
    </div>
  </div>
  )
}

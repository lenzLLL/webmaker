'use client'
import { useModal } from '@/app/providers/modal_provider'
import ContactUserForm from '@/components/forms/agency/contact-user-form'
import CustomModal from '@/components/global/custom_modal'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
  subaccountId: string
}

const CraeteContactButton = ({ subaccountId }: Props) => {
  const { setOpen } = useModal()

  const handleCreateContact = async () => {
    setOpen(
      <CustomModal
        title="Create Or Update Contact information"
        subheading="Contacts are like customers."
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>
    )
  }

  return <Button onClick={handleCreateContact}>Create Contact</Button>
}

export default CraeteContactButton
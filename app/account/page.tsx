import AccountContent from '@/components/AccountContent'
import Header from '@/components/Header'
import React from 'react'

const Account = () => {
  return (
    <div className='bg-bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
        <Header className='from-bg-neutral-900'>
            <h1 className='text-white text-3xl font-semibold'>
                Account Settings
            </h1>
        </Header>
        <AccountContent />
    </div>
  )
}

export default Account
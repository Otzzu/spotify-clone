'use client'

import { twMerge} from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { useRouter } from 'next/navigation';
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import usePlayer from '@/hooks/usePlayer'

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer()
  const router = useRouter()
  const authModal = useAuthModal()
  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    player.reset()
    router.refresh()

    if (error) {
        toast.error(error.message)
    } else {
        toast.success('Logged out')
        
    }
  }
  
  return (
    <div className={twMerge('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
        <div className='w-full flex items-center justify-between mb-4'>
            <div className='hidden md:flex gap-x-2 items-center'>
                <button className='bg-black rounded-full flex justify-center items-center hover:opacity-75 transition' onClick={() => router.back()}>
                    <RxCaretLeft size={30} className='text-white'/>
                </button>
                <button className='bg-black rounded-full flex justify-center items-center hover:opacity-75 transition' onClick={() => router.forward( )}>
                    <RxCaretRight size={30} className='text-white'/>
                </button>
            </div>
            <div className='flex md:hidden gap-x-2 items-center'>
                <button className='bg-white rounded-full p-2 flex justify-center items-center hover:opacity-75 transition'>
                    <HiHome size={20} className='text-black'/>
                </button>
                <button className='bg-white rounded-full p-2 flex justify-center items-center hover:opacity-75 transition'>
                    <BiSearch size={20} className='text-black'/>
                </button>
            </div>
            <div className='flex justify-between gap-x-4 items-center'>
                {user ? (
                    <div className='flex gap-x-4 items-center'>
                        <div>
                            <Button className='bg-white px-6 py-2' onClick={handleLogout}>
                                Log out
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => router.push('/account')} className='bg-white'>
                                <FaUserAlt />
                            </Button>
                        </div>

                    </div>
                ) : (
                    <>
                        <div>
                            <Button className='bg-transparent font-medium text-neutral-300' onClick={authModal.onOpen}>
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button className='bg-white px-6 py-2' onClick={authModal.onOpen}>
                                Log in
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header
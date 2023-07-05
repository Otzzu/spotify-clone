import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import useSubscribeModal from '@/hooks/useSubscribeModal'

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps>= ({ songs }) => {
  const subscribeModal = useSubscribeModal()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user, subscription } = useUser()
  const onPlay = useOnPlay(songs)
  
  const onClick = () => {
    if (!user) return authModal.onOpen()

    if (!subscription) return subscribeModal.onOpen()

    return uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col'>
        <div className='flex items-center justify-between pt-4 px-5'>
            <div className='inline-flex items-center gap-x-2'>
                <TbPlaylist size={26} className='text-neutral-400'/>
                <p className='text-neutral-400 font-medium text-md'>Your Playlists</p>
            </div>
            <AiOutlinePlus size={20} onClick={onClick} className='text-neutral-400 hover:text-white transition cursor-pointer'/>
        </div>
        <div className='flex flex-col mt-4 px-3 gap-y-2'>
            {songs.map((item) => (
              <MediaItem onClick={onPlay} key={item.id} data={item} /> 
            ))}
        </div>
    </div>
  )
}

export default Library
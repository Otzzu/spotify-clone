'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
    image: string;
    href: string;
    name: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, href, name }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <button className="flex group overflow-hidden items-center relative gap-x-4 rounded-md bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4" onClick={handleClick}>
        <div className="relative min-w-[64px] min-h-[64px]">
            <Image src={image} fill className="object-cover" alt="Image"/>
        </div>
        <p className="font-medium truncate py-5">
            {name}
        </p> 
        <div className="absolute flex items-center justify-center transition bg-green-500 right-5 rounded-full p-3 opacity-0 drop-shadow-md group-hover:opacity-100 hover:scale-110">
            <FaPlay className="text-black"/>
        </div>
    </button>
  )
}

export default ListItem
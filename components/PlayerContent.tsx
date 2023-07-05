'use client'

import { Song } from "@/types"
import MediaItem from "./MediaItem"
import LikeButton from "./LikeButton"
import { BsPlayFill, BsPauseFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import  { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import { useEffect, useState } from "react"
import usePlayer from "@/hooks/usePlayer"
import Slider from "./Slider"
import useSound from "use-sound"

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const [volume, setVolume] = useState(1)
  const player = usePlayer()
  const [isPlaying, setIsPlaying] = useState(false)

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex(id => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
        return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return

    const currentIndex = player.ids.findIndex(id => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
        return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
        setIsPlaying(false)
        onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3']
  })

  useEffect(() => {
    sound?.play()

    return () => {
        sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
        play()
    } else {
        pause()
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
        setVolume(0.5)
    } else {
        setVolume(0)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="flex w-full justify-start items-center">
            <div className="flex items-center gap-x-4">
                <MediaItem data={song}/>
                <LikeButton songId={song.id}/>
            </div>
        </div>
        <div className="flex col-auto md:hidden w-full justify-end items-center">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer" onClick={handlePlay}>
                <Icon size={30} className="text-black"/>
            </div>
        </div>
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
            <AiFillStepBackward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayPrevious}/>
            <div className="flex items-center justify-center h-10 w-10 bg-white cursor-pointer rounded-full p-1" onClick={handlePlay}>
                <Icon size={30} className="text-black"/>
            </div>
            <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" onClick={onPlayNext}/>
        </div>
        <div className="hidden md:flex w-full justify-end pr-2">
            <div className="flex items-center justify-center gap-x-2 w-[120px]" >
                <VolumeIcon className="cursor-pointer" size={32} onClick={toggleMute}/>
                <Slider value={volume} onChange={(value) => setVolume(value)}/>
            </div>
        </div>
    </div>
  )
}

export default PlayerContent
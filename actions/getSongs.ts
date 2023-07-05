import { Song } from '@/types'
import { Database } from '@/types_db'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient<Database>({
        cookies: cookies
    })
    

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
    }

    return (data as any) || []
}

export default getSongs
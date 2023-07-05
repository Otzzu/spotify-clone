import { Song } from '@/types'
import { Database } from '@/types_db'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient<Database>({
        cookies: cookies
    })

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log(sessionError.message)
        return []
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
    
    return (data as any) || []
}

export default getSongsByUserId
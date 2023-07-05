import { ProductWithPrice } from '@/types'
import { Database } from '@/types_db'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'


const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    const supabase = createServerComponentClient<Database>({
        cookies: cookies
    })

    const { data, error } = await supabase
        .from('products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('metadata->index')
        .order('unit_amount', { foreignTable: 'prices' })

    if (error) {
        console.log(error)
    }

    return (data as any) || []
}

export default getActiveProductsWithPrices
import { cookies } from 'next/headers';
import { Database } from "@/types_db";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { createOrRetrieveACustomer } from '@/libs/supabaseAdmin';
import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const supabase = createRouteHandlerClient<Database>({
            cookies
        })

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) throw new Error('Could not get user')

        const customer = await createOrRetrieveACustomer({
            uuid: user.id || '',
            email: user.email || ''
        })

        if (!customer) throw new Error('Could not get customer')
        
        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getURL()}/account`
        })

        return NextResponse.json({ url })
    } catch (error: any) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
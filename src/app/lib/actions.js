'use server';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function createTransaction(formData) {
    const rawFormData = {
        amount: formData.get('amount'),
        description: formData.get('description'),
        type: formData.get('type')
    }
    console.log('rawFormData', rawFormData);

    /**@todo validate data */

    try {
        if (!rawFormData.amount || !rawFormData.description || !rawFormData.type) throw new Error('All fields required');
        const dbUpdate = await sql`INSERT INTO Transaction (Amount, Description, Type) VALUES (${rawFormData.amount}, ${rawFormData.description}, ${rawFormData.type});`;
        console.log('dbUpdate', dbUpdate);
    } catch (error) {
        console.log('error', error);
        return JSON.stringify(NextResponse.json({ error }, { status: 500 }));
    }

    const transactions = await sql`SELECT * FROM Transaction;`;
    console.log('transactions', transactions.rows);
    return JSON.stringify(NextResponse.json({ transactions }, { status: 200 }));
}
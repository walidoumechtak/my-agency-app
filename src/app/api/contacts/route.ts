import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
    console.log('Contacts API called');

    const user = await auth(); // <-- sync and returns userId

    if (!user.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.userViewLimit.findFirst({
        where: { userId: user.userId, date: today }
    });

    if (existing && existing.count >= 50) {
        return NextResponse.json({ upgradeNeeded: true });
    }

    const pageSize = 10;

    if (existing) {
        await prisma.userViewLimit.update({
            where: { id: existing.id },
            data: { count: existing.count + pageSize }
        });
    } else {
        await prisma.userViewLimit.create({
            data: { userId: user.userId, date: today, count: pageSize }
        });
    }

    const contacts = await prisma.contact.findMany({ take: pageSize });
    return NextResponse.json({ contacts });
}

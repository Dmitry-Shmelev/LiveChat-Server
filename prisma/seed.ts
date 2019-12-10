import { prisma } from '../src/generated/prisma-client';

async function main() {
    await prisma.createUser({
        name: 'bot',
        password: '',
    });

    await prisma.createChat({
        from: 'bot',
        message: 'Welcome to Live Chat App!',
    });
}

main().catch(e => console.error(e));

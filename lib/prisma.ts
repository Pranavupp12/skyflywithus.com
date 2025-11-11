// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Use a universal object reference for the singleton pattern
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

let prisma: PrismaClient;

// We ensure that the DATABASE_URL check and client creation happens only once.
if (globalForPrisma.prisma) {
    // If client is already in the cache, reuse it (hot reload)
    prisma = globalForPrisma.prisma;
} else {
    // If the URL is missing, we throw an error *during* creation (which is fine), 
    // but the presence of the check itself shouldn't crash the module evaluation.
    if (!process.env.DATABASE_URL) {
        console.error("FATAL: DATABASE_URL not found in process environment.");
        throw new Error("DATABASE_URL environment variable is not set.");
    }
    
    // Create the new client instance
    prisma = new PrismaClient({
        log: ['query'],
    });

    // Cache the client only if we are not in production
    if (process.env.NODE_ENV !== 'production') {
        globalForPrisma.prisma = prisma;
    }
}

export default prisma;
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = new PrismaClient() || globalThis.prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

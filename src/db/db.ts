// import { PrismaClient } from "@prisma/client"

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const db = globalThis.prisma ?? prismaClientSingleton()

// export default db

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db

import { PrismaClient } from '@prisma/client';

// Create a singleton PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare a global variable to hold the Prisma client
declare global {
  var prisma: PrismaClient | undefined;
}

// Get the Prisma client from the global variable or create a new one
const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  // Store the Prisma client in the global variable in development mode
  globalThis.prisma = db;
}

export default db;

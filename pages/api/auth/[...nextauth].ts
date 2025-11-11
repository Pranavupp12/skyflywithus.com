// pages/api/auth/[...nextauth].ts

import NextAuth, { AuthOptions, DefaultSession } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../lib/prisma"; 
import { authOptions } from "@/lib/auth.config"; // Ensure this alias is working

// The main NextAuth setup remains correct and uses authOptions
export default NextAuth(authOptions);


// --- FIX: THIS IS THE ONLY DECLARE MODULE BLOCK YOU NEED ---
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // <-- Your custom ID is crucial
      name: string;
      email: string;
    } & DefaultSession["user"]; // <-- We correctly extend the existing User structure
  }
}

// NOTE: The previous conflicting block is now completely removed.
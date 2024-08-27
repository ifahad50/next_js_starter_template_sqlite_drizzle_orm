'use server'

import { db } from "@/db";
import { sessions, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from "bcrypt";  // Import bcrypt
import { cookies } from "next/headers";
import { COOKIE_USER_FULL_NAME_KEY, COOKIE_USER_ID_KEY, COOKIE_USER_SESSION_ID_KEY } from "@/constants";
import { redirect } from "next/navigation";

export const signUp = async (userData: {
    fullName: string;
    email: string;
    password: string;
}) => {
    try {
        // Check if the user already exists in the database
        const user = await db.query.users.findFirst({
            where: eq(users.email, userData.email.toLowerCase())
        });

        if (user) {
            throw new Error('User already exists')
        }
        // Hash the user's password before storing it
        const saltRounds = 10;  // Salt rounds determine the cost of processing the data
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Create a new user in the database with the hashed password
        await db.insert(users).values({
            email: userData.email,
            full_name: userData.fullName,
            password: hashedPassword  // Store the hashed password
        });

    } catch (error: any) {
        throw new Error(error?.message)
    }
};

export const signIn = async ({ email, password }: { email: string, password: string }): Promise<boolean> => {
    // Check if the user exists in the database
    const user = await db.query.users.findFirst({
        where: eq(users.email, email.toLowerCase())
    });

    if (!user) {
        // User does not exist
        return false;
    }
    if (!user.password) {
        // Password not found
        return false;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        // Passwords do not match
        cookies().delete(COOKIE_USER_ID_KEY);
        cookies().delete(COOKIE_USER_FULL_NAME_KEY);
        return false;
    }
    //set session 
    const sessionId = `${user.id}-${user.email}-${Date.now()}`;
    await db.insert(sessions).values({
        user_id: user.id,
        session_id: sessionId
    })
    //write function to invalidate sessions

    cookies().set(COOKIE_USER_ID_KEY, String(user.id));
    cookies().set(COOKIE_USER_SESSION_ID_KEY, sessionId);
    cookies().set(COOKIE_USER_FULL_NAME_KEY, user.full_name || '');
    // Login successful
    return true;
};

export const signOut = () => {
    cookies().delete(COOKIE_USER_ID_KEY);
    cookies().delete(COOKIE_USER_SESSION_ID_KEY);
    cookies().delete(COOKIE_USER_FULL_NAME_KEY);
};

export const isAuthorised = async () => {
    const userId = cookies().get(COOKIE_USER_ID_KEY)?.value;
    const sessionId = cookies().get(COOKIE_USER_SESSION_ID_KEY)?.value;
    if (!userId || !sessionId) {
        redirect('/sign-in')
    }

    const user = await db.query.sessions.findFirst({
        where: and(eq(sessions.user_id, 1), eq(sessions.session_id, sessionId))
    })
    if (!user) {
        redirect('/sign-in')
    }
    return true;
};

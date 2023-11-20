import prisma from "@/config/db";
import bcrypt from "bcrypt";

export const dynamic = 'force-dynamic'
export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(name);
        const user = await prisma.user.create({
            data: {
                name, email, password: hashedPassword
            },
        });

        return Response.json({ user });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "User already exists" });
    }
}
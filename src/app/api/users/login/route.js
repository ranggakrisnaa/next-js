import jwt from "jsonwebtoken"
import prisma from "@/config/db";

export const dynamic = 'force-dynamic' // defaults to force-static
export async function POST(req) {
    const { email, password } = req.json();
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        return Response.json({ token });

    } catch (error) {
        console.log(error);
        return Response.json({ message: "User already exists" });
    }
}
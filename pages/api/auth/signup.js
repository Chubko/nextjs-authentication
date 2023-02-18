import { connectDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
    if(req.method !== 'POST') {
        return;
    }

    const { email, password } = req.body;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        return res.status(422).json({ message: 'Invalid input'});
    }

    const client = await connectDatabase();

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser){
        res.status(422).json({ message: 'User exists already!' });
        client.close();
        return;
    }

    const hash = await hashPassword(password)

    const result = await db.collection('users').insertOne({
        email,
        password: hash
    });
    res.status(201).json({ message: 'Created user!' });
    client.close();
}


export default handler;

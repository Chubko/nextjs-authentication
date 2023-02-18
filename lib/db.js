import { MongoClient } from "mongodb";

export async function connectDatabase() {
    return await MongoClient.connect('mongodb+srv://user:password@cluster0.b2j5vvk.mongodb.net/auth-demo?retryWrites=true&w=majority')
}

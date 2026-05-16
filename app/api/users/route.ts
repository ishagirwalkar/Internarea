import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/user';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find().sort({ createdAt: -1 }).limit(100);
    return Response.json(users);
  } catch (error) {
    console.error('Users error:', error);
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

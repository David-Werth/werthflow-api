import { Request, Response } from 'express';
import { db } from '../utils/db';

const userClient = db.user;

export async function createUser(req: Request, res: Response) {
	try {
		const profileData = req.body;

		console.log(profileData);

		const profile = await userClient.create({
			data: {
				name: profileData.name,
				userId: profileData.userId,
			},
		});

		res.status(201).json({ message: 'New user created!', data: profile });
	} catch (error: any) {
		console.log(error);
	}
}

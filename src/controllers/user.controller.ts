import { Request, Response } from 'express';
import { db } from '../utils/db';

const userClient = db.user;

export async function createUser(req: Request, res: Response) {
	try {
		const userId = req.params.id;
		const profileData = req.body;

		console.log(req.body);

		const profile = await userClient.create({
			data: {
				userId: userId,
				name: profileData.name,
			},
		});

		res.status(201).json({ message: 'New user created!', data: profile });
	} catch (error: any) {
		console.log(error);
	}
}

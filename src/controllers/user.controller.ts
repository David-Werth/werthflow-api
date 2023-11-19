import { Request, Response } from 'express';
import { db } from '../utils/db';

const userClient = db.user;

export async function createUser(req: Request, res: Response) {
	try {
		const userId = req.params.id;
		const userData = req.body;

		const user = await userClient.create({
			data: {
				name: userData.name,
				userId: userId,
			},
		});

		res.status(201).json({ message: 'New user created: ', data: user });
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong: ', error: error });
	}
}

export async function getUserById(req: Request, res: Response) {
	try {
		const userId = req.params.id;

		const user = await userClient.findFirst({
			where: {
				userId: userId,
			},
			include: {
				folders: { include: { sortables: { include: { tasks: true } } } },
			},
		});

		if (user) {
			res.status(201).json({ message: 'User: ', data: user });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong: ', error: error });
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const userId = req.params.id;

		const user = await userClient.delete({
			where: {
				userId: userId,
			},
		});

		res.status(200).json({ message: 'User deleted: ', data: user });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'User not found: ', error: error });
	}
}

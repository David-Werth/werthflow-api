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
				tasks: userData.tasks,
			},
		});

		res
			.status(201)
			.json({ message: 'New user created or updated: ', data: user });
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong: ', error: error });
	}
}

export async function getUserById(req: Request, res: Response) {
	try {
		const userId = req.params.id;

		const user = await userClient.findUnique({
			where: {
				userId: userId,
			},
		});

		res.status(200).json({ data: user });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'User not found: ', error: error });
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

export async function updateUserTasks(req: Request, res: Response) {
	try {
		const userId = req.params.id;
		const newData = req.body;

		const user = await userClient.update({
			where: { userId: userId },
			data: { tasks: newData.tasks },
		});

		res.status(200).json({ message: 'Updated user tasks: ', data: user });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Something went wrong: ', error: error });
	}
}

import { Request, Response } from 'express';
import { db } from '../utils/db';

const taskClient = db.task;

export async function createTask(req: Request, res: Response) {
	try {
		const sortableId = req.params.id;
		const taskData = req.body;

		const task = await taskClient.create({
			data: {
				sortableId: sortableId,
				index: taskData.index,
				title: taskData.title,
				content: taskData.content,
			},
		});

		res.status(201).json({ message: 'New task created: ', data: task });
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong: ', error: error });
	}
}

export async function getTaskById(req: Request, res: Response) {
	try {
		const taskId = req.params.id;

		const task = await taskClient.findFirst({
			where: {
				id: taskId,
			},
		});

		res.status(200).json({ message: 'Task: ', data: task });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Task not found: ', error: error });
	}
}

export async function updateTask(req: Request, res: Response) {
	try {
		const sortableId = req.params.id;
		const taskData = req.body;

		const task = await taskClient.update({
			where: {
				id: taskData.id,
			},
			data: {
				sortableId: sortableId,
				index: taskData.index,
				title: taskData.title,
				content: taskData.content,
			},
		});

		res.status(200).json({ message: 'Task updated: ', data: task });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Task not found: ', error: error });
	}
}

export async function deleteTask(req: Request, res: Response) {
	try {
		const taskId = req.params.id;

		const task = await taskClient.delete({
			where: {
				id: taskId,
			},
		});

		res.status(200).json({ message: 'Task deleted: ', data: task });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Task not found: ', error: error });
	}
}

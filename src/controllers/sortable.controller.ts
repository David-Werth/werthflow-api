import { Request, Response } from 'express';
import { db } from '../utils/db';
import { Task } from '@prisma/client';

const sortableClient = db.sortable;

export async function createSortable(req: Request, res: Response) {
	try {
		const data = req.body;

		const sortable = await sortableClient.create({
			data: {
				userId: data.userId,
				folderId: data.folderId,
				title: data.title,
			},
			include: { tasks: true },
		});

		res.status(201).json({ message: 'New sortable created: ', data: sortable });
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong: ', error: error });
	}
}

export async function getSortableById(req: Request, res: Response) {
	try {
		const sortableId = req.params.id;

		const sortable = await sortableClient.findFirst({
			where: {
				id: sortableId,
			},
			include: {
				tasks: true,
			},
		});

		res.status(200).json({ message: 'Sortable: ', data: sortable });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Sortable not found: ', error: error });
	}
}

type TSortable = {
	id: string;
	title: string;
	folderId: string;
	createdAt?: string;
	updatedAt?: string;
	tasks: Task[];
};

async function moveTasks(sortable: TSortable) {
	console.log('running');
	console.log(sortable);

	try {
		await sortableClient.update({
			where: { id: sortable.id },
			data: {
				tasks: { deleteMany: {}, createMany: { data: sortable.tasks } },
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export async function updateSortable(req: Request, res: Response) {
	try {
		const folderId = req.params.id;
		const sortableData = req.body;

		if (folderId !== 'move') {
			const sortable = await sortableClient.update({
				where: {
					id: sortableData.id,
					folderId: folderId,
				},
				data: {
					title: sortableData.title,
				},
			});

			res
				.status(200)
				.json({ message: 'Sortable title updated: ', data: sortable });
		} else if (folderId === 'move' && sortableData[0]) {
			sortableData.forEach((s: TSortable) => {
				if (s.tasks.length !== 0) moveTasks(s);
			});
		}
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Sortable not found: ', error: error });
	}
}

export async function deleteSortable(req: Request, res: Response) {
	try {
		const sortableId = req.params.id;

		const sortable = await sortableClient.delete({
			where: {
				id: sortableId,
			},
		});

		res.status(200).json({ message: 'Sortable deleted: ', data: sortable });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Sortable not found: ', error: error });
	}
}

import { Request, Response } from 'express';
import { db } from '../utils/db';

const sortableClient = db.sortable;

export async function createSortable(req: Request, res: Response) {
	try {
		const folderId = req.params.id;
		const sortableData = req.body;

		const sortable = await sortableClient.create({
			data: {
				folderId: folderId,
				title: sortableData.title,
			},
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

export async function updateSortabelTitle(req: Request, res: Response) {
	try {
		const folderId = req.params.id;
		const sortableData = req.body;

		const sortable = await sortableClient.update({
			where: {
				id: sortableData.id,
				folderId: folderId,
			},
			data: {
				title: sortableData.title,
			},
		});

		res.status(200).json({ message: 'Sortable title updated: ', data: sortable });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Sortable not found: ', error: error });
	}
}

export async function deleteSortable(req: Request, res: Response) {
	try {
		const folderId = req.params.id;
		const sortableData = req.body;

		const sortable = await sortableClient.delete({
			where: {
				id: sortableData.id,
				folderId: folderId,
			},
		});

		res.status(200).json({ message: 'Sortable deleted: ', data: sortable });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Sortable not found: ', error: error });
	}
}

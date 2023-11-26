import { Request, Response } from 'express';
import { db } from '../utils/db';

const folderClient = db.folder;

export async function createFolder(req: Request, res: Response) {
	try {
		const userId = req.params.id;
		const folderData = req.body;

		const folder = await folderClient.create({
			data: {
				userId: userId,
				title: folderData.title,
			},
		});

		res.status(201).json({ message: 'New folder created: ', data: folder });
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong: ', error: error });
	}
}

export async function getFolderById(req: Request, res: Response) {
	try {
		const folderId = req.params.id;

		const folder = await folderClient.findFirst({
			where: {
				id: folderId,
			},
			include: {
				sortables: true,
			},
		});

		res.status(201).json({ message: 'Folder: ', data: folder });
	} catch (error: any) {
		console.log(error);
		res.status(400).json({ message: 'Folder not found: ', error: error });
	}
}

export async function updateFolder(req: Request, res: Response) {
	try {
		const folderId = req.params.id;
		const folderData = req.body;

		const folder = await folderClient.update({
			where: {
				id: folderId,
			},
			data: {
				title: folderData.folderTitle,
			},
		});
		res.status(200).json({ message: 'Folder title updated: ', data: folder });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Folder not found: ', error: error });
	}
}

export async function deleteFolder(req: Request, res: Response) {
	try {
		const folderId = req.params.id;

		const folder = await folderClient.delete({
			where: {
				id: folderId,
			},
		});

		res.status(200).json({ message: 'Folder deleted: ', data: folder });
	} catch (error: any) {
		console.log(error);
		res.status(404).json({ message: 'Folder not found: ', error: error });
	}
}

import { Router } from 'express';
import {
	createFolder,
	deleteFolder,
	getFolderById,
	updateFolderTitle,
} from '../controllers/folder.controller';

const folderRouter = Router();

folderRouter.post('/:id', createFolder);
folderRouter.get('/:id', getFolderById);
folderRouter.put('/:id', updateFolderTitle);
folderRouter.delete('/:id', deleteFolder);

export default folderRouter;

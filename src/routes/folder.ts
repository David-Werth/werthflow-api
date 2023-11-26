import { Router } from 'express';
import {
	createFolder,
	deleteFolder,
	getFolderById,
	updateFolder,
} from '../controllers/folder.controller';

const folderRouter = Router();

folderRouter.post('/:id', createFolder);
folderRouter.get('/:id', getFolderById);
folderRouter.put('/:id', updateFolder);
folderRouter.delete('/:id', deleteFolder);

export default folderRouter;

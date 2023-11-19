import { Router } from 'express';
import {
	createSortable,
	deleteSortable,
	getSortableById,
	updateSortabelTitle,
} from '../controllers/sortable.controller';

const sortableRouter = Router();

sortableRouter.post('/:id', createSortable);
sortableRouter.get('/:id', getSortableById);
sortableRouter.put('/:id', updateSortabelTitle);
sortableRouter.delete('/:id', deleteSortable);

export default sortableRouter;

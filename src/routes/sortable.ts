import { Router } from 'express';
import {
	createSortable,
	deleteSortable,
	getSortableById,
	updateSortable,
} from '../controllers/sortable.controller';

const sortableRouter = Router();

sortableRouter.post('/:id', createSortable);
sortableRouter.get('/:id', getSortableById);
sortableRouter.put('/:id', updateSortable);
sortableRouter.delete('/:id', deleteSortable);

export default sortableRouter;

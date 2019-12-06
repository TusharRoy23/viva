import { Router } from 'express';

import noteController from '@controllers/v1/note.controller';

const noteRouter = new Router();

noteRouter.post('/submitNotes', noteController.submitNote);
noteRouter.post('/updateNotes', noteController.updateNote);
noteRouter.post('/deleteNotes', noteController.deleteNote);
noteRouter.post('/getNoteList', noteController.noteList);

export default noteRouter;
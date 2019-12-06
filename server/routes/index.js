import { Router } from 'express';
import authRouter from './v1/auth';
import noteRouter from './v1/note';

const v1Router = new Router();

v1Router.use('/api/v1/auth', authRouter);
v1Router.use('/api/v1/note', noteRouter);

export default v1Router;
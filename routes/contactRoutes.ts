import express, { Router } from 'express';
import { getContacts, createContact, updateContact, deleteContact, getContact } from '../controllers/mycontactController';
import validateToken from '../middleware/validateTokenHandler';
import upload from '../middleware/uploadPhoto';

const router: Router = express.Router();

router.use(validateToken);

router.route('/').get(getContacts);

router.route('/').post(upload.single('photo'), createContact);

router.route('/:id').put(upload.single('photo'), updateContact);

router.route('/:id').delete(deleteContact);

router.route('/:id').get(getContact);

export default router;


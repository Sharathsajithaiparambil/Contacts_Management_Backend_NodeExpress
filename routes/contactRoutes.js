const express = require('express');
const { getContacts, createContact, updateContact, deleteContact, getContact } = require('../controllers/mycontactController');
const validateToken = require('../middleware/validateTokenHandler');
const upload = require('../middleware/uploadPhoto');
const router = express.Router();

router.use(validateToken);

router.route('/').get(getContacts);

router.route('/').post(upload.single('photo'), createContact);

router.route('/:id').put(upload.single('photo'), updateContact);

router.route('/:id').delete(deleteContact);

router.route('/:id').get(getContact);

module.exports = router;
const express = require('express');
const { getContacts, createContact, updateContact, deleteContact, getContact } = require('../controllers/mycontactController');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateToken);

router.route('/').get(getContacts);

router.route('/').post(createContact);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);

router.route('/:id').get(getContact);

module.exports = router;
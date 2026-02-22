const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModels');

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }
    
    let photoPath = null;
    if (req.file) {
        photoPath = `/uploads/photos/${req.file.filename}`;
    }
    
    const newContact = await contact.create({
        name,
        email,
        phone,
        photo: photoPath,
        user_id: req.user.id
    });
    res.status(201).json(newContact);
});

const updateContact = asyncHandler(async (req, res) => {
    const foundContact = await contact.findById(req.params.id);
    if (!foundContact) {
        res.status(404);
        throw new Error('Contact not found!');
    }
    if (foundContact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to update this contact!');
    }
    
    const updateData = { ...req.body };
    if (req.file) {
        updateData.photo = `/uploads/photos/${req.file.filename}`;
    }
    
    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        updateData,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const foundContact = await contact.findById(req.params.id);
    if (!foundContact) {
        res.status(404);
        throw new Error('Contact not found!');
    }
    if (foundContact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to delete this contact!');
    }
    await contact.findByIdAndDelete(req.params.id);
    res.status(200).json({message: `Contact ${req.params.id} deleted successfully!`});
});

const getContact = asyncHandler(async (req, res) => {
    const foundContact = await contact.findById(req.params.id);
    if (!foundContact) {
        res.status(404);
        throw new Error('Contact not found!');
    }
    if (foundContact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User not authorized to view this contact!');
    }
    res.status(200).json(foundContact);
});

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact
}
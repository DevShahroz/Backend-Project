const asyncHandler = require( "express-async-handler");
const Contact = require("../models/ContactModel");

//desc Get all contacts
//route GET /api/contacts
//access private
const getContacts = asyncHandler(async (req,res) => {
    const constacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(constacts);
});

//desc Get  contact
//route GET /api/contacts/:id
//access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        req.status(404);
        throw new Error("Contact not found");
        
    }

    res.status(200).json(contact);
}); 

//desc create new contacts
//route post /api/contacts
//access private
const CreateContact = asyncHandler (async(req,res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory !");
        
     }
     const contact =await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
     });
    res.status(201).json(contact);
}) ;



//desc Update contact
//route put /api/contacts/:id
//access private
const UpdateContact =asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        req.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString()!==req.user.id) {
        res.status(403);
        throw new Error("user don't have permission")
        
    }
    
    

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    );
    res.status(200).json(updatedContact);
});

//desc Update contact
//route DELETE /api/contacts/:id
//access private
const DeleteContact = asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        req.status(404);
        // throw new Error("Contact not found");
        
    }
    if (contact.user_id.toString()!==req.user.id) {
        res.status(403);
        throw new Error("user don't have permission")
        
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});



module.exports = {getContact,CreateContact,getContacts,UpdateContact,DeleteContact}
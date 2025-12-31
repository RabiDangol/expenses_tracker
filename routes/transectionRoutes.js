import express from 'express';
import { addTransection, getAllTransection,editTransection,deleteTransection } from '../controllers/transectionCtrl.js';

//router object
const router = express.Router();
//routes
//add transection POST method
router.post('/add-transection',addTransection);
//Edit transection POST method
router.post('/edit-transection',editTransection);
//delete transection POST method
router.post('/delete-transection',deleteTransection);

//get transection
router.post('/get-transection',getAllTransection);


export default router;

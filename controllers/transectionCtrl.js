import transectionModel from '../models/transectionModel.js';
import moment from 'moment';

const getAllTransection = async (req, res) => {
    try {
        const {frequency,selectedDate, userid} = req.body;
        let query = { userid }; 
        if(frequency !== 'custom'){
            query.date = {
                $gt : moment().subtract(Number(frequency),'d').toDate(),
            };
        } else {
            query.date = {
                $gte : selectedDate[0],
                $lte : selectedDate[1]
            };
        }
        const transections = await transectionModel.find(query);
        res.status(200).json(transections);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deleteTransection = async (req,res)=>{
    try {
    await transectionModel.findOneAndDelete({_id:req.body.transactionId})
    res.status(200).send('Transaction Deleted')
    } catch (error) {
    console.log(error)
    res.status(500).json(error)
    }
}
const editTransection = async (req,res) => {
    try {
        await transectionModel.findOneAndUpdate(
            {_id:req.body.transactionId},req.body.payload);
        res.status(200).send("Edit Successfully");    
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};
const addTransection = async(req,res) =>{
    const { amount, date, userid } = req.body;

    // Check if date is provided, if not, set to current date
    if (!date) {
    return res.status(400).json({ message: 'Date is required' });
    }

    try {
        const newTransection =new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send('Transection Created');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export {getAllTransection ,addTransection,editTransection,deleteTransection}
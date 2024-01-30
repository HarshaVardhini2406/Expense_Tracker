const express = require('express');
const mongoose=require('mongoose');
const Expense=require('./models/expense');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://harsha_240603:240603@cluster0.2orlv6t.mongodb.net/newDB?retryWrites=true&w=majority',{
    useUnifiedTopology:true
});
app.use(express.json());

app.get('/expenses', async(req, res) => {
    try{
  const result=await Expense.find();
  res.send(result);
    }catch(err){
        res.send(err);
    }
})

app.get('/expenses/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const result=await Expense.findById(id);
    if(result)
        res.send(result);
    else
       res.send("No Expense with that ID");
    }catch(err){
        res.send(err);
    }
})

app.delete('/expenses/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const result=await Expense.findByIdAndDelete(id);
        if(result)
           res.send(result);
        else 
           res.send("No Expenses with that id");
    }catch(err){
        res.send(err);
    }
})

app.post('/expenses',async(req,res)=>{
    try{
    console.log(req.body);
    const newExpense =req.body;
    await Expense.create(newExpense);
    res.send('Created');
    }catch(err){
        res.send(err);
    }
})

app.put('/expenses/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const updateObject = req.body;
       await Expense.findByIdAndUpdate(id,{$set: updateObject});
        res.send("Updated");
    }catch(err){
        res.send(err);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const { initDB } = require('./db/index');
const ToDo = require('./db/models/ToDo.model');
const { where } = require('sequelize');

initDB();

app.post('/api/todos', async (req, res) => {
  try {
    const createToDo = await ToDo.create({
      title: req.body.title,
      description: req.body.description,
    });
    res.status(200).json({createToDo});
  } catch (error){
    next({ 
      status: 400,
      message: "failed to create ToDo",
    })
  }
})

app.get('/api/todos', async (req, res) => {
  try{
  const allToDo = await ToDo.findAll();
  res.status(200).json({allToDo}); 
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/api/todos/:id', async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    if (!id) {
      res.status(400).json({message: "failed to find ToDo with this id"})
    }
    const findOne = await ToDo.findOne({where: {id: req.params.id}});
    return res.json(findOne);
    } catch(error) {
      res.status(500).json(error)
  }
});

app.patch('/api/todos/:id', async (req, res) => {
  try {
        const {id} = req.params;
        if (!id) {
          res.status(400).json({message: "failed to find ToDo with this id"})
        }
        const updateToDo = await ToDo.update({
        title: req.body.title,
        description: req.body.description,
      }, {where: {id: req.params.id}});
        res.status(200).json(updateToDo);
  } catch(error) {
    res.status(500).json(error);
  }
})
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    if (!id) {
      res.status(400).json({message: "ID not found"})
    }
    const deleteToDo = await ToDo.destroy({where: {id: req.params.id}});
    return res.json(deleteToDo);
  } catch (error){
    res.status(500).json(error);
  }
})
app.delete('/api/todos/', async (req, res) => {
  try {
    const deleteAllToDo = await ToDo.destroy({where: {}});
    return res.json(deleteAllToDo);
  } catch (error){
    res.status(500).json(error);
  }
})




// app.get('/sum', (req, res) => {
//     const a = req.body.a;
//     const b = req.body.b;
//     if(typeof a === "number" && typeof b === "number"){
//       res.json(
//         {
//             c: a + b,
//         })
//     }
//     res.status(500).json({
//       message: "Error! Invalid type!!!"
//     })
// })
// app.post('/reverse-case', (req, res) => {
//     let reqStr = req.body.str;
//     let newStr = [];
//     for (let i = 0; i < reqStr.length; i++){
//         let isUpperCase = reqStr[i].toUpperCase() === reqStr[i];
//         if (isUpperCase){
//             newStr.push(reqStr[i].toLowerCase());
//         }
//         else{
//             newStr.push(reqStr[i].toUpperCase())
//         }    
//     }
//     const responseStr = newStr.join('')
//     res.status(200).json({
//         message: responseStr
//     })
//     res.status(500).json({
//         message: "Error"
//     })
// })
// app.put('/obj-to-array', (req, res) => {
//     let obj = {
//         key: req.body.k,
//         value: req.body.v
//     }
//     const response = [];
//     const newArray = Object.entries(obj);
//     newArray.forEach(([key, value]) => {
//         response.push(`${key}:${value}`)
//     })

//     res.status(200).json({
//         message: response
//     })
// })
// app.patch('/reverse-array', (req, res) => {
//     let rqArr = req.body.arr;
//     let newArr = [];
//     newArr = rqArr.reverse();
//     res.status(200).json({
//         message: newArr
//     })
// })

// app.delete('/duplicates', (req, res) => {
//     let rqArr = req.body.arr;
//     let newArr = rqArr.filter((item, index) => {
//         return rqArr.indexOf(item) === index
//     });
//     res.status(200).json({
//         message: newArr
//     })
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

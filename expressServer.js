const express = require('express');
const app = express();
let port = 8005;
const fs = require('fs');


app.get("/pets", function(req, res){
    fs.readFile("pets.json", function (error, data) {
        res.json(JSON.parse(data))
    })
    res.statusCode = 200    
})

app.get("/pets/:id/", function(req, res, next){
    const id = parseInt(req.params.id);
    //use id to get pet

    fs.readFile("./pets.json", function(error, data){
        //turn data string into js object
        const allPets = JSON.parse(data);
        if(id < 0 || id >= allPets.length){
            next({status: 404, message: `Please enter a number after /pets/ that is 0 or greater and less than ${allPets.length - 1}`})
        }else{
           //use id to select pet
            res.json(allPets[id])
        }
    })
})


app.use((error, req, res , next) => {
    console.error(error.stack);
    res.status(error.status).send({error: error})
  });
  

app.listen(port, ()=>{
    console.log(`You are using port ${port}`);
})

// app.get("/pets/0", function(req, res, next){
//     fs.readFile("pets.json", function(err, data){
//         if(err){
//             next(err);
//         }else{
//         data = JSON.parse(data);
//         res.json(data[0]);
//         // next();
//         }
//     })
// })

// app.get("/pets/1", function(req, res, next){
//     fs.readFile("pets.json", function(err, data){
//         if(err){
//             next(err);
//         }else {
//         data = JSON.parse(data);
//         res.json(data[1]);
//         }
//     })
// })



// app.get("/pets/2", function(req, res){
//     throw new Error("Not Found")
// })

// next({ status: 400, message: "Please enter a number after /pets/" });
// next allows the code to go the the next function or code if there is a error

// if an error occured
//used for checking errors the, (err,req,res,next) is all a function
// app.get("/pets/2", function(req, res, next){
//     res.sendStatus(404).json(pets.json);
//     next()
// })

// app.get("/pets/-1", function(req, res, next){
//     res.sendStatus(404).json(pets.json);
// })


// next({ status: 404, message: `Please enter a number after /pets/ that is greater than 0 and less than ${data.length}` });

// // if an error occured  -- Keep next to last
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status).send({ error: err });
// });

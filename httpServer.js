const fs = require('fs');
const http = require('http');
const port = 8000;

const server = http.createServer((request, response)=>{
    console.log("request", "Recieved request");
    const  URL = request.url
    // const method = request.method

    console.log(URL)

    if(URL == "/pets"){
        fs.readFile("./pets.json","utf8", function(err, data){
            if(err){
                response.setHeader("Content-Type", "application/json")
                response.statusCode = 404;
                response.end("internal server error");
                return;
            }
            const allPets = JSON.parse(data);

            console.log("allPets:", allPets);
            response.setHeader("Content-Type", "application/json");
            response.statusCode = 200;
            response.end(JSON.stringify(allPets));
        })
    } else if(URL == "/pets/0"){
        fs.readFile("./pets.json", "utf8", function(err, data){
            if(err){
                response.setHeader("Content-Type", "application/json");
                response.statusCode = 404;
                response.end("internal server error");
                return;
            }
            data = JSON.parse(data);
            let selection = data[0];
             console.log(typeof data)
            console.log("allPets[0]:", selection);
            response.setHeader("Content-Type", "application/json");
            response.statusCode = 200;
            response.end(JSON.stringify(selection));
        })
    }else if(URL == "/pets/1"){
        fs.readFile("./pets.json", "utf8", function(err, data){
            if(err){
                response.setHeader("Content-Type", "application/json");
                response.statusCode = 404;
                response.end("internal server error");
                return;
            }
            data = JSON.parse(data);
            let selection = data[1];
             console.log(typeof data)
            console.log("allPets[0]:", selection);
            response.setHeader("Content-Type", "application/json");
            response.statusCode = 200;
            response.end(JSON.stringify(selection));
        })
    } else{     console.log('Hello world');
                response.setHeader("Content-Type", "text/plain");
                response.statusCode = 404;
                response.end("Not Found");
                return;
        
    }

})

server.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

// curl localhost:8000/pets/0
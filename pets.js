const { exit } = require('node:process');
let fs = require('fs'); // add this to the top of your js file
const { stringify } = require('node:querystring');

// console.log(process.argv)
let argument = process.argv[2];
let listItems = process.argv[3];
let kindCreate = process.argv[4];
let nameCreate = process.argv[5];

if (argument == undefined) {
  console.error(
    new Error(
      "No arguments provided.\nUsage: node pets.js [read | create | update | destroy]"
    )
  );
  //process.exitCode = 1;
  exit(1);
} else if(argument == 'read') {

    fs.readFile('pets.json', 'utf8', function (error, data) {
        data = JSON.parse(data);
        if (error) {
            console.log(error)
        } else if( listItems < 0 || listItems > data.length){
            console.error(
                new Error(
                    "Out-of-bound-index. \n Usage: node pets.js read INDEX"
                )
                );
                exit(1);
        }else {
            console.log(data[listItems])
        } 
    })
} else if (argument == 'create') {
    if(listItems == undefined || nameCreate == undefined || kindCreate == undefined){
        console.error(
            new Error(
                "Did not provide required information \n Usage: node pets.js create AGE KIND NAME"
            )
            )
            exit(1);       
        } else {
            listItems = parseInt(listItems);
            let text = {age: listItems, kind: kindCreate, name: nameCreate}
            //still requires information that needs to be inputted in the string
            fs.readFile('pets.json','utf8', function(err, data){
                console.log(data);
                //turns data into an object
                data = JSON.parse(data);
                data.push(text);
                console.log(data);
                //turns the data back into an json (array)
                data = JSON.stringify(data);
            fs.writeFile('pets.json', data, function(error){
                    if(error) {
                        console.log(error)
                    } else {
                        console.log(data)
                    }
                })
            })
    }
}
//add object to array and add to text
// [{ "age": 7, "kind": "rainbow", "name": "fido" }, { "age": 5, "kind": "snake", "name": "Buttons" }]
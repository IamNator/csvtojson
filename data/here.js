
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// read all csv file line by line
let contents = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'customer-data.csv'))
})

// create a buffer to store all csv lines
let rawData = [];
contents.on('line', (row)=>{
    // each line will be stored as an array separates elememnt by ,
    // Note that, rawData now has nested array, means: [[a,b,c],[d,e,f],....]
    rawData.push(row.split(','));
})
contents.on('close', () =>{
    // pop the [0] element, put it in another array.
    let temp = rawData.shift();
    // now write json data manually: [{tepm[0]:rawData[0][0]},...].
    let jsonData = '[';
    for(let i=0;i<rawData.length-1;i++){
        jsonData += '{';
        for(let j=0;j<temp.length-1;j++){
            jsonData+='"'+temp[j]+'"'+':'+'"'+rawData[i][j]+'"'+','
        }
        jsonData+='"'+temp[temp.length-1]+'"'+':'+'"'+rawData[i][temp.length-1]+'"'+"},"
    }
    // This code block write the last element in json file, it suppose not to write the "," at the last element
    jsonData += '{';
        for(let j=0;j<temp.length-1;j++){
            jsonData+='"'+temp[j]+'"'+':'+'"'+rawData[rawData.length-1][j]+'"'+','
        }
        jsonData+='"'+temp[temp.length-1]+'"'+':'+'"'+rawData[rawData.length-1][temp.length-1]+'"'+"}"
    jsonData+=']';
    // write result to file.
    fs.writeFileSync(path.join(__dirname, 'customer-data.json'), jsonData, (err) =>{
        if(err) return console.error(err.message);
    })
})

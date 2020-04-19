const fs = require('fs')
const converter = require('csvtojson')
const path = require('path')
// const csvFilePath = './data/customer-data.csv'
// const jsonFilePath = './data/customer-data.json'


const convert = ( csvFilePath = './data/customer-data.csv', jsonFilePath = './data/customer-data.json' ) =>
{

converter()
    .fromFile(csvFilePath)
    .then((jsonObject) => {
      //console.log(jsonObject)
      var jsonContent = JSON.stringify(jsonObject, null, 2)

      // fs.writeFileSync(jsonFilePath, jsonContent)
      // console.log('Converted to json and saved in ', jsonFilePath)

      fs.writeFile(jsonFilePath, jsonContent, 'utf8', (error) => {
      if (error) {console.log(error.message)}
      console.log('Converted to json and saved in ', jsonFilePath)
      } )


    })
    //
    // fs.writeFile(jsonFilePath, jsonObject, 'utf8', (error) => {
    //   if (error) {console.log(error.message)}
    //   console.log('Converted to json and saved in ', jsonFilePath)
    // } )


}


//node toJson.js './data/customer-data.csv'  './data/customer-data.json'
convert(process.argv[2], process.argv[3])

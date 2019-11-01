const fs = require("fs")
const path = require("path")
const defaultConfig = require("./config")
const destinationPath =
const JSONPath = process.argv[6] || `../src/requests/fixtures/jsons`
const basePath = path.join(__dirname, JSONPath)
const passedItem = process.argv[4] || null
const collection = process.argv[3] || 'Campaigns'
const fixtureName = `${collection}.ts`
const fixturePath = path.join(__dirname, '..', 'src', 'requests', 'fixtures')
const randomGen = () => {
  return Math.random().toString(36).replace('0.', '') 
}
const newFixtureName = `${collection}.ts`
const initData =`export const ${collection} = {}`
const appendFixture = (item, fixture) => {
  fs.readFile(path.join(basePath, '/', item ), 'utf8', (err,data) => {
    if (err) throw err;
    const JSData = data.replace(/"([^"]+)":/g, '$1:')
    const dataObj = JSON.parse(data)
    const fieldName = process.argv[5] || `${dataObj.name.replace(/\s/g, "_")}_${randomGen()}`
    const writeData =`\n${collection}.${fieldName} = ${JSData}\n`
    fs.appendFile(path.join(fixturePath, '/', fixture), writeData, (err) => {
      if (err) throw err;
      console.log(`updated ${fixtureName} with new fixture data: "${fieldName}".`);
    })
  })
}
fs.readdir(fixturePath, (err, items) => {
  const existingFixtures = items.filter(item => item === collection || item === fixtureName)
  if(existingFixtures.length === 0){
    fs.writeFile(path.join(fixturePath, '/', newFixtureName), initData, err => {
      if (err) throw err;
      console.log(`new fixture file ${newFixtureName} created`);
      if(passedItem) appendFixture(passedItem, newFixtureName)
      fs.readdir(basePath, (err, items) => items.map(item => appendFixture(item, newFixtureName)))
    });
  } else if(process.argv[2]) {
    fs.truncate(path.join(fixturePath, '/', fixtureName), 28, err => {
      if (err) throw err;
      console.log(`removed existing fixture data from ${fixtureName}`);
      if(passedItem) appendFixture(passedItem, fixtureName)
      fs.readdir(basePath, (err, items) => items.map(item => appendFixture(item, fixtureName)))
    });
  } else {
    if(passedItem) appendFixture(passedItem, fixtureName)
    fs.readdir(basePath, (err, items) => items.map(item => appendFixture(item, fixtureName)))  
  } 
})




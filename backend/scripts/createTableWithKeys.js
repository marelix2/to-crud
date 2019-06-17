const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const RandomValues = require('./../api/utils/RandomValues');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
let db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 1,
        min: 0
    },
    wordsPerSentence: {
        max: 8,
        min: 1
    }
});

const MAIN_TABLE = lorem.generateWords(1);
const PK = lorem.generateWords(1);
const PK_FIRST_COL = lorem.generateWords(1);
const PK_SEC_COL = lorem.generateWords(1);

const SEC_TABLE = lorem.generateWords(1);
const FK = lorem.generateWords(1);
const FK_FIRST_COL = lorem.generateWords(1);
const FK_SEC_COL = lorem.generateWords(1);


const createPrimaryTableQuery = () => {
    return `CREATE TABLE ${MAIN_TABLE}(
        ${PK} INT PRIMARY KEY,
        ${ PK_FIRST_COL} TEXT NOT NULL,
        ${PK_SEC_COL} INT NOT NULL)`
}

const insertPrimaryTableQuery = (index) => {
    const values = `${index}, '${lorem.generateWords(2)}', ${RandomValues.getInt(0,1337)}`
    return `INSERT INTO ${MAIN_TABLE}(${PK}, ${PK_FIRST_COL}, ${PK_SEC_COL}) VALUES(${values})`;
}

const createForeignTableQuery = () => {
    return `CREATE TABLE ${SEC_TABLE}(
        ${FK_FIRST_COL} INT NOT NULL,
        ${FK_SEC_COL} TEXT  NOT NULL,
        ${FK} INT NOT NULL,
        FOREIGN KEY(${FK}) REFERENCES ${MAIN_TABLE}(${PK}))`
}

const insertForeignTableQuery = (index) => {  
    const values = `${RandomValues.getInt(0,1337)}, '${lorem.generateWords(2)}', ${index}`
    return `INSERT INTO ${SEC_TABLE}(${FK_FIRST_COL}, ${FK_SEC_COL}, ${FK}) VALUES(${values})`;
}

db.run(`${createPrimaryTableQuery()}`);
db.close();

 setTimeout( () => {
    db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));
        db.run(`${createForeignTableQuery()}`);
     db.close();
},4000)

 setTimeout( () => {
    db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));
    for(let i = 0; i < 10; i++){
        db.run(`${insertPrimaryTableQuery(i)}`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log(`dodano wiersz o id: ${i}`);
          });
    }
     db.close();
},4000)

setTimeout( () => {
    db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));
    for(let i = 0; i < 10; i++){
        db.run(`${insertForeignTableQuery(i)}`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log(`dodano wiersz o id: ${i}`);
          });
    }
     db.close();
},8000)


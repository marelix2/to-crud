const fs = require('fs');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const args = process.argv.slice(2)
console.log(args[0])

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 2,
        min: 1
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const getInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const numberOfFilesLines = getInt(80, 120);
let files = new Array(100).fill(`${args[0] || 'alpha'}`);
const paragraphs = new Array(numberOfFilesLines).fill('').map(() => lorem.generateParagraphs(1))


const saveToFile = (fileName, data) => {
    fs.writeFile(`../backend/tmp/${fileName}.txt`, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
}

const replaceLines = (data) => {
    let rangeOfSentenceChange = getInt(1, 40);
    let iterator = 0;
    while(rangeOfSentenceChange !== 0 && iterator < numberOfFilesLines) {
        const shouldUpdate = getInt(0,2);
        if(shouldUpdate) {
            data[iterator] = lorem.generateParagraphs(1);
            rangeOfSentenceChange--;
        }
        iterator++;
    }
    return data;
}

const insertLines = (data) => {
    let rangeOfeChanges = getInt(0, 5);
    while (rangeOfeChanges !== 0){
        data.push(lorem.generateParagraphs(1))
        rangeOfeChanges--;
    }

    return data
}


files.map((file, index) => {
    let newParagraphs = replaceLines([...paragraphs]);
    newParagraphs = insertLines(newParagraphs);
    saveToFile(`${file}_${lorem.generateWords(1)}_${index}`, newParagraphs);
})



// 
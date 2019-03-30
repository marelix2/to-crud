const randomstring = require("randomstring");
  

    const getString = (length) => {
        return randomstring.generate({
            length: length,
            charset: 'alphabetic'
        });
    }

    const getInt = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }


module.exports = {
    getString,
    getInt
}



const uniqueId = (type) => {

    const length = 5;

    const generateIdUniqueType = {
        intOnly() {
            const moment = require("moment-timezone");
            const result = moment().unix() + Math.floor(Math.random() * 999999);

            return result.toString();
        },
        stringOnly(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result.toString();
        },
        specialCharactersOnly(length) {

            let result = '';
            let characters = '"!@#$%*()_+';
            let charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            return result.toString();
        },
        intAndStringAndspecialCharacters() {
            const result = generateIdUniqueType.intOnly() + generateIdUniqueType.stringOnly(3) + generateIdUniqueType.specialCharactersOnly(2);

            return result.toString();
        }
    }

    const uniqueIdFunction = generateIdUniqueType[type];

    let resUniqueId;

    if(uniqueIdFunction){

        resUniqueId = uniqueIdFunction(length);
    }

    return resUniqueId;
}

module.exports = uniqueId;
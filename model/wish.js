const { log } = require('console');
const fs = require('fs'); //fs - file system 
const path = require('path');
const filePath = path.join(path.dirname(require.main.filename), 'data', 'wishes.json');


module.exports = class Wish {

    constructor(wish, imageUrl){
        this.description = wish;
        this.imageUrl = imageUrl;
    }

    saveWish() {
        fs.readFile(filePath, (error, fileContent) => {
            let wishes = [];

            if(!error){
                wishes = JSON.parse(fileContent); 
            }
            else
            {
                console.log(error);
            }

            wishes.push(this); 

            fs.writeFile(filePath, JSON.stringify(wishes), (error) => {
                if (!error) {
                    console.log('wish saved');
                }
                else {
                console.log(error);
                }
            });

        });
    }

    static fetchAllWishes(callBack) {
        fs.readFile(filePath, (error, fileContent) => {
            if(error){
                callBack([]);
            };

            callBack(JSON.parse(fileContent));
        });
    }



}
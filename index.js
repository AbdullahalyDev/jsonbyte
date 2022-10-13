/**
 * JavaScript.json is a package that helps programmers control the JSON file via Functions
 */

const fs = require("fs");
const path = require("path");

const error = require("./utils/error");
const propertyExists = require("./utils/propertyExists")

var pastDataFile = Object.create(null);
var dataFile = Object.create(null);
var savePath = null;

class json {


    constructor(filePath = "") {
        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify({}))
            };
            if (!fs.existsSync(filePath)) return error("JSON File Not Found");
            var read = fs.readFileSync(filePath);
            if (read == "" && filePath.endsWith(".json")) {
                read = "{}";
            }
            const data = JSON.parse(read);
            dataFile = data;
            pastDataFile = data;
            savePath = filePath
        }
        catch (err) {
            return error(err);
        }

    }


    save(space = 4) {
        fs.writeFileSync(savePath, JSON.stringify(dataFile, null, space))
        return this;
    }

    saveNewFile(path, space = 4) {
        fs.writeFileSync(path, JSON.stringify(dataFile, null, space))
        return this;
    }

    create(key, value) {
        const data = Object(dataFile);
        if (propertyExists(data, key)) return error(`${key} is already exists`);
        data[key] = value;
        return this;
    }

    change(key, value) {
        const data = Object(dataFile);
        if (!propertyExists(data, key)) return error(`${key} not found`);
        data[key] = value;
        return this;
    }

    remove(key) {
        const data = Object(dataFile);
        const isAry = Array.isArray(key);
        if (isAry) {
            key.forEach((k) => {
                if (!propertyExists(data, k)) return error(`${k} not found`);
                delete data[k];
            })
        } else {
            if (!propertyExists(data, key)) return error(`${key} not found`);
            delete data[key]
        };
        return this;
    }

    merge(obj) {
        var object = Object(obj);
        var data = Object(dataFile);
        data = Object.assign(data, object)
        return this;
    }

    preview() {
        return dataFile;
    }

    get(key) {
        const data = Object(dataFile);
        if (!propertyExists(data, key)) return error(`${key} not found`);
        return data[key];
    }

    exists(key) {
        const data = Object(dataFile);
        if (propertyExists(data, key)) return true;
        else return false;
    }





    length() {
        const data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        return data.length;
    }


    createElm(value) {
        const data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        data.push(value);
        return this;
    }

    createElmInFirst(value) {
        const data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        data.unshift(value);
        return this;
    }


    changeElm(elm, value) {
        const data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        if (elm > data.length - 1) return error("element number not found");
        data[elm] = value;
        return this;
    }


    getElm(elm) {
        const data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        if (elm > data.length - 1) return error("element number not found");
        return data[elm];
    }


    existsElm(elm) {
        const data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        const lng = data.length - 1;
        if (elm < lng) return true;
        else return false;
    }


    removeElm(elm) {
        var data = Object(dataFile);
        if (!Array.isArray(data)) return error("please join array to use this function");
        if (elm > data.length - 1) return error("element number not found");
        var filtered = data.filter(function (value, index, arr) {
            return index != elm;
        });
        for (let i = 0; i <= data.length + 1; i++) {
            data.pop();
        }
        Object.assign(data, filtered)
        return this;
    }


    join(key) {
        const data = Object(dataFile);
        if (!propertyExists(data, key)) return error(`${key} not found`);
        if (typeof data[key] == "object") {
            dataFile = data[key];
        } else return error(`${key} is not object`);
        return this;
    }

    leave() {
        dataFile = pastDataFile;
        return this;
    }


    comments = {

        create: (key, value) => {
            this.create(`//${key}//`, value);
            return this;
        },

        remove: (key) => {
            this.remove(`//${key}//`);
            return this;
        },

        get: (key) => {
            return this.get(`//${key}//`);
        },

        all: () => {
            const obj = Object(dataFile);
            const objKeys = Object.keys(dataFile);
            var result = [];
            for (let i of objKeys) {
                if (i.startsWith("//") && i.startsWith("//")) result.push({ title: i.replace(/\/\//g, ""), value: obj[i] });
            }

            return result;
        }

    };

    conditional = {
        key: {

            startsWith: (keyword) => {
                const obj = Object(dataFile);
                const objKeys = Object.keys(dataFile);
                var result = {};
                for (let i of objKeys) {
                    if (i.startsWith(keyword)) {
                        result[i] = obj[i]
                    }
                }
                return result;
            },

            includes: (keyword) => {
                const obj = Object(dataFile);
                const objKeys = Object.keys(dataFile);
                var result = {};
                for (let i of objKeys) {
                    if (i.includes(keyword)) {
                        result[i] = obj[i]
                    }
                }
                return result;
            },

            endsWith: (keyword) => {
                const obj = Object(dataFile);
                const objKeys = Object.keys(dataFile);
                var result = {};
                for (let i of objKeys) {
                    if (i.endsWith(keyword)) {
                        result[i] = obj[i]
                    }
                }
                return result;
            }

        },

        value: {

            startsWith: (keyword) => {
                const obj = Object(dataFile);
                const objKeys = Object.keys(dataFile);
                const objValues = Object.values(dataFile);
                var result = {};
                for (let i = 0; i < objValues.length; i++) {
                    if (objValues[i].toString().startsWith(keyword)) {
                        result[objKeys[i]] = objValues[i]
                    }
                }
                return result;
            },

            includes: (keyword) => {
                const obj = Object(dataFile);
                const objKeys = Object.keys(dataFile);
                const objValues = Object.values(dataFile);
                var result = {};
                for (let i = 0; i < objValues.length; i++) {
                    if (objValues[i].toString().includes(keyword)) {
                        result[objKeys[i]] = objValues[i]
                    }
                }
                return result;
            },

            endsWith: (keyword) => {
                const obj = Object(dataFile);
                const objKeys = Object.keys(dataFile);
                const objValues = Object.values(dataFile);
                var result = {};
                for (let i = 0; i < objValues.length; i++) {
                    if (objValues[i].toString().endsWith(keyword)) {
                        result[objKeys[i]] = objValues[i]
                    }
                }
                return result;
            }

        }

    }

}



module.exports = json;
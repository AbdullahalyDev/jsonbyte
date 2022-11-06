/**
 * ? jsonbyte is a package that helps programmers control the JSON file via Functions
 * ? v1.1.6
 * ! Did you run into any issues, head over to https://github.com/AbdullahalyDev/jsonbyte/issues
 */

const fs = require("fs");
const path = require("path");

class json {


    /**
     * @types
     * @param {string} path 
     */
    constructor(path) {
        try {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, JSON.stringify({}))
            };


            var read = fs.readFileSync(path);
            const data = JSON.parse(read);

            this.#data = data;
            this.#main = data;
            this.#path = path;
        }
        catch (err) {
            throw new Error(err);
        }

    }



    // Private Variables
    #data = null;
    #main = null;
    #path = null;




    // Main Functions



    /**
     * 
     * @param {number} space 
     * @returns
     */
    
    save(space = 4) {
        fs.writeFileSync(this.#path, JSON.stringify(this.#data, null, space))
        return this;
    }




    /**
     * 
     * @param {string} path 
     * @param {number} space 
     * @returns
     */

    saveNewFile(path, space = 4) {
        fs.writeFileSync(path, JSON.stringify(this.#data, null, space))
        return this;
    }




    /**
     * 
     * @param {string} key 
     * @param {*} value 
     * @returns
     */

    set(key, value) {
        if (this.#data.hasOwnProperty(key)) throw new Error(`${key} is already exists`);
        this.#data[key] = value;
        return this;
    }




    /**
     * 
     * @param {string} key 
     * @param {*} value 
     * @returns
     */

    change(key, value) {
        if (!this.#data.hasOwnProperty(key)) throw new Error(`${key} not found`);
        this.#data[key] = value;
        return this;
    }




    /**
     * 
     * @param {string} key 
     * @returns
     */

    remove(key) {
        const isAry = Array.isArray(key);
        if (isAry) {
            key.forEach((k) => {
                if (!this.#data.hasOwnProperty(k)) throw new Error(`${k} not found`);
                delete this.#data[k];
            })
        } else {
            if (!this.#data.hasOwnProperty(key)) throw new Error(`${key} not found`);
            delete this.#data[key]
        };
        return this;
    }




    /**
     * 
     * @param object 
     * @returns
     */

    merge(object) {
        this.#data = Object.assign(this.#data, object)
        return this;
    }



    /**
     * 
     * @param object 
     * @returns
     */

    replace(object) {
        this.#data = object
        return this;
    }




    /**
     * 
     * @returns {object}
     */

    preview() {
        return this.#data;
    }




    /**
     * 
     * @param {string} key 
     * @returns {*}
     */

    get(key) {
        if (!this.#data.hasOwnProperty(key)) throw new Error(`${key} not found`);
        return this.#data[key];
    }




    /**
     * 
     * @param {string} key 
     * @returns {boolean}
     */

    exists(key) {
        if (this.#data.hasOwnProperty(key)) return true;
        else return false;
    }




    /**
     * 
     * @returns 
     */

    length() {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        return this.#data.length;
    }




    /**
     * 
     * @param {*} value 
     * @returns 
     */

    setElm(value) {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        this.#data.push(value);
        return this;
    }





    /**
     * 
     * @param {*} value 
     * @returns 
     */

    setElmInFirst(value) {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        this.#data.unshift(value);
        return this;
    }




    /**
     * 
     * @param {number} elm 
     * @param {*} value 
     * @returns 
     */

    changeElm(elm, value) {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        if (elm > this.#data.length - 1) throw new Error("element number not found");
        this.#data[elm] = value;
        return this;
    }




    /**
     * 
     * @param {number} elm 
     * @returns 
     */

    getElm(elm) {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        if (elm > this.#data.length - 1) throw new Error("element number not found");
        return this.#data[elm];
    }




    /**
     * 
     * @param {number} elm 
     * @returns 
     */

    existsElm(elm) {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        const lng = this.#data.length - 1;
        if (elm < lng) return true;
        else return false;
    }




    /**
     * 
     * @param {number} elm 
     * @returns 
     */

    removeElm(elm) {
        if (!Array.isArray(this.#data)) throw new Error("please join array to use this function");
        if (elm > this.#data.length - 1) throw new Error("element number not found");
        var filtered = this.#data.filter(function (value, index, arr) {
            return index != elm;
        });
        this.#data = filtered
        return this;
    }




    /**
     * 
     * @param {string} key 
     * @returns
     */

    join(key) {
        if (!this.#data.hasOwnProperty(key)) throw new Error(`${key} not found`);
        if (typeof this.#data[key] == "object") {
            this.#data = this.#data[key];
        } else throw new Error(`${key} is not object`);
        return this;
    }




    /**
     * 
     * @returns 
     */

    leave() {
        this.#data = this.#main;
        return this;
    }


    comments = {




        /**
         * 
         * @param {string} key 
         * @param {*} value 
         * @returns
        */
        
        set: (key, value) => {
            this.set(`//${key}//`, value);
            return this;
        },



    
        /**
         * 
         * @param {string} key 
         * @returns
         */

        remove: (key) => {
            this.remove(`//${key}//`);
            return this;
        },




        /**
         * 
         * @param {string} key 
         * @returns {*}
         */

        get: (key) => {
            return this.get(`//${key}//`);
        },




        /**
         * 
         * @returns {array}
         */

        all: () => {
            const keys = Object.keys(this.#data);
            var result = [];
            for (let i of keys) {
                if (i.startsWith("//") && i.endsWith("//")) result.push({ title: i.replace(/\/\//g, ""), value: data[i] });
            }
            return result;
        }

    };

    conditional = {
        key: {




            /**
             * 
             * @param {*} keyword 
             * @returns 
            */
            
            startsWith: (keyword) => {
                const keys = Object.keys(this.#data);
                var result = {};
                for (let i of keys) {
                    if (i.startsWith(keyword)) {
                        result[i] = this.#data[i]
                    }
                }
                return result;
            },




            /**
             * 
             * @param {*} keyword 
             * @returns 
             */

            includes: (keyword) => {
                const keys = Object.keys(this.#data);
                var result = {};
                for (let i of keys) {
                    if (i.includes(keyword)) {
                        result[i] = this.#data[i]
                    }
                }
                return result;
            },




            /**
             * 
             * @param {*} keyword 
             * @returns 
             */
            
            endsWith: (keyword) => {
                const keys = Object.keys(this.#data);
                var result = {};
                for (let i of keys) {
                    if (i.endsWith(keyword)) {
                        result[i] = this.#data[i]
                    }
                }
                return result;
            }

        },

        value: {




            /**
             * 
             * @param {*} keyword 
             * @returns 
            */
            
            startsWith: (keyword) => {
                const keys = Object.keys(this.#data);
                const values = Object.values(this.#data);
                var result = {};
                for (let i = 0; i < values.length; i++) {
                    if (values[i].toString().startsWith(keyword)) {
                        result[keys[i]] = values[i]
                    }
                }
                return result;
            },




            /**
             * 
             * @param {*} keyword 
             * @returns 
             */

            includes: (keyword) => {
                const keys = Object.keys(this.#data);
                const values = Object.values(this.#data);
                var result = {};
                for (let i = 0; i < values.length; i++) {
                    if (values[i].toString().includes(keyword)) {
                        result[keys[i]] = values[i]
                    }
                }
                return result;
            },




            /**
             * 
             * @param {*} keyword 
             * @returns 
             */

            endsWith: (keyword) => {
                const keys = Object.keys(data);
                const values = Object.values(data);
                var result = {};
                for (let i = 0; i < values.length; i++) {
                    if (values[i].toString().endsWith(keyword)) {
                        result[keys[i]] = values[i]
                    }
                }
                return result;
            }

        }

    }

}

module.exports = json;

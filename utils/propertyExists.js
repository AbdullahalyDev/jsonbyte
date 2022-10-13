module.exports = (data, key) => {
    if (typeof data != "object") return error("invalid type data");
    const obj = Object(data);
    if (obj.hasOwnProperty(key)) return true;
    else return false;
}
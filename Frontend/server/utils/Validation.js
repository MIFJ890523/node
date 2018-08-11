module.exports.isEmptyJSON = (obj) => {
    for(var i in obj) {
        return 0;
    }
    return 1;
}

module.exports.isHTML = (text) => {
    var value = text.toString()
    var htmlObjVal="{";
    var htmlArrVal="[";
    if (value === "null" || value === "Error" || value === "Not Found" || (value.charAt(0) !== htmlObjVal && value.charAt(0) !== htmlArrVal)){
        return 1;
    }
    return 0;
}

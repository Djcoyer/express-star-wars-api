"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function patchObject(originalObject, requestObject) {
    let characterProps = Object.keys(originalObject);
    characterProps.map(key => {
        if (requestObject.hasOwnProperty(key))
            if (typeof requestObject[key] === typeof originalObject[key])
                originalObject[key] = requestObject[key];
            else
                delete requestObject[key];
    });
    return originalObject;
}
exports.patchObject = patchObject;
function patchDbObject(requestObject, dbObject, id) {
    if (id != dbObject['_id'])
        return null;
    let convertedDbObject = dbObject.toObject();
    let dbKeys = Object.keys(convertedDbObject);
    dbKeys.map(key => {
        if (requestObject.hasOwnProperty(key))
            if (typeof requestObject[key] === typeof dbObject[key])
                dbObject[key] = requestObject[key];
    });
    return dbObject;
}
exports.patchDbObject = patchDbObject;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function patchObject(originalObject, requestObject) {
    let requestKeys = Object.keys(requestObject);
    let characterProps = Object.keys(originalObject);
    requestKeys.map(key => {
        if (characterProps.indexOf(key) < 0)
            delete requestObject[key];
        else {
            if (typeof requestObject[key] === typeof originalObject[key])
                originalObject[key] = requestObject[key];
            else
                delete requestObject[key];
        }
    });
    return originalObject;
}
exports.patchObject = patchObject;

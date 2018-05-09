import {type} from "os";

export {
    patchObject,
    patchDbObject
};

function patchObject(originalObject: object, requestObject: object): any {
    let characterProps: string[] = Object.keys(originalObject);
    characterProps.map(key => {
        if (requestObject.hasOwnProperty(key))
            if (typeof requestObject[key] === typeof originalObject[key])
                originalObject[key] = requestObject[key];
            else delete requestObject[key];
    });

    return originalObject;
}

function patchDbObject(requestObject: any, dbObject: any, id: string): any {
    if (id != dbObject['_id']) return null;
    let convertedDbObject = dbObject.toObject();
    let dbKeys = Object.keys(convertedDbObject);
    dbKeys.map(key => {
        if (requestObject.hasOwnProperty(key))
            if (typeof requestObject[key] === typeof dbObject[key])
                dbObject[key] = requestObject[key];
    });
    return dbObject;
}
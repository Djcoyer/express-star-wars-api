export {
    patchObject
};

function patchObject(originalObject:object, requestObject:object): any {
    let requestKeys:string[] = Object.keys(requestObject);
    let characterProps:string[] = Object.keys(originalObject);
    requestKeys.map(key => {
        if(characterProps.indexOf(key) < 0)
            delete requestObject[key];
        else {
            if(typeof requestObject[key] === typeof originalObject[key])
                originalObject[key] = requestObject[key];
            else delete requestObject[key];
        }
    });

    return originalObject;
}
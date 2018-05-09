"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertFromDbObject(dbValue, daoObject) {
    if (dbValue != null) {
        let dbObject = dbValue.toObject();
        let keys = Object.keys(dbObject);
        if (daoObject) {
            keys.map(key => {
                if (daoObject.hasOwnProperty(key)) {
                    daoObject[key] = dbObject[key];
                }
                else if (key === '_id') {
                    daoObject['id'] = dbObject[key];
                }
            });
            return daoObject;
        }
    }
}
exports.convertFromDbObject = convertFromDbObject;

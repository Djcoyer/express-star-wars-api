export {
    convertFromDbObject
};

function convertFromDbObject(dbValue: any, daoObject: any): any {
    if (dbValue != null) {
        let dbObject = dbValue.toObject();
        let keys = Object.keys(dbObject);
        if (daoObject) {
            keys.map(key => {
                if (daoObject.hasOwnProperty(key)) {
                    daoObject[key] = dbObject[key];
                } else if (key === '_id') {
                    daoObject['id'] = dbObject[key];
                }
            });

            return daoObject;
        }
    }
}

function convertFromObjectToDb(dbValue: any, daoObject: any) :any {

}

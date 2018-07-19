import MovieDao from "../models/dao/MovieDao";
import { convertFromDbObject, convertFromDbObjectToType } from "./DbConverters";

export {
getDaosFromDbObjects
};

function getDaosFromDbObjects<T>(dbObjects: any, daoObject: any): T[] {
    let daos: T[] = [];
               if(dbObjects && dbObjects.length)
                   dbObjects.map(dbObject => {
                      let movieDao:T = convertFromDbObjectToType<T>(dbObject, daoObject);
                      daos.push(movieDao);
                   });
               return daos;
}
import { IMAGE_TABLE_NAME } from "./DB_Constants";

export default function upgrad(db: IDBDatabase) {
  if(!db.objectStoreNames.contains(IMAGE_TABLE_NAME)){
    db.createObjectStore(IMAGE_TABLE_NAME,{
      keyPath: 'id',
      autoIncrement: true
    })
  }
}
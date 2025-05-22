import { DATA_BASE_NAME, DATA_BASE_VERSION, IMAGE_TABLE_NAME } from "./DB_Constants"
import IndexedDBWrapper from "./IndexedDBWrapper"

const dbWapper = new IndexedDBWrapper(DATA_BASE_NAME, DATA_BASE_VERSION)
const addImage = (base64: string) => {
  return dbWapper.add(IMAGE_TABLE_NAME, {url: base64})
}
const findAllImage = () => {
  return dbWapper.findAll<{id: number, url: string}>(IMAGE_TABLE_NAME)
}
const deleteImageById = (id: number) => {
  return dbWapper.deleteById(IMAGE_TABLE_NAME, id)
}

const unWrapDb = () => dbWapper.db
export {
  unWrapDb,
  addImage,
  findAllImage,
  deleteImageById
}
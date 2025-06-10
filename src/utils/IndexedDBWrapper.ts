import upgrad from "./upgradDataBase"

export default class IndexedDBWrapper {
  dbName: string
  version: number
  db: IDBDatabase | null = null
  constructor(_dbName: string, _version: number){
    this.dbName = _dbName
    this.version = _version
    this.open()
  }

  open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.version)
      request.onsuccess = (ev) => {
        this.db = (ev.target as IDBRequest).result
        resolve(this.db!)
      }
      request.onupgradeneeded = (ev) => {
        this.db = (ev.target as IDBRequest).result
        upgrad(this.db!)
      }
      request.onerror = reject
    }) 
  }
  add<T>(tableName: string, data: T): Promise<number> {
    return new Promise((resolve, reject) => {
      this.getStore(tableName, 'readwrite')
        .then(store => {
          const requst = store.add(data)
          requst.onsuccess = (ev) => resolve((ev.target as IDBRequest).result)
          requst.onerror = reject
        }) 
    })
  }
  deleteById(tableName: string, id: number) {
    return new Promise((resolve, reject) => {
      this.getStore(tableName, 'readwrite')
        .then(store => {
          const request = store.delete(id)
          request.onsuccess = resolve
          request.onerror = reject
        })
    })
  }
  findAll<T>(tableName: string): Promise<T[]>{
    return new Promise((resolve, reject) => {
      this.getStore(tableName)
        .then(store => {
          const request = store.getAll()
          request.onsuccess = (ev) => resolve((ev.target as IDBRequest).result)
          request.onerror = reject
        })
    })
  }
  async getStore(tableName: string, mode: IDBTransactionMode = 'readonly') {
      const db = this.db || (await this.open())
      const transaction = db.transaction(tableName, mode)
      return transaction.objectStore(tableName)
  }
}
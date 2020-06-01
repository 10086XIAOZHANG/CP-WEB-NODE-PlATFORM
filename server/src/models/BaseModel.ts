import { Guid } from "../utils/tools";



export class BaseModel {
  private _id: string = Guid()
  private _created_at: number = Date.now()

  // id: string

  get id() { return this._id }
  set id(_id) {this._id = _id}

  created_by: string

  get created_at() { return this._created_at }
  set created_at(_created_at) { this._created_at = _created_at }

  updated_by?: string

  updated_at?: number

  deleted_by?: string

  deleted_at?: number

  version?: number = 0
}
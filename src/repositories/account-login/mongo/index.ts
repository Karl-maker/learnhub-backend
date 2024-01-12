import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { AccountLoginRepositoryType } from "../interface";
import Repository from "../../base";

export class AccountLoginMongoRepository extends Repository.mongo<AccountLoginRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<AccountLoginRepositoryType & Document>('AccountLogin', new Schema({
        account_id: { type: String, required: true },
        method: { type: String },
        ip_address: { type: String },
        origin: { type: String },
        location: { 
            country: { type: String },
            state: { type: String },
            city: { type: String },
            street: { type: String }
        },
        refresh: { 
            token: { type: String },
            expiration: { type: String }
        },
      }, {
        timestamps: { 
            updatedAt: 'updated_at', 
            createdAt: 'created_at' 
        },
        versionKey: 'v',
        toJSON: {
            transform: function (doc, ret) {
              ret.id = ret._id;
              delete ret._id;
              delete ret.__v;
            }
        }
      }
      )));
    }
}

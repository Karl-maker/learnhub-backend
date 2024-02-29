import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
import { AccountLoginRepositoryType } from "../interface";
import Repository from "../../base";

export class AccountLoginMongoRepository extends Repository.mongo<AccountLoginRepositoryType> {
    constructor() {
      super(mongoose.model<AccountLoginRepositoryType & Document>('AccountLogin', new Schema({
        id: { type: String },
        account_id: { type: String },
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
              doc.id = ret._id;
              delete ret._id;
              delete ret.__v;
            }
        }
      }
      )));
    }
}

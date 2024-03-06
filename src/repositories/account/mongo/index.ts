import mongoose, { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { AccountRepositoryType } from "../interface";
import Repository from "../../base";

export class AccountMongoRepository extends Repository.mongo<AccountRepositoryType> {
    constructor() {
      super(mongoose.model<AccountRepositoryType & Document>('Account', new Schema({
        id: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        mobile: { type: String },
        hash_password: { type: String },
        type: { type: String },
        deleted: { type: Boolean, default: false },
        deactivated: { type: Boolean, default: false },
        confirmed: { type: Boolean, default: false }
      }, {
        timestamps: { 
            updatedAt: 'updated_at', 
            createdAt: 'created_at' 
        },
        versionKey: 'v',
        toJSON: {
            virtuals: true,
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

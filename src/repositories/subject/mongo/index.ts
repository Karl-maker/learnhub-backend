import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { SubjectRepositoryType } from "../interface";
import Repository from "../../base";

export class SubjectMongoRepository extends Repository.mongo<SubjectRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<SubjectRepositoryType & Document>('Subject', new Schema({
        name: { type: String },
        description: { type: String }
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

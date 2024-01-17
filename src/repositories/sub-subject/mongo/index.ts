import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { SubSubjectRepositoryType } from "../interface";
import Repository from "../../base";

export class SubSubjectMongoRepository extends Repository.mongo<SubSubjectRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<SubSubjectRepositoryType & Document>('SubSubject', new Schema({
        name: { type: String },
        subject_name: { type: String },
        description: { type: String },
        examination_level_id: [ { type: String } ],
        course_id: [ { type: String } ],
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

import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { CourseRepositoryType } from "../interface";
import Repository from "../../base";

export class CourseMongoRepository extends Repository.mongo<CourseRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<CourseRepositoryType & Document>('Course', new Schema({
        name: { type: String },
        description: { type: String },
        grades: [
            {
                type: Number
            }
        ],
        topics: [
            {
                id: { type: String }
            }
        ],
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

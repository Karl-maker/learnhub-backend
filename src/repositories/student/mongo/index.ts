import mongoose, { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { StudentRepositoryType } from "../interface";
import Repository from "../../base";

export class StudentMongoRepository extends Repository.mongo<StudentRepositoryType> {
    constructor() {
      super(mongoose.model<StudentRepositoryType & Document>('Student', new Schema({
        id: { type: String },
        account_id: { type: String },
        username: { type: String, required: false },
        display_name: { type: String, required: false },
        school: { 
          name: { type: String },
        },
        location: { 
          country: { type: String, required: false },
          district: { type: String, required: false },
        },
        grade: { type: Number }
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

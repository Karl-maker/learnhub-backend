import mongoose, { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { QuizRepositoryType } from "../interface";
import Repository from "../../base";

export class QuizMongoRepository extends Repository.mongo<QuizRepositoryType> {
    constructor() {
      super(mongoose.model<QuizRepositoryType & Document>('Quiz', new Schema({
        id: { type: String },
        student_id: { type: String },
        questions: [
            {
                id: { type: String },
                possible_marks: { type: Number },
                earned_marks: { type: Number },
                complete: { type: Boolean, default: false },
                message: { type: String },
                tier_level: { type: Number }
            }
        ],
        type: { type: String },
        score: { type: Number },
        complete: { type: Boolean, default: false }
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
              return
            }
        }
      }
      )));
    }
}

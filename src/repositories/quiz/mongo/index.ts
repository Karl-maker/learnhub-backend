import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { QuizRepositoryType } from "../interface";
import Repository from "../../base";

export class QuizMongoRepository extends Repository.mongo<QuizRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<QuizRepositoryType & Document>('Quiz', new Schema({
        student_id: { type: String },
        questions: [
            {
                id: { type: String },
                possible_marks: { type: Number },
                earned_marks: { type: Number },
                complete: { type: Boolean },
                message: { type: String },
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
            }
        }
      }
      )));
    }
}

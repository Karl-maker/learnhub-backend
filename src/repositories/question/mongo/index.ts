import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { QuestionRepositoryType } from "../interface";
import Repository from "../../base";

export class QuestionMongoRepository extends Repository.mongo<QuestionRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<QuestionRepositoryType & Document>('Question', new Schema({
        name: { type: String },
        description: { type: String },
        tier_level: { type: Number },
        marks: { type: Number },
        content: [
            {
                type: { type: String },
                url: { type: String },
                text: { type: String },
            }
        ],
        multiple_choice: [
            {
                is_correct: { type: Boolean },
                content: {
                    type: { type: String },
                    url: { type: String },
                    text: { type: String },
                }
            }
        ],
        topic: { type: String },
        tips: [
            {
                type: { type: String },
                url: { type: String },
                text: { type: String }
            }
        ]
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

import { Document, Connection } from "mongoose";
import { Schema } from "mongoose";
import { TopicRepositoryType } from "../interface";
import Repository from "../../base";

export class TopicMongoRepository extends Repository.mongo<TopicRepositoryType> {
    constructor(connection: Connection) {
      super(connection.model<TopicRepositoryType & Document>('Topic', new Schema({
        name: { type: String },
        description: { type: String },
        tier_level: { type: Number }
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

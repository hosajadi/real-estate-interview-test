import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IdCounter} from "./schemas/id.schema";

@Injectable()
export class AppService{
    constructor(
        @InjectModel(IdCounter.name)
        private readonly idCounterModel: Model<IdCounter>,
    ){}
    async getNextSequenceValue(sequenceName: string): Promise<number> {
        const sequenceDocument = await this.idCounterModel.findByIdAndUpdate(
            sequenceName,
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        return sequenceDocument.seq;
    }
}

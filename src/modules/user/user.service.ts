import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {ICreateUserServiceInput,} from './user.interface';
import { User, UserDocument} from 'src/schemas/user.schema';
import {AppService} from "../../app.service";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly appService: AppService
    ) {}
    async createUser(user: ICreateUserServiceInput) {
        const newId = await this.appService.getNextSequenceValue('user');
        return this.userModel.create({
            _id: newId,
            ...user
        });
    }
    async updateUserEmailVerified(userId: number) {
        return this.userModel.findByIdAndUpdate(
            userId,
            { email_verified: true },
            { new: true }
        );
    }
    async getUserById(userId: number): Promise<UserDocument> {
        return this.userModel.findById(userId);
    }
    async getUserByEmail(email: string): Promise<UserDocument> {
        return this.userModel.findOne({
            email,
        });
    }

    async getUserProfile(userId: number): Promise<UserDocument> {
        return this.userModel.findOne({
            _id: userId,
        });
    }
}

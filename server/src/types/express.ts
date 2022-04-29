import { IUserDto } from './dtosTypes';
import { Request } from 'express';

export interface MyRequest extends Request {
    user: IUserDto;
}
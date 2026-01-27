import { IsArray, IsNumber } from 'class-validator';

export class GetUsersColorsDto {
    @IsArray()
    @IsNumber({}, { each: true })
    userIds: number[];
}

import { IsInt, IsString, IsOptional, MinLength } from 'class-validator';

export class CreateTopicDto {
    @IsInt()
    userId: number;

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}

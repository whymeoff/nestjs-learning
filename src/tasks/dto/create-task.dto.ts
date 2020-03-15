import { IsNotEmpty, MinLength } from 'class-validator'

export class CreateTaskDto {
    @MinLength(2)
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
}
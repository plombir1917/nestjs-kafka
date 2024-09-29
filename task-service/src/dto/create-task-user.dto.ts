import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateUserTaskDto {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  task_id: number;
}

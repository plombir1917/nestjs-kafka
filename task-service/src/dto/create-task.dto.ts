import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;
}

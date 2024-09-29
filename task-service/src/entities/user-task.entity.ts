import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserTask {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  task_id: number;
}

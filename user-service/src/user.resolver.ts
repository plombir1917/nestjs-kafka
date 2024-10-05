import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ProducerService } from 'kafka/producer.service';
import { CreateUserTaskDto } from './dto/create-user-task.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly kafka: ProducerService,
  ) {}

  @Mutation(() => User)
  async createUser(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Query(() => User)
  async findUser(@Args('id') id: number) {
    return await this.userService.findUser(id);
  }

  @Mutation(() => User)
  async createUserTask(
    @Args('createUserTaskDto') createUserTaskDto: CreateUserTaskDto,
  ) {
    return await this.kafka.produce({
      topic: 'user_task',
      messages: [
        {
          key: 'createUserTaskDto',
          value: JSON.stringify(createUserTaskDto),
        },
      ],
    });
  }
}

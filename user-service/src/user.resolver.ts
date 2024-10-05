import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ProducerService } from 'kafka/producer.service';

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
    const res = this.kafka.produce({
      topic: 'user_task',
      messages: [{ value: id.toString() }],
    });
    return await this.userService.findUser(id);
  }
}

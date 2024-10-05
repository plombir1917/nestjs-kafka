import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserTask } from './entities/user-task.entity';
import { CreateUserTaskDto } from './dto/create-task-user.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Mutation(() => UserTask)
  async createTaskUser(
    @Args('createUserTaskDto') createUserTaskDto: CreateUserTaskDto,
  ) {
    return await this.taskService.createTaskUser(createUserTaskDto);
  }

  @Query(() => Task)
  async findTask(id: number) {
    return await this.taskService.findTask(id);
  }

  @Query(() => [UserTask])
  async findTaskUser(user_id: number) {
    return await this.taskService.findTaskUser(user_id);
  }
}

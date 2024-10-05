import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserTask } from './entities/user-task.entity';
@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  async createTask(@Args('createTaskDto') createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Query(() => Task)
  async findTask(@Args('id') id: number) {
    return await this.taskService.findTask(id);
  }

  @Query(() => [UserTask])
  async findUserTask(@Args('user_id') user_id: number) {
    return await this.taskService.findUserTask(user_id);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Task } from './entities/task.entity';
import { CreateUserTaskDto } from './dto/create-task-user.dto';
import { UserTask } from './entities/user-task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: any): Promise<Task> {
    return await this.prisma.task.create({ data: createTaskDto });
  }

  async findTask(id: number): Promise<Task> {
    return await this.prisma.task.findUniqueOrThrow({ where: { id } });
  }

  async createTaskUser(
    createUserTaskDto: CreateUserTaskDto,
  ): Promise<UserTask> {
    return await this.prisma.user_task.create({ data: createUserTaskDto });
  }

  async findTaskUser(user_id: number): Promise<UserTask[]> {
    return await this.prisma.user_task.findMany({
      where: {
        user_id: user_id,
      },
    });
  }
}

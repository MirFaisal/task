import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const createdTask = await this.tasksService.create(createTaskDto);
      return {
        message: 'Task created successfully',
        task: createdTask,
      };
    } catch {
      throw new Error('Error creating task');
    }
  }
}

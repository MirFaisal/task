import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './tasks.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  /**
   * Constructs the TasksController.
   *
   * @param tasksService - The service responsible for task management.
   */
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Creates a new task.
   *
   * @param task - The data transfer object containing task details.
   * @returns A message indicating the result of the operation.
   */
  @Post()
  async create(@Body() task: CreateTaskDto) {
    try {
      const createdTask = await this.tasksService.create(task);
      return {
        message: 'Task created successfully',
        task: createdTask,
      };
    } catch {
      return {
        message: 'Error creating task',
      };
    }
  }

  /**
   *
   * @returns A message indicating the result of the operation.
   * @throws An error if the task is not found.
   */
  @Get()
  async findAll() {
    try {
      const tasks = await this.tasksService.findAll();
      return {
        message: 'Tasks retrieved successfully',
        tasks,
      };
    } catch {
      return {
        message: 'Error retrieving tasks',
      };
    }
  }

  @Patch('position')
  async updateAll(@Body() tasks: Task[]) {
    try {
      const updatedTasks = await this.tasksService.updateAll(tasks);
      return {
        message: 'Tasks updated successfully',
        tasks: updatedTasks,
      };
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  }

  /**
   *
   * @param id - The ID of the task to delete.
   * @returns A message indicating the result of the operation.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.tasksService.remove(id);
      return {
        message: 'Task deleted successfully',
      };
    } catch {
      return {
        message: 'Error deleting task',
      };
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './tasks.dto';
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

  /**
   *
   * @param id - The ID of the task to retrieve.
   * @param task - The data transfer object containing task details.
   * @returns A message indicating the result of the operation.
   * @throws An error if the task is not found.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const task = await this.tasksService.findOne(id);
      return {
        message: 'Task retrieved successfully',
        task,
      };
    } catch {
      return {
        message: 'Error retrieving task',
      };
    }
  }

  /**
   *
   * @param id - The ID of the task to update.
   * @param task - The data transfer object containing task details.
   * @returns A message indicating the result of the operation.
   */
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: CreateTaskDto,
  ) {
    try {
      const updatedTask = await this.tasksService.update(id, task);
      return {
        message: 'Task updated successfully',
        task: updatedTask,
      };
    } catch {
      return {
        message: 'Error updating task',
      };
    }
  }

  /**
   *
   * @param id - The ID of the task to update.
   * @param order - The new order of the task.
   * @param column - The column to which the task belongs.
   * @returns A message indicating the result of the operation.
   */
  @Patch(':id/position')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body('order', ParseIntPipe) order: number,
    @Body('column') column: string,
  ) {
    try {
      const updatedTask = await this.tasksService.updatePosition(
        id,
        order,
        column,
      );
      return {
        message: 'Task position updated successfully',
        task: updatedTask,
      };
    } catch (error) {
      throw new NotFoundException(error);
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

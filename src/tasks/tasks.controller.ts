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
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

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

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const task = await this.tasksService.findOne(id);
      if (!task) {
        return {
          message: 'Task not found',
        };
      }
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
    } catch {
      return {
        message: 'Error updating task position',
      };
    }
  }

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

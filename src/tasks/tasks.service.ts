import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './tasks.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(task: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async findOne(id: number) {
    console.log('findOne', id);
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      console.log('Task not found');
      throw new Error('Task not found');
    }

    return task;
  }

  async update(id: number, task: Partial<CreateTaskDto>): Promise<Task> {
    return this.tasksRepository.save({ ...task, id });
  }

  async updatePosition(
    id: number,
    order: number,
    column: string,
  ): Promise<Task> {
    console.log('updatePosition', id, order, column);
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    task.order = order;
    task.column = column;
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

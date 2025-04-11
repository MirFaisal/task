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

  create(task: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async update(id: number, task: Partial<CreateTaskDto>): Promise<Task> {
    return this.tasksRepository.save({ ...task, id });
  }
  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

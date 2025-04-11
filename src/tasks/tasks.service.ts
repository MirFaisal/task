import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './tasks.dto';
import { Task } from './tasks.entity';

/**
 * Service responsible for managing tasks.
 * Provides methods to create, retrieve, update, and delete tasks.
 */
@Injectable()
export class TasksService {
  /**
   * Constructs the TasksService.
   */
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  /**
   * Creates a new task.
   *
   * @param task - The data transfer object containing task details.
   * @returns A promise that resolves to the created Task entity.
   */
  async create(task: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  /**
   * Retrieves all tasks.
   *
   * @returns A promise that resolves to an array of Task entities.
   */
  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  //update all task in one time
  async updateAll(tasks: Task[]): Promise<Task[]> {
    await this.tasksRepository.delete({});
    await this.tasksRepository.save(tasks);
    const updatedTasks = await this.tasksRepository.find();
    console.log(updatedTasks);
    return updatedTasks;
  }

  /**
   * Deletes a task by its ID.
   *
   * @param id - The ID of the task to delete.
   * @returns A promise that resolves when the task is deleted.
   */
  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

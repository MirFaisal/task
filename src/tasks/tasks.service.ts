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

  /**
   * Retrieves a single task by its ID.
   *
   * @param id - The ID of the task to retrieve.
   * @returns A promise that resolves to the Task entity.
   * @throws An error if the task is not found.
   */
  async findOne(id: number) {
    console.log('findOne', id);
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      console.log('Task not found');
      throw new Error('Task not found');
    }

    return task;
  }

  /**
   * Updates an existing task.
   *
   * @param id - The ID of the task to update.
   * @param task - A partial DTO containing the updated task details.
   * @returns A promise that resolves to the updated Task entity.
   */
  async update(id: number, task: Partial<CreateTaskDto>): Promise<Task> {
    return this.tasksRepository.save({ ...task, id });
  }

  /**
   * Updates the position of a task within a column.
   *
   * @param id - The ID of the task to update.
   * @param order - The new order of the task.
   * @param column - The column to which the task belongs.
   * @returns A promise that resolves to the updated Task entity.
   * @throws An error if the task is not found.
   */
  async updatePosition(
    id: number,
    order: number,
    column: string,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    task.order = order;
    task.column = column;
    return this.tasksRepository.save(task);
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

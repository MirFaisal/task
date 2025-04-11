// for create
export class CreateTaskDto {
  task: string;
  description?: string;
  status: string;
  order: number;
}
// for update
export class UpdateTaskDto {
  task?: string;
  description?: string;
  status: string;
  order: number;
}

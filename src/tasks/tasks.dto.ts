// for create
export class CreateTaskDto {
  title: string;
  description?: string;
  column: string;
  order: number;
}
// for update
export class UpdateTaskDto {
  title?: string;
  description?: string;
  column: string;
  order: number;
}

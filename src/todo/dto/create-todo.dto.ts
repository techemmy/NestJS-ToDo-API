export interface CreateTodoDto {
  id: number;
  task: string;
  state: 'completed' | 'pending';
}

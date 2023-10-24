import { IsEnum, IsString } from 'class-validator';
import { TodoState } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  task: string;

  @IsEnum(TodoState)
  state: TodoState;
}

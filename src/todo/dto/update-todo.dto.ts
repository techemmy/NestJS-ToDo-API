import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TodoState } from '../entities/todo.entity';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto implements CreateTodoDto {
  @IsOptional()
  @IsString()
  task: string;

  @IsOptional()
  @IsEnum(TodoState)
  state: TodoState;
}

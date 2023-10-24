import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: CreateTodoDto[];

  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    const savedTodo = await this.todoRepository.save(newTodo);
    return savedTodo;
  }

  getOneTodo(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id });
  }

  async updateOneTodo(id: number, todoUpdate: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update({ id }, todoUpdate);
    return this.todoRepository.findOneBy({ id });
  }

  async deleteOneTodo(id: number): Promise<Todo | null> {
    const todoToDelete = await this.todoRepository.findOneBy({ id });
    if (todoToDelete) {
      await this.todoRepository.remove(todoToDelete);
      return todoToDelete;
    }
    return null;
  }
}

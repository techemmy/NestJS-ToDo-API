import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  async createTodo(@Body() todo: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(todo);
  }

  @Get(':id')
  async getOneTodo(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    const todo = await this.todoService.getOneTodo(id);
    if (!todo) {
      throw new NotFoundException('Todo item does not exist');
    }
    return todo;
  }

  @Put(':id')
  async updateOneTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoUpdate: UpdateTodoDto,
  ) {
    const todo = await this.getOneTodo(id);
    return this.todoService.updateOneTodo(todo.id, todoUpdate);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOneTodo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Todo | null> {
    const todo = await this.getOneTodo(id);
    return this.todoService.deleteOneTodo(todo.id);
  }
}

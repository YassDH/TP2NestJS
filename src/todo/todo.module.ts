import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController, TodoControllerV2 } from './todo.controller';
import { TodoEntity } from './todo.entity';
import { TodoService, TodoServiceV2 } from './todo.service';

@Module({
  imports : [
    TypeOrmModule.forFeature(
      [TodoEntity]
      )
    ],
  controllers: [TodoController,TodoControllerV2],
  providers: [TodoService,TodoServiceV2]
})
export class TodoModule {}

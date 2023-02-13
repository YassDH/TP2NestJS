import { Controller, Get, Param, Post } from '@nestjs/common';
import { Body, Delete } from '@nestjs/common/decorators';
import { TodoService } from './todo.service';
import { TodoAddDTO } from './TodoAddDTO';
import { TodoEditDTO } from './TodoEditDTO';

@Controller('todo')
export class TodoController {
    constructor(private todoService : TodoService){}
    @Get()
    getTodos(){
        return this.todoService.findAll();
    }

    @Post('/add')
    addTodo(@Body() addData : TodoAddDTO){
        this.todoService.add(addData);
        return this.todoService.findAll();
    }
    
    @Get('/:id')
    getTodoById(@Param() params){
        return this.todoService.findById(params.id);
    }
    
    @Delete('/:id')
    deleteTodoById(@Param() params){
        return this.todoService.deleteById(params.id)
    }
    
    @Post('/:id')
    editTodoById(@Param() params,@Body() updateData : TodoEditDTO){ 
        return this.todoService.updateTodoByIndex(params.id,updateData)
    }
}

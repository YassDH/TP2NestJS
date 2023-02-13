import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoAddDTO } from './TodoAddDTO';
import { TodoEditDTO } from './TodoEditDTO';
import { TodoModel } from './TodoModel';
import { TodoStatusEnum } from './TodoStatusEnum';

@Injectable()
export class TodoService {
    constructor(@Inject('randomID') private  randomID){}
    
    private todos = [
        new TodoModel(1,"Aller au marché","Acheter du pain et du fromage",'actif'),
        new TodoModel(2,"Aller à la station de service","Faire le Plein",'done'),
        new TodoModel(3,"Todo 3","Description TODO 3",'waiting')
    ];

    add(addData : TodoAddDTO){

        if(addData.description == undefined || addData.name == undefined){
            return new BadRequestException()
        }
        
        this.todos.push(new TodoModel(this.randomID,addData.name,addData.description,'waiting'))
    }

    findAll(): TodoModel[] {
      return this.todos;
    }

    findById(id : string){
        const result = this.todos.find((e) => e.id == id)
        if(result == undefined){
            return new NotFoundException()
        }
        return result
    }

    deleteById(id : string){
        const result = this.todos.find((e) => e.id == id)
        if(result == undefined){
            return new NotFoundException()
        }
        return this.todos = this.todos.filter(e=> e.id != id)
    }

    findIndexById(id : string){
        return this.todos.findIndex((e) => e.id == id);
    }

    updateTodoByIndex(id : string , updateData : TodoEditDTO){

        if(updateData.description == undefined && updateData.name == undefined && updateData.statut == undefined ){
            return new BadRequestException()
        }

        const result = this.findIndexById(id);

        if(result == undefined){
            return new NotFoundException()
        }

        if( updateData.name != undefined){
            
            this.todos[result].name = updateData.name
        }
        if( updateData.description != undefined){
            this.todos[result].description = updateData.description
        }
        if( updateData.statut != undefined){
            this.todos[result].statut = Object.values(TodoStatusEnum)[ Object.keys(TodoStatusEnum).indexOf(updateData.statut)]
        }

        return this.findAll()

    }
}

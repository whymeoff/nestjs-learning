import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.GetTasks(filterDto)
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

        return found
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    async deleteTask(id: number) {
        const res = await this.taskRepository.delete(id)

        if (res.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }
    }

    // deleteTask(id: string) {
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
    // }

    async updateStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status
        await task.save()

        return task
    }

    // updateStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }
}

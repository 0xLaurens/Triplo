import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {TaskInterface} from "@triplo/models";
import {AuthenticationGuard} from "../guard/authentication.guard";

@UseGuards(AuthenticationGuard)
@Controller()
export class TaskController {
  constructor(private taskRepo: TaskRepository) {
  }

  @Post("/projects/:projectId/tasks")
  async createTask(
    @Param("projectId") projectId: string, @Body() task: TaskInterface
  ): Promise<TaskInterface> {
    return this.taskRepo.createTask(projectId, task)
  }

  @Put("/projects/:projectId/tasks/:taskId")
  async createSubTask(
    @Param("projectId") projectId: string, @Param("taskId") taskId: string, @Body() task: TaskInterface
  ): Promise<TaskInterface> {
    return this.taskRepo.createSubTask(projectId, taskId, task)
  }

  @Get("/projects/:projectId/tasks")
  async getTopLevelTasks(@Param("projectId") projectId: string): Promise<TaskInterface[]> {
    return this.taskRepo.getTopLevelTasks(projectId);
  }


  @Get("/tasks/:taskId")
  async getTaskById(@Param("taskId") taskId: string): Promise<TaskInterface> {
    return this.taskRepo.getTaskById(taskId)
  }

  @Get("/tasks/:taskId/subtask/:subtaskId")
  async getSubtaskById(@Param("taskId") taskId: string, @Param("subtaskId") subtaskId: string): Promise<TaskInterface> {
    return this.taskRepo.getSubtaskById(taskId, subtaskId)
  }

  @Put("/tasks/:taskId")
  async updateTask(
    @Param("taskId") taskId: string,
    @Body() changes: TaskInterface): Promise<TaskInterface> {

    return this.taskRepo.updateTask(taskId, changes)
  }

  @Delete("/tasks/:taskId")
  async deleteTask(@Param("taskId") taskId: string): Promise<TaskInterface> {
    return this.taskRepo.deleteTask(taskId)
  }


}

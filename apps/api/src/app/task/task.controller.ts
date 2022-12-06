import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {TaskInterface} from "@triplo/models";

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

  @Post("/projects/:projectId/tasks/:taskId")
  async createSubTask(
    @Param("projectId") projectId: string, @Param("taskId") taskId: string, @Body() task: TaskInterface
  ): Promise<TaskInterface> {
    return this.taskRepo.createSubTask(projectId, taskId, task)
  }

  @Get("/projects/:projectId/tasks")
  async getTopLevelTasks(@Param("projectId") projectId: string): Promise<TaskInterface[]> {
    return this.taskRepo.getTopLevelTasks(projectId);
  }

  @Get("/tasks/:taskId/replies")
  async getTaskReplies(@Param("taskId") taskId: string): Promise<TaskInterface[]> {
    return this.taskRepo.getTaskReplies(taskId)
  }

  @Get("/tasks/:taskId")
  async getTaskById(@Param("taskId") taskId: string): Promise<TaskInterface> {
    return this.taskRepo.getTaskById(taskId)
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

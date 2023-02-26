import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {TaskRepository} from "./task.repository";
import {SubtaskInterface, TaskInterface} from "@triplo/models";
import {AuthenticationGuard} from "../guard/authentication.guard";

// @UseGuards(AuthenticationGuard)
@Controller()
export class TaskController {
  constructor(private taskRepo: TaskRepository) {
  }

  @Get("/projects/:projectId/tasks")
  async getTasksByProjectId(@Param("projectId") projectId: string): Promise<TaskInterface[]> {
    return this.taskRepo.getTasksByProjectId(projectId);
  }

  @Get("/tasks/:taskId")
  async getTaskById(@Param("taskId") taskId: string): Promise<TaskInterface> {
    return this.taskRepo.getTaskById(taskId)
  }

  @Post("/projects/:projectId/tasks")
  async createTask(
    @Param("projectId") projectId: string, @Body() task: TaskInterface
  ): Promise<TaskInterface> {
    return this.taskRepo.createTask(projectId, task)
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


  @Get("/tasks/:taskId/subtask/:subtaskId")
  getSubtaskById(@Param("taskId") taskId: string, @Param("subtaskId") subtaskId: string): Promise<TaskInterface> {
    return this.taskRepo.getSubtaskById(taskId, subtaskId)
  }


  @Post("/tasks/:taskId/subtask/")
  async createSubtask(
    @Param("taskId") taskId: string, @Body() task: TaskInterface
  ): Promise<TaskInterface> {
    return this.taskRepo.createSubtask(taskId, task)
  }

  @Put("/tasks/:taskId/subtask/:subtaskId")
  async updateSubtask(
    @Param("taskId") taskId: string, @Param("subtaskId") subtaskId: string, @Body() task: TaskInterface
  ): Promise<TaskInterface> {
    return this.taskRepo.updateSubtask(taskId, subtaskId, task)
  }

  @Delete("/tasks/:taskId/subtask/:subtaskId")
  async deleteSubtask(
    @Param("taskId") taskId: string, @Param("subtaskId") subtaskId: string): Promise<TaskInterface> {
    return this.taskRepo.deleteSubtask(taskId, subtaskId)
  }
}

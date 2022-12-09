import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {TaskInterface} from "@triplo/models";
import {Model} from "mongoose";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel('Task') private taskModel: Model<TaskInterface>,
    @InjectModel('Subtask') private subtaskModel: Model<TaskInterface>
  ) {
  }

  async getTopLevelTasks(projectId: string): Promise<TaskInterface[]> {
    return this.taskModel.find({project: projectId, parent: null});
  }

  async updateTask(taskId: string, task: Partial<TaskInterface>): Promise<TaskInterface> {
    return this.taskModel.findByIdAndUpdate(taskId, task, {new: true})
  }

  async getTaskById(taskId: string): Promise<TaskInterface> {
    return this.taskModel.findById(taskId)
  }

  async deleteTask(taskId: string): Promise<TaskInterface> {
    return this.taskModel.findByIdAndDelete(taskId)
  }

  async createTask(projectId: string, task: Partial<TaskInterface>): Promise<TaskInterface> {
    task.project = projectId
    return this.taskModel.create(task)
  }

  async createSubTask(projectId: string, taskId: string, task: TaskInterface): Promise<TaskInterface> {
    task.project = projectId
    return this.taskModel.findByIdAndUpdate(taskId, {$push: {subtasks: {...task}}});
  }

  async getSubtaskById(taskId: string, subtaskId: string): Promise<TaskInterface> {
    return this.taskModel.findById(taskId)
  }
}

import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {TaskInterface} from "@triplo/models";
import {Model} from "mongoose";

@Injectable()
export class TaskRepository {
  constructor(@InjectModel('Task') private taskModel: Model<TaskInterface>) {
  }

  async getTopLevelTasks(projectId: string): Promise<TaskInterface[]> {
    return this.taskModel.find({project: projectId, parent: null});
  }

  async getTaskReplies(taskId: string) {
    return this.taskModel.find({parent: taskId});
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

  async createSubTask(projectId: string, taskId: string, task: TaskInterface) {
    return this.createTask(projectId, task);
  }

}

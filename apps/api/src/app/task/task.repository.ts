import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {SubtaskInterface, TaskInterface} from "@triplo/models";
import {Model} from "mongoose";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel('Task') private taskModel: Model<TaskInterface>,
    @InjectModel('Subtask') private subtaskModel: Model<TaskInterface>
  ) {
  }

  async getTasksByProjectId(projectId: string): Promise<TaskInterface[]> {
    return this.taskModel.find({project: projectId});
  }

  async getTaskById(taskId: string): Promise<TaskInterface> {
    return this.taskModel.findById(taskId)
  }

  async createTask(projectId: string, task: Partial<TaskInterface>): Promise<TaskInterface> {
    task.project = projectId
    return this.taskModel.create(task)
  }

  async updateTask(taskId: string, task: Partial<TaskInterface>): Promise<TaskInterface> {
    return this.taskModel.findByIdAndUpdate(taskId, task, {new: true})
  }

  async deleteTask(taskId: string): Promise<TaskInterface> {
    return this.taskModel.findByIdAndDelete(taskId)
  }

  async createSubtask(taskId: string, task: SubtaskInterface): Promise<TaskInterface> {
    return this.taskModel.findByIdAndUpdate(taskId, {$addToSet: {subtasks: {...task}}});
  }

  async updateSubtask(taskId: string, subtaskId: string, task: SubtaskInterface): Promise<TaskInterface> {
    return this.taskModel.findOneAndUpdate({
      _id: taskId,
      "subtasks._id": subtaskId
    }, {$set: {"subtasks.$": task}}, {new: true, upsert: true});
  }

  async deleteSubtask(taskId: string, subtaskId: string): Promise<TaskInterface> {
    return this.taskModel.findByIdAndUpdate(taskId, {$pull: {subtasks: {_id: subtaskId}}});
  }
}

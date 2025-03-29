// Response types
export interface BaseResponse {
  status: number
  msg: string
  error?: string
}

export interface Task {
  id: number
  title: string
  content: string
  status: 0 | 1 // 0 未完成，1已完成
  created_at: number
  start_time: number
  end_time: number
  view: number
}

export interface User {
  id: number
  user_name: string
  status: string
  create_at: number
}

export interface TaskResponse extends BaseResponse {
  data: Task
}

export interface TaskListResponse extends BaseResponse {
  data: {
    item: Task[]
    total: number
  }
}

export interface UserResponse extends BaseResponse {
  data: User
}

// Request types
export interface CreateTaskRequest {
  title: string
  content?: string
  status?: number
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
  id: number
}

export interface ListTasksRequest {
  start?: number
  limit?: number
}

export interface UserAuthRequest {
  user_name: string
  password: string
}
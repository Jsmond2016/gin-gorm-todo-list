import type {
  CreateTaskRequest,
  ListTasksRequest,
  UpdateTaskRequest,
  UserAuthRequest,
  TaskResponse,
  TaskListResponse,
  UserResponse,
} from "../types/api";
import axios from 'axios';

const baseURL = '/api/v1';

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 30001 未登录
    if (error.response?.data?.status === 30001) {
      // 跳转页面至登录页
      setTimeout(() => {
        // 清除 token
        localStorage.removeItem('token');
        // 跳转页面至登录页
        window.location.href = '/login';
      }, 1000);
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Task APIs
export const createTask = async (data: CreateTaskRequest): Promise<TaskResponse> => {
  return instance.post('/task_create', data);
};

export const updateTask = async (data: UpdateTaskRequest): Promise<TaskResponse> => {
  return instance.post('/task_update', data);
};

export const deleteTask = async (id: number): Promise<TaskResponse> => {
  return instance.post('/task_delete', { id });
};

export const getTask = async (id: number): Promise<TaskResponse> => {
  return instance.get('/task_show', { params: { id } });
};

export const listTasks = async (params: ListTasksRequest): Promise<TaskListResponse> => {
  return instance.get('/task_list', { params });
};

// User APIs
export const login = async (data: UserAuthRequest): Promise<UserResponse> => {
  const response = await instance.post('/user/login', data);
  console.log('response', response)
  if (response.data?.token) {
    console.log('response.data.token', response.data.token)
    localStorage.setItem('token', response.data.token);
  }
  // 跳转页面至首页
  // window.location.href = '/';
  return response as any;
};

export const register = async (data: UserAuthRequest): Promise<UserResponse> => {
  return instance.post('/user/register', data);
};

export const getUserInfo = async (): Promise<UserResponse> => {
  return instance.get('/user/info');
};


export const taskSearch = async (data: any): Promise<TaskListResponse> => {
  return instance.post('/task_search', data);
};

// task_delete
export const taskDelete = async (id: number): Promise<TaskResponse> => {
  return instance.post('/task_delete', { id });
};
import { useEffect, useState } from "react";
import { Table, Button, Input, Space, message, Modal, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { Task } from "../types/api";
import { listTasks, taskSearch, taskDelete } from "@services/api";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  console.log("tasks", tasks);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await listTasks({});
      if (res.status === 200) {
        setTasks(res.data.item);
      }
    } catch (error: any) {
      message.error(error?.msg || "获取任务列表失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      await fetchTasks();
      return;
    }

    try {
      setLoading(true);
      const res = await taskSearch(searchValue);
      if (res.status === 200) {
        setTasks(res.data.item);
      }
    } catch (error: any) {
      message.error(error?.msg || "搜索失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个任务吗？",
      onOk: async () => {
        try {
          const res = await taskDelete(id);
          if (res.status === 200) {
            message.success("删除成功");
            await fetchTasks();
          }
        } catch (error: any) {
          message.error(error?.msg || "删除失败");
        }
      },
    });
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={status === 1 ? "green" : "gold"}>
          {status === 1 ? "已完成" : "待办"}
        </Tag>
      ),
    },
    {
      title: "浏览量",
      dataIndex: "view",
      key: "view",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/task/${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <Space>
          <Input
            placeholder="搜索任务"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined />}
          />
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        <Button type="primary" onClick={() => navigate("/task/new")}>
          新建任务
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default TaskList;

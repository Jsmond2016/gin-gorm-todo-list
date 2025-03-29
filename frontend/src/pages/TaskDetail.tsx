import { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Radio } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getTask, createTask, updateTask } from "@services/api";
import type { CreateTaskRequest, Task, UpdateTaskRequest } from "../types/api";

const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEdit = id !== "new";

  useEffect(() => {
    if (isEdit) {
      fetchTaskDetail();
    }
  }, [id]);

  const fetchTaskDetail = async () => {
    try {
      setLoading(true);
      const res = await getTask(Number(id));
      if (res.status === 200) {
        form.setFieldsValue(res.data);
      }
    } catch (error: any) {
      message.error(error?.msg || "获取任务详情失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Partial<Task>) => {
    try {
      setLoading(true);
      let res;
      if (isEdit) {
        res = await updateTask({
          ...values,
          id: Number(id),
        } as UpdateTaskRequest);
      } else {
        res = await createTask(values as CreateTaskRequest);
      }

      if (res.status === 200) {
        message.success(`${isEdit ? "更新" : "创建"}成功`);
        navigate("/tasks");
      }
    } catch (error: any) {
      message.error(error?.msg || `${isEdit ? "更新" : "创建"}失败`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={isEdit ? "编辑任务" : "创建任务"}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ status: 0 }}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input placeholder="请输入任务标题" />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: "请输入内容" }]}
        >
          <Input.TextArea rows={4} placeholder="请输入任务内容" />
        </Form.Item>

        <Form.Item label="状态" name="status">
          <Radio.Group>
            <Radio value={0}>待办</Radio>
            <Radio value={1}>已完成</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end gap-4">
            <Button onClick={() => navigate("/tasks")}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? "更新" : "创建"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskDetail;

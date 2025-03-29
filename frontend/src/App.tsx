import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import TaskList from "@pages/TaskList";
import TaskDetail from "@pages/TaskDetail";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Layout from "@components/Layout";
import { useLocalStorageState, useMount } from "ahooks";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");

  useMount(() => {
    const token = localStorage.getItem("token");
    setToken(token || "");
  });
  if (!token) {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="*" element={<Navigate to="/tasks" replace />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

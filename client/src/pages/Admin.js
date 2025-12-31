import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import Layout from "../components/Layouts/Layout";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [resetting, setResetting] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const res = await axios.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to fetch users";
      message.error(errorMsg);
    }
    setLoadingUsers(false);
  };

  const fetchTransactions = async () => {
    setLoadingTransactions(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const res = await axios.get("/admin/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data.transactions);
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to fetch transactions";
      message.error(errorMsg);
    }
    setLoadingTransactions(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchTransactions();
  }, []);

  const resetData = async () => {
    setResetting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      await axios.post(
        "/admin/reset",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("All transactions deleted");
      fetchTransactions();
    } catch (error) {
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to reset data";
      message.error(errorMsg);
    }
    setResetting(false);
  };

  const userColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];

  const transactionColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Reference", dataIndex: "reference", key: "reference" },
  ];

  return (
    <Layout>
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>
        <Button
          type="primary"
          danger
          onClick={resetData}
          loading={resetting}
          style={{ marginBottom: 16 }}
        >
          Reset All Transactions
        </Button>
        <h2>Users</h2>
        <Table
          dataSource={users}
          columns={userColumns}
          rowKey="_id"
          loading={loadingUsers}
        />
        <h2>Transactions</h2>
        <Table
          dataSource={transactions}
          columns={transactionColumns}
          rowKey="_id"
          loading={loadingTransactions}
        />
      </div>
    </Layout>
  );
};

export default Admin;

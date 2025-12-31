import React, { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Input,
  Button,
  Select,
  message,
  Table,
  DatePicker,
} from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")} </span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //get all transactions
  useEffect(() => {
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        setloading(true);
        const res = await axios.post("/transection/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
        });
        setloading(false);
        setAllTransection(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue with Transaction");
      }
    };
    getAllTransections();
  }, [frequency, selectedDate]);

  //deletehandler
  const handleDelete = async (record) => {
    try {
      setloading(true);
      await axios.post("/transection/delete-transection", {
        transactionId: record._id,
      });
      setloading(false);
      message.success("Transaction Deleted!!");
    } catch (error) {
      setloading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };

  //form handling
  const handelsubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      if (editable) {
        await axios.post("/transection/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: editable._id,
        });
        setloading(false);
        message.success("Transaction updated Successfully");
      } else {
        await axios.post("/transection/add-transection", {
          ...values,
          userid: user._id,
        });
        setloading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setloading(false);
      message.error("Failed to add transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6> Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => {
                setSelectedate(values);
              }}
            />
          )}
        </div>
        <div className="buttons">
          <div className="switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>

      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handelsubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="others">others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {""}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Transactions;

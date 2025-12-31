import React from "react";
import { Typography, Row, Col, Card } from "antd";
import Layout from "../components/Layouts/Layout";

const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <Layout>
      <div style={{ padding: "3rem", maxWidth: 900, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
          About Expense Tracker
        </Title>
        <Paragraph
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          This Expense Tracker application helps you manage your income and
          expenses efficiently. You can add, edit, and delete transactions, view
          analytics, and keep track of your financial health.
        </Paragraph>
        <Paragraph
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
          }}
        >
          The app is built with React on the frontend and Node.js/Express on the
          backend, using MongoDB for data storage.
        </Paragraph>
        <Paragraph
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.6",
            marginBottom: "3rem",
          }}
        >
          Admin users have additional privileges to manage users and
          transactions.
        </Paragraph>
        {/* <Row gutter={16} justify="center">
          <Col xs={24} sm={12}>
            <Card title="Features" bordered={false} style={{ marginBottom: '1rem' }}>
              <ul>
                <li>Track income and expenses</li>
                <li>Add, edit, and delete transactions</li>
                <li>View analytics and reports</li>
                <li>Secure user authentication</li>
                <li>Admin dashboard for user and transaction management</li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card title="Technology Stack" bordered={false} style={{ marginBottom: '1rem' }}>
              <ul>
                <li>React with Ant Design for frontend</li>
                <li>Node.js and Express for backend</li>
                <li>MongoDB for database</li>
                <li>JWT for authentication and authorization</li>
                <li>Axios for API requests</li>
              </ul>
            </Card>
          </Col>
        </Row> */}
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginTop: "3rem" }}
        >
          &copy; 2024 Expense Tracker. All rights reserved.
        </Text>
      </div>
    </Layout>
  );
};

export default About;

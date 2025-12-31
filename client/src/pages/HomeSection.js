import React from 'react';
import Layout from '../components/Layouts/Layout';
import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomeSection = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#f0f2f5', minHeight: '80vh' }}>
        <Title level={1} style={{ color: '#1890ff' }}>
          Welcome to Expense Tracker
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', maxWidth: 600, margin: '1rem auto' }}>
          Track your income and expenses effortlessly. Stay on top of your finances with insightful analytics and easy transaction management.
        </Paragraph>
        <Button type="primary" size="large" onClick={() => navigate('/transactions')}>
          View Transactions
        </Button>
      </div>
    </Layout>
  );
};

export default HomeSection;

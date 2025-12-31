import React,{useState,useEffect} from 'react'
import {Form, Input, message} from 'antd'
import Spinner from '../components/Spinner'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();
    const [Loading, setLoading] =useState(false)
    //Formsubmit
    const submitHandler = async (values) =>{
        try {
            setLoading(true)
            await axios.post('/users/register',values)
            message.success('Sign-in Successfull')
            setLoading(false)
            navigate('/login')
        } catch (error) {
            setLoading(false)
            message.error('Something went wrong');
        }
    };

// Prevent for Login user
useEffect(() =>{
    if(localStorage.getItem('user')){
        navigate('/')
    }
},[navigate]);

return (
    <>
    <img src="/download.jpeg" className="expenses"></img> 
    <div className='register-page'>
        {Loading && <Spinner />}
        <Form className='forms' layout='vertical'onFinish={submitHandler}>
            <h1>Sign-Up</h1>
            <Form.Item label="Full-Name" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email'/>
            </Form.Item>
            <Form.Item label="Phone number" name="number">
                <Input type='number'/>
            </Form.Item>
            <Form.Item label="password" name="password">
                <Input type='password'/>
            </Form.Item>
            <div className='login d-flex justify-content-between'>
                <button className='btn btn-primary'>Sign-up</button><hr></hr>
                <Link to="/login">Already Register? click Here to login</Link>
            </div>
        </Form>
    </div>
    </>
    )
}

export default Register
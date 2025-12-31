import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = ({ redirectTo }) => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  //Formsubmit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success(" login Success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, Password: "" })
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(redirectTo || "/");
      }
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  //Prevent login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <img
        src={process.env.PUBLIC_URL + "/download.jpeg"}
        className="expenses"
      ></img>
      <div className="register-page">
        {Loading && <Spinner />}
        <Form className="forms" layout="vertical" onFinish={submitHandler}>
          <h1>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          {/* <Form.Item label="Phone-number" name="phone">
                        <Input type='phone'/>
                    </Form.Item> */}
          <Form.Item label="password" name="password">
            <Input type="password" />
          </Form.Item>
          <div className="login d-flex justify-content-between">
            <button className="btn btn-primary">Login</button>
            <hr></hr>
            <Link to="/register">Not a user? click Here to Sign-up</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;

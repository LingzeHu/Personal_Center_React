import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Tabs, Form, Checkbox, Row } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, MobileOutlined, WeiboOutlined, TaobaoOutlined, AlipayOutlined} from "@ant-design/icons";
import styles from "./index.module.less";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";

const { TabPane } = Tabs;
const Login = () => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <Form form={form} onFinish={handleFinish}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Account Login" key="1">
              <InputItem
                name="username"
                prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                placeholder="Username"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input the Username",
                  },
                ]}
              />
              <InputItem
                name="password"
                prefix={<LockOutlined style={{ color: "#1890ff" }} />}
                placeholder="Password"
                size="large"
                type="password"
                rules={[
                  {
                    required: true,
                    message: "Please input the Password",
                  },
                ]}
              />
            </TabPane>

            <TabPane tab="Mobile Login" key="2">
              <InputItem
                name="mobile"
                prefix={<MobileOutlined style={{ color: "#1890ff" }} />}
                placeholder="Mobile Phone"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input the Mobile",
                  },
                ]}
              />
              <InputItem
                name="captcha"
                prefix={<MailOutlined style={{ color: "#1890ff" }} />}
                placeholder="Captcha"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input the Captcha",
                  },
                ]}
              />
            </TabPane>
          </Tabs>
          <Row justify='space-between'>
            <Checkbox
              checked={autoLogin}
              onChange={(e) => setAutoLogin(e.target.checked)}
            >
              Auto Login
            </Checkbox>

            <a href="#!"> Forgot Password </a>
          </Row>
          <SubmitButton>Login</SubmitButton>
        </Form>
        <div className={styles.other}>
          Other Login Method
          <AlipayOutlined className={styles.icon} />
          <TaobaoOutlined className={styles.icon} />
          <WeiboOutlined  className={styles.icon} />
          <Link className={styles.register} to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

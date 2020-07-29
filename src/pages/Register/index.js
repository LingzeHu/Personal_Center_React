import React, { useState } from "react";
import InputItem from "../../components/InputItem";
import SubmitButton from "../../components/SubmitButton";
import styles from "./index.module.less";
import { Form, Popover, Progress, Row, Select, Col } from "antd";
import {Link} from 'react-router-dom';
import { useDispatch } from 'redux-react-hook';
import { getCaptcha, register } from '../../actions/account';



const {Option} = Select;
const passwordStatusMap = {
  ok: <div className={styles.success}>Level: Strong</div>,
  pass: <div className={styles.warning}>Level: Medium</div>,
  poor: <div className={styles.error}>Level: Weak</div>,
};

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

const Register = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [popover, setPopover] = useState(false);
  const [form] = Form.useForm();
  const [prefix, setPrefix] = useState('86');
  const checkConfirm = (_, value) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue("password")) {
      return promise.reject("The passwords are not matched");
    }
    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise;
    if (!value) {
      setVisible(!!value);
      return promise.reject("Please input the password");
    }

    if (!visible) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value && form.getFieldValue("confirm")) {
      // using preious wriiten validator checkConfirm
      form.validateFields(["confirm"]);
    }

    return promise.resolve();
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue("password");
    if (value && value.length > 9) {
      return "ok";
    }
    if (value && value.length > 5) {
      return "pass";
    }

    return "poor";
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue("password");
    const passwordStatus = getPasswordStatus();
    return (
      value &&
      value.length && (
        <div className={styles[`progress-${passwordStatus}`]}>
          <Progress
          className={styles.progress}
          status={passwordProgressMap[passwordStatus]}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
            showInfo={false}
          />
        </div>
      )
    );
  };

  const handleClickCaptcha = () => {
    form.validateFields(['username', 'email', 'password'])
      .then(() => {
        dispatch(getCaptcha(form.getFieldsValue(['username', 'email', 'password'])));
      })
  }

  const handleFinish = (values) => {
    dispatch(register(values));
  };
  return (
    <div className={styles.registerContainer}>
      <div className={styles.register}>
        <Form form={form} onFinish={handleFinish}>
          <InputItem
            name="username"
            placeholder="Username"
            size="large"
            rules={[
              {
                required: true,
                message: "Please input the username",
              },
            ]}
          />
          
          <InputItem
            name="email"
            placeholder="EMail"
            size="large"
            rules={[
              {
                required: true,
                message: "Please input the email",
              },
              {
                type: "email",
                message: "Please check the format of email",
              },
            ]}
          />
          <Popover
            content={
              visible && (
                <div>
                    {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div>Please input at least 6 digits</div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <InputItem
              name="password"
              placeholder="Password, At least 6 digits"
              size="large"
              rules={[
                {
                  validator: checkPassword,
                },
              ]}
            />
          </Popover>
          <InputItem
            name="confirm"
            placeholder="Confirm the password"
            size="large"
            rules={[
              {
                required: true,
                message: "Please input the Confirmed Password",
              },
              {
                validator: checkConfirm,
              },
            ]}
          />
          <Row>
              <Col span={6}>
              <Select
                    size='large'
                    value={prefix}
                    onChange={(value) => setPrefix(value)}
                    style={{width: '100%'}}
                >
                    <Option value='86'>+86</Option>
                    <Option value='87'>+87</Option>
                </Select>
              </Col>
                
              <Col span={18}>
              <InputItem
                name="mobile"
                placeholder="Mobile Phone"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input the Mobile",
                  },
                  {
                      pattern: /^\d{11}$/,
                      message: "Please check the format of mobile phone"
                  }
                ]}
              />
              </Col>
          </Row>

          <InputItem
                name="captcha"
                placeholder="Captcha"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Please input the Captcha",
                  },
                ]}
                onClick={handleClickCaptcha}
              />

         <Row justify='space-between' align='middle' >
            <Col span={8}>
            <SubmitButton >Register</SubmitButton>
            </Col>
            <Col span={16}>
                <Link className={styles.login} to='/login'>
                    Using Existing Account
                </Link>
            </Col>

         </Row>
          
        </Form>
      </div>
    </div>
  );
};

export default Register;

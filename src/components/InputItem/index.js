import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col } from "antd";
// import { getCaptcha} from '../../actions/register';
import styles from "./index.module.less";

const InputItem = React.forwardRef( (props, ref) => {
  // const dispatch = useDispatch();
  const { name, rules, onClick, ...rest } = props;
  const [timing, setTiming] = useState(false); // Whether in countdown
  const [count, setCount] = useState(props.countDown || 10); // Countdown seconds
  const handleClickCaptcha = () => {
    onClick();
    setTiming(true);
  };

  // countdown timer
  useEffect(()=>{
    if(timing) {
      let interval = 0;
      interval = setInterval(() => {
        setCount((preSecond)=> {
          if(preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            return props.countDown || 10;
          }
          return preSecond -1;
        })
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timing, props.countDown]);


  if (name === "captcha") {
    return (
      <Form.Item name={name} rules={rules}>
        <Row gutter={8}>
          <Col span={16}>
            <Input {...rest} />
          </Col>
          <Col span={8}>
            <Button
              className={styles.getCaptcha}
              disabled={timing}
              size="large"
              onClick={handleClickCaptcha}
            >
              {timing ? `${count} seconds` : "Send Captcha"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }

  return (
    <Form.Item  name={name} rules={rules}>
      <Input ref={ref} {...rest} />
    </Form.Item>
  );
});

export default InputItem;

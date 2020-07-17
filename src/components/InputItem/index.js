import React, { useState, useEffect } from "react";
import { Input, Form, Button, Row, Col, message } from "antd";
import styles from "./index.module.less";

const InputItem = React.forwardRef( (props, ref) => {
  const { name, rules, ...rest } = props;
  const [timing, setTiming] = useState(false); // Whether in countdown
  const [count, setCount] = useState(props.countDown || 60); // Countdown seconds
  const handleClickCaptcha = () => {
    message.success("Successfully sent captcha 1234");
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
            return props.countDown || 60;
          }
          return preSecond -1;
        })
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timing, props.countDown]);

  // useEffect(() => {
  //   let interval = 0;
  //   // if timing from false to true, begin count down
  //   if (timing) {
  //     interval = setInterval(() => {
  //       // for each second, count will minus one
  //       setCount((preSecond) => {
  //         // The last one second, countdown finish
  //         if (preSecond <= 1) {
  //           setTiming(false);
  //           clearInterval(interval);
  //           return props.countDown || 60;
  //         }
  //         return preSecond - 1;
  //       });
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [timing]);

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

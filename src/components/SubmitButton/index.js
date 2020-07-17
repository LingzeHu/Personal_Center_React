import React from 'react';
import {  Button, Form } from 'antd';
import styles from './index.module.less';

const SubmitButton = (props) => {
    const { children } = props;
    return (
        <Form.Item>
            <Button 
                type='primary' 
                size='large' 
                htmlType='submit'
                className={styles.submit}
            >
                {children}
            </Button>
        </Form.Item>
    );
};

export default SubmitButton;

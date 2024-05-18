import React from "react";
import { Input, Form } from "antd";
const MyInput = ({ name, message, placeholder , classAdd , defaultValue }) => {
 
  return (
    <>
      <Form.Item
        className={`${classAdd}`}
        initialValue={defaultValue}
        name={name}
        rules={[
          {
            required: true,
            message: { message },
          },
        ]}
      >
        <Input  placeholder={placeholder} />
      </Form.Item>
    </>
  );
};

export default MyInput;

import React, { useState } from "react";
import axios from "axios";

import {
    Form,
    Input,
    Button,
    DatePicker,
    Checkbox,
    Row,
    Col
  } from 'antd';

export const Add = () => {
    const [bool, setBool] = useState(false);
    const [date, setDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [check, setCheck] = useState(false);

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
        
    };

    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    };


    const onChangeDate = (event) => {
        setDate(event.target.value);
        
    };

    const postEntry =  async(id) => {

        setCheck(true);

        await axios.post(
            `http://localhost:4000/All`,
            {
                "last_name": lastName,
                "first_name": firstName,
                "is_active": bool,
                "date_of_birth": date
        })
        setFirstName("");
        setLastName("");
        setBool(false);
        setDate(new Date());
        
    }


    return (
        <div>
            <Form
                labelCol={{ span: 3 }}
                wrapper Col={{ span: 5 }}
                layout="horizontal"
                size="middle"
            >

                <br/>
                <Form.Item label="First Name: ">
                    <Input
                        type="text"
                        value={firstName}
                        onChange={onChangeFirstName}
                        allowClear={true}
                        style={{ width: '20%' }}
                    />            
                </Form.Item>
                <Form.Item label="Last Name: ">
                    <Input
                        type="text"
                        value={lastName}
                        onChange={onChangeLastName}
                        allowClear={true}
                        style={{ width: '20%' }}

                    />              
                </Form.Item>
                <Form.Item label="Is Active: ">
                    <Checkbox
                        checked={bool}
                        onChange={() => setBool(!bool)}/>
                </Form.Item> 
                <Form.Item label="DatePicker">
                <DatePicker 
                    onChange={setDate}
                />
                </Form.Item>
                <br/>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" onClick={() => postEntry()}>Add Employee</Button>
                </Form.Item>

            </Form>

            <div> 
                <Row>
                    <Col span={17} offset={2}>
                    {check === false ?
                        null
                            : 
                        <h1>Added Employee!</h1>
                    }   
                    </Col>

                </Row>

            </div>
        </div>

    );
}
export default Add
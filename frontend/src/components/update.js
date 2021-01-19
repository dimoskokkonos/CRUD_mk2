import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Divider, Checkbox, Button, Layout, Form, Input, DatePicker } from "antd";
import moment from 'moment';

export const Update = () => {
    const [entry, setEntry] = useState([]);
    const [bool, setBool] = useState(false);
    const [date, setDate] = useState(new Date());
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [editBool, setEditBool] = useState(false);
    const [ID, setID] = useState([]);

    const fetchEntries =  async() => {

        const { status, data } = await axios.get(
            `http://localhost:4000/All`
        );
        if (status === 200) {
            setEntry(data);
        }
    }

    const initialEntryState = {
        "id": null,
        "last_name": "",
        "first_name": "",
        "is_online": false,
        "date": null
      };
      const [entryNew, setEntryNew] = useState(initialEntryState);

      const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
      };

      const onChangeLastName = (event) => {
        setLastName(event.target.value);
      };
      const onChangeDate = (event) => {
        setDate(event.target.value);
        
    };

    const handleEdit =(entry_) => {
        setEditBool(true);
        setID(entry_.id);
        setEntryNew(entry_);
        setFirstName(entry_.first_name);
        setLastName(entry_.last_name);
        setBool(entry_.is_active);
        setDate(moment(entry_.date_of_birth));
    }
    const updateEntry =  async(id) => {
        const { status, data } = await axios.put(
            `http://localhost:4000/All/${id}`,
            {
                "last_name": lastName,
                "first_name": firstName,
                "is_active": bool,
                "date_of_birth": date
              }
        );
        fetchEntries();
        setEditBool(false);        
    }

        useEffect(() => {
            fetchEntries();
          }, []);

        return (

        <div>
            <Row>
                <Col span={15}>
                    <div>

                        <Row>
                            <Col><h1> </h1></Col>
                        </Row>
                        <Row>
                            <Col span={1}><h1> </h1></Col>
                            <Col span={2}>
                                <h3>Index</h3>
                            </Col>
                            <Col span={2}>
                                <h3>Id</h3>


                            </Col>               
                            <Col span={5}>
                                <h3>First Name</h3>


                            </Col>                 
                            <Col span={5}>
                                <h3>Last Name</h3>

                            </Col>
                            <Col span={5}>
                                <h3>Birthday</h3>
                            </Col>
                            <Col span={2}>
                                <h3>Active</h3>
                            </Col>
                        </Row>
                        <Divider/>

                        {entry.map((entries, index) => (
                            <Row>
                                <Col span={1}><h1> </h1></Col>

                                <Col span={2}>
                                    {index+1}
                                </Col>
                                <Col span={2}>
                                    {entries.id}
                                </Col>               
                                <Col span={5}>
                                    {entries.first_name}
                                </Col>                 
                                <Col span={5}>
                                    {entries.last_name}
                                </Col>
                                <Col span={5}>
                                    {entries.date_of_birth}
                                </Col>
                                <Col span={2}>
                                    <Checkbox checked={entries.is_active}/>
                                </Col>

                                <Button type="primary" onClick={() => handleEdit(entries)}>Edit</Button>
                                <Divider/>
                            </Row>

                        ))}



                    </div> 
                </Col>
                <Col span={2}><h1> </h1></Col>
                <Col span={6}>
                    {editBool === false ?
                        null
                        : 

                        <Form
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
                            style={{ width: '100%' }}
                        />            
                        </Form.Item>
                        <Form.Item label="Last Name: ">
                        <Input
                            type="text"
                            value={lastName}
                            onChange={onChangeLastName}
                            allowClear={true}
                            style={{ width: '100%' }}
                        />              
                        </Form.Item>
                        <Form.Item label="Is Active: ">
                        <Checkbox
                            checked={bool}
                            onChange={() => setBool(!bool)}
                        />
                        </Form.Item> 
                        <Form.Item label="Birthday: ">
                        <DatePicker 
                            value={date}
                            onChange={setDate}
                        />
                        </Form.Item>
                        <br/>
                        <Form.Item label=" " colon={false}>
                        <Button type="primary" 
                            onClick={() => updateEntry(ID)}>Submit</Button>
                        </Form.Item>
                        </Form>
                    }

                </Col>
            </Row>
        </div> 
            
        );
    }
    export default Update
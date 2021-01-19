import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Divider, Checkbox } from 'antd';

export const ShowAll = () => {
    const [entry, setEntry] = useState([]);

    const fetchEntries =  async() => {
        const { status, data } = await axios.get(
            `http://localhost:4000/All`
        );
        if (status === 200) {
            setEntry(data);
        }
    }
        
    const delEntry =  async(id) => {
        const { status, data } = await axios.delete(
            `http://localhost:4000/All/${id}`
        );
        fetchEntries();
    }

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div>

                <Row>
                    <Col><h1> </h1></Col>
                </Row>
                <Row>
                <Col span={1} offset={1}>
                            <h3>Index</h3>
                        </Col>
                        <Col span={1}>
                            <h3>Id</h3>

                            
                        </Col>               
                        <Col span={3}>
                            <h3>First Name</h3>

                            
                        </Col>                 
                        <Col span={3}>
                            <h3>Last Name</h3>

                        </Col>
                        <Col span={4}>
                            <h3>Birthday</h3>
                        </Col>
                        <Col span={1}>
                            <h3>Active</h3>
                        </Col>
                </Row>
                <Divider/>

                {entry.map((entries, index) => (
                    <Row>
                        <Col span={1} offset={1}>
                            {index+1}
                        </Col>
                        <Col span={1}>
                            {entries.id}
                        </Col>               
                        <Col span={3}>
                            {entries.first_name}
                        </Col>                 
                        <Col span={3}>
                            {entries.last_name}
                        </Col>
                        <Col span={4}>

                            {entries.date_of_birth}
                        </Col>
                        <Col span={1}>
                            <Checkbox checked={entries.is_active}/>
                        </Col>
                        <Button type="primary" danger onClick={() => delEntry(entries.id)}>Delete</Button>
                        <Divider/>

                    </Row>

                ))}  

        </div>
    );
}
export default ShowAll
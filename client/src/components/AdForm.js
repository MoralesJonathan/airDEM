import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Container, Form, Row, Col, Alert } from "react-bootstrap";

function AdForm() {
    const [campaigns, setCampaigns] = useState([{ name: "Create new Campaign", date: '', markup: '' }]);
    const [error, setError] = useState(false);
    useEffect(() => {
        API.getCampaigns().then((res) => {
            setCampaigns(campaigns.concat(res));
        })
            .catch((error) => {
                console.log(error, campaigns);
                setError(true);
            })
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    {error ? <Alert dismissible variant="danger">There was an error loading your Campaigns</Alert> : null}
                    <Form>
                        <Form.Group controlId="CampaignForm.CampaignSelect">
                            <Form.Label>Select Campaign</Form.Label>
                            <Form.Control as="select">
                                {campaigns.map((campaign) => (
                                    <option>{campaign.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Campaign Name</Form.Label>
                            <Form.Control type="name" placeholder="Campaign Name" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Email Markup</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdForm;

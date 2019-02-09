import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdForm() {
    const [campaigns, setCampaigns] = useState([{ name: "Create new Campaign", date: new Date().toDateString(), markup: '' }]);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(campaigns[0]);

    useEffect(() => {
        API.getCampaigns().then((res) => {
            if(res.length > 0){
                setCampaigns(campaigns.concat(res));
            }
        })
            .catch((error) => {
                console.log(error, campaigns);
                setError(true);
            })
    }, []);

    function handleSubmit(event){
        event.preventDefault();
        //to look at form easily use console.dir
        let form = event.currentTarget;
        let current = {...selected};
        let campaign = {};
        console.dir(form);
        //Destructuring the object form into the selected object while renaming the attributes
        ({0: campaign.selected, 1: campaign.name, 3: campaign.markup} = form);
        campaign.selected = campaign.selected.value;
        campaign.markup = campaign.markup.value;
        campaign.name = campaign.name.value;
        campaign.date = current.date;
        setSelected(campaign);
        API.saveCampaign(campaign);
    }

    function dateHandler(date){
        let changedDate = {...selected};
        changedDate.date = date.toDateString();
        setSelected(changedDate);
    }

    return (
        <Container>
            <Row>
                <Col>
                    {error ? <Alert dismissible variant="danger">There was an error loading your Campaigns</Alert> : null}
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="CampaignForm.CampaignSelect">
                            <Form.Label>Select Campaign</Form.Label>
                            <Form.Control as="select" >
                                {campaigns.map((campaign) => (
                                    <option key={campaign.name}>{campaign.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="CampaignForm.CampaignName">
                            <Form.Label>Campaign Name</Form.Label>
                            <Form.Control type="name" placeholder="Campaign Name" />
                        </Form.Group>
                        <Form.Group>
                        <DatePicker id="CampaignForm.CampaignDatePicker" value={selected.date} onChange={dateHandler} />
                        </Form.Group>
                        <Form.Group controlId="CampaignForm.CampaignMarkup">
                            <Form.Label>Email Markup</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdForm;

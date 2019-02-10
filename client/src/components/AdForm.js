import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Container, Form, Row, Col, Alert, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdForm() {
    const [campaigns, setCampaigns] = useState(["Create New Campaign"]);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(campaigns[0]);
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date().toDateString());
    const [markup, setMarkUp] = useState("");
    const [id, setId] = useState();

    useEffect(() => {
        API.getCampaigns().then((res) => {
            if(res.data.length > 0){
                setCampaigns(campaigns.concat(res.data));
            }
        })
            .catch((error) => {
                console.log(error, campaigns);
                setError(true);
            })
    }, []);

    function handleSubmit(event){
        event.preventDefault();
        let editedCampaign = {
            "name": name,
            "date": date,
            "markup": markup,
            "selected": selected
        }
        if(id){
            editedCampaign._id = id;
            API.updateCampaign(editedCampaign);
        }
        else{
            API.saveCampaign(editedCampaign);
        }
    }

    function handleDateChange(date){
        setDate(date.toDateString());
    }

    function handleNameChange(event){
        console.log("Changing name", event.currentTarget.value)
        setName(event.currentTarget.value);
    }

    function handleMarkUpChange(event){
        setMarkUp(event.currentTarget.value);
    }

    function handleSelect(event){
        if(event.currentTarget.value !== "Create New Campaign"){
            API.getCampaign(event.currentTarget.value).then((res)=>{
                setSelected(res.data.name);
                setName(res.data.name);
                setDate(res.data.date);
                setMarkUp(res.data.markup);
                setId(res.data._id);
            })
        }
        else{
            setSelected("Create New Campaign");
                setName("");
                setDate(new Date().toDateString());
                setMarkUp("");
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    {error ? <Alert dismissible variant="danger">There was an error loading your Campaigns</Alert> : null}
                    <Form onSubmit={e => handleSubmit(e)}>
                        <Form.Group controlId="CampaignForm.CampaignSelect">
                            <Form.Label>Select Campaign</Form.Label>
                            <Form.Control as="select" onChange={handleSelect}>
                                {campaigns.map((campaign) => (
                                    <option key={campaign}>{campaign}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="CampaignForm.CampaignName">
                            <Form.Label>Campaign Name</Form.Label>
                            <Form.Control type="name" placeholder="Campaign Name" value={name} onChange={handleNameChange}/>
                        </Form.Group>
                        <Form.Group>
                        <DatePicker id="CampaignForm.CampaignDatePicker" value={date} onChange={handleDateChange} />
                        </Form.Group>
                        <Form.Group controlId="CampaignForm.CampaignMarkup">
                            <Form.Label>Email Markup</Form.Label>
                            <Form.Control as="textarea" rows="3" value={markup} onChange={handleMarkUpChange}/>
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdForm;

import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container} from "react-bootstrap";

function AirlineSettings() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        API.getAirlineSettings().then((res) => {
            if (res.data.length > 0) {
                setName(res.data.airlineName);
                setEmail(res.data.airlineEmail);
            }
        })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        let editedAirline = {
            airlineName: name,
            airlineEmail: email,
        }
        API.updateAirlineSettings(editedAirline);
    }

    function handleNameChange(event) {
        setName(event.currentTarget.value);
    }

    function handleEmailChange(event) {
        setEmail(event.currentTarget.value);
    }


    return (
        <React.Fragment>
            <Container style={{paddingTop: '20px'}}>
                {error ? <Alert dismissible variant="danger">There was an error loading your Customers</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="EmailForm.AirlineName">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="name" placeholder="Volaris" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="EmailForm.AirlineEmail">
                        <Form.Label>Customer Email</Form.Label>
                        <Form.Control type="email" placeholder="promo@volaris.com" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default AirlineSettings;

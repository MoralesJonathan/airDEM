import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";

function EmailListForm() {
    const [customers, setCustomers] = useState(["Create New Customer"]);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(customers[0]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState();

    useEffect(() => {
        API.getCustomers().then((res) => {
            if (res.data.length > 0) {
                setCustomers(customers.concat(res.data));
            }
        })
            .catch((error) => {
                console.log(error, customers);
                setError(true);
            })
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        let editedCustomer = {
            "name": name,
            "email": email,
            "selected": selected
        }
        if (id) {
            editedCustomer._id = id;
            API.updateCustomer(editedCustomer);
        }
        else {
            API.saveCustomer(editedCustomer);
        }
    }

    function handleNameChange(event) {
        setName(event.currentTarget.value);
    }

    function handleEmailChange(event) {
        setEmail(event.currentTarget.value);
    }

    function handleSelect(event) {
        if (event.currentTarget.value !== "Create New Campaign") {
            API.getCustomer(event.currentTarget.value).then((res) => {
                setSelected(res.data.name);
                setName(res.data.name);
                setEmail(res.data.email);
                setId(res.data._id);
            })
        }
        else {
            setSelected("Create New Customer");
            setName("");
            setEmail("");
        }
    }

    return (
        <React.Fragment>
            <Container style={{paddingTop: '20px'}}>
                {error ? <Alert dismissible variant="danger">There was an error loading your Customers</Alert> : null}
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Group controlId="CampaignForm.CustomerSelect">
                        <Form.Label>Select Customer</Form.Label>
                        <Form.Control as="select" onChange={handleSelect}>
                            {customers.map((customer) => (
                                <option key={customer}>{customer}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="EmailForm.CustomerName">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control type="name" placeholder="John Doe" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <Form.Group controlId="EmailForm.CustomerEmail">
                        <Form.Label>Customer Email</Form.Label>
                        <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default EmailListForm;

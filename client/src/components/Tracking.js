import React, { useState, useEffect } from "react";
import API from "../utils/API";
import {Col, Container} from "react-bootstrap";
var BarChart =  require('react-chartjs').Bar;


function Tracking() {
    const [stats, setStats] = useState("");

    useEffect(() => {
        API.getStats().then((res) => {
            console.log(res);
            setStats(res);
        })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <React.Fragment>
            <Container style={{paddingTop: '20px'}}>
                {stats === "" ? null: <BarChart data={stats} height={400} width={800}></BarChart>}
            </Container>
        </React.Fragment>
    )
}

export default Tracking;

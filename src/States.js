import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default function States(props) {
    // let dLink;
    const [states_id, setStates_id] = React.useState();
    const [districts, setDistricts] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [district_id, setDistrict_id] = React.useState();
    const [sessions, setSessions] = React.useState([]);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        // color: theme.palette.text.secondary
    }));

    const setStateId = (event) => {
        setStates_id(event.target.value);
        console.log(states_id);
    };
    const setDistrictId = (event) => {
        setDistrict_id(event.target.value);
        console.log(district_id);
    };

    React.useEffect(() => {
        axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((response) => {
            setStates(response.data.states);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    React.useEffect(() => {
        setSessions([]);
    }, [states_id]);

    React.useEffect(() => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${states_id}`).then((response) => {
            setDistricts(response.data.districts);

        }).catch((error) => {
            console.error(error);
        });
    }, [states_id]);

    React.useEffect(() => {
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=29-12-2021`).then((response) => {
            setSessions(response.data.sessions);

        }).catch((error) => {
            console.error(error);
        });
    }, [district_id]);

    return (
        <>
            <center>

                <h1>Hello {props.Name}</h1>
                <br></br>
                <br></br>

                {/* <Grid container spacing={4} >
            <Grid item xs={2} > */}
                <FormControl style={{ width: "500px" }} >
                    <InputLabel id="demo-simple-select-label" style={{textAlign: "center"}}>Select State</InputLabel>
                    <Select
                        labelId="demo-state-select-label"
                        id="demo-state-select"
                        value={states_id}
                        label="States_ID"
                        onChange={setStateId}
                    >
                        {states.map((s) => {
                            return <MenuItem value={s.state_id}>{s.state_name}</MenuItem>
                        })}
                    </Select>
                    <span><span style={{ fontWeight: "bold" }}>District Count: </span>{districts.length}</span>
                </FormControl>
                <FormControl style={{ width: "500px" }} >
                    <InputLabel id="demo-simple-select-label" style={{ textAlign: "center" }}>Select District</InputLabel>
                    <Select
                        labelId="demo-state-select-label"
                        id="demo-state-select"
                        value={district_id}
                        label="States_ID"
                        onChange={setDistrictId}
                    >
                        {districts.map((d) => {
                            return <MenuItem value={d.district_id}> {d.district_name}</MenuItem>
                        })}
                    </Select>
                    <span><span style={{ fontWeight: "bold" }}>Session Count: </span>{sessions.length}</span>
                </FormControl>
                <br></br>
                <br></br>
                <br></br>
                {/* </Grid> */}

                {/* <div justifyContent="center"> */}
                {/* border={2} padding="10px 20px" marginBottom="10px" marginLeft="10px" textAlign="center" borderRadius="10px" bgcolor="#505050" color="white" */}
                <Grid container  alignContent="center" width="100%" style={{ display: "flex", justifyContent: "center" }}>
                    {sessions.map((ss) => {
                        return <Grid item padding="10px 20px" marginTop="10px" marginBottom="10px" marginLeft="10px" textAlign="center" borderRadius="10px" bgcolor="#505050" color="white">
                            <p><b>Center: </b>{ss.name}</p>
                            <p><b>Address: </b>{ss.address}</p>
                            <p><b>Pin: </b>{ss.pincode}</p>
                            {/* <center>
                                <Grid container  alignContent="center" width="100%" style={{ display: "flex", justifyContent: "center" }}>
                                    <Grid item padding="10px 20px" marginTop="10px" marginBottom="10px" marginLeft="10px" textAlign="center" borderRadius="10px" bgcolor="#AAAAAA" color="white">Center1 ajsdlan akndkn</Grid>
                                    <Grid item padding="10px 20px" marginTop="10px" marginBottom="10px" marginLeft="10px" textAlign="center" borderRadius="10px" bgcolor="#AAAAAA" color="white">Center2</Grid>
                                    <Grid item padding="10px 20px" marginTop="10px" marginBottom="10px" marginLeft="10px" textAlign="center" borderRadius="10px" bgcolor="#AAAAAA" color="white">Center3 aksdkan aknsdkasnd kansdkansd kandkjsand</Grid>
                                </Grid>    
                            </center> */}
                        
                        </Grid>
                    })}
                    {/* <Grid item xs={2} border={2}>
                    Tanmoy
                </Grid> */}
                </Grid>
                {/* </Grid> */}
                {/* </div> */}
            </center>


        </>
    );
}

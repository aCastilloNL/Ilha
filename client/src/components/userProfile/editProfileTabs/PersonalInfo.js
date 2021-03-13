import React, { useState } from 'react';
import MultiSelect from "react-multi-select-component";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function PersonalInfo() {
    const classes = useStyles();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [experience, setExperience] = useState('');
    const [selected, setSelected] = useState([]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleAboutChange = (event) => {
        setAbout(event.target.value);
    };

    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    };

    const handleUpdateClick = (event) => {
        event.preventDefault();
        // dispatch(signUp({ firstname, lastname, email, about }, history));
    };

    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
        { label: "Watermelon 🍉", value: "watermelon" },
        { label: "Pear 🍐", value: "pear" },
        { label: "Apple 🍎", value: "apple" },
        { label: "Tangerine 🍊", value: "tangerine" },
        { label: "Pineapple 🍍", value: "pineapple" },
        { label: "Peach 🍑", value: "peach" },
    ];


    return (
        <>
        <h2>Personal Information</h2>
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        autoComplete="fname"
                        name="firstname"
                        variant="outlined"
                        fullWidth
                        id="firstname"
                        label="First Name"
                        autoFocus
                        value={firstname}
                        onChange={handleFirstNameChange}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="lname"
                        value={lastname}
                        onChange={handleLastNameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={6}
                        name="about"
                        label="Tell us more about yourself"
                        type="about"
                        id="about"
                        value={about}
                        onChange={handleAboutChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name="experience"
                        multiline
                        rows={6}
                        label="Work/Musical Experience"
                        type="experience"
                        id="experience"
                        value={experience}
                        onChange={handleExperienceChange}
                    />
                </Grid>
            </Grid>
            <h3>Your Languages</h3>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
            />
            <h3>Instruments played</h3>
            <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy={"Select"}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleUpdateClick}
            >
                Update Profile
          </Button>
        </form>
        </>
    )
}
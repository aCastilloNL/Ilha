import React, { useState } from 'react';
// import axios from 'axios';
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function TeacherInfo() {
    const classes = useStyles();

    const [awards, setAwards] = useState([])
    const [references, setReferences] = useState([])
    const [formData, setFormData] = useState({})

    const handleChange = ({ target }) => {
        const { name, value } = target
        const data = {
            ...formData,
            [name]: value
        }
        setFormData(data);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        // axios.put(updateUrl, {
        //     awards,
        //     references
        // })
        //     .then(result => dispatch({ type: "update", payload: result.data.value }))
        //     .then(() => history.push(`/users/${user._id}/profile`))
        //     .catch(err => console.log(err))
    }

    const addAward = () => {
        if (formData.awards) {
            setAwards(awards.concat(formData.awards))
        }
    }

    const addReference = () => {
        if (formData.references) {
            setReferences(references.concat(formData.references))
        }
    }

    // const awardDelete = (index) => {
    //     setAwards(awards.filter((e, i) => i !== index))
    // }

    // const referenceDelete = (index) => {
    //     setReferences(references.filter((e, i) => i !== index))
    // }


    const handleSignUpClick = (event) => {
        event.preventDefault();
        // dispatch(signUp({ linkedIn, spotify, iTunes, soundCloud }, history));
    };

    return (
        <>
            <h2>Teacher information</h2>
            <form className={classes.form} onChange={handleChange} onSubmit={handleUpdate}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            id="awards"
                            label="Professional Awards"
                            name="awards"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" className={classes.submit} onClick={addAward}>
                            Add Award
                    </Button>
                        {/* {awards.map((elem, i) =>
                            <InputContainer key={i}>
                                <UserInput>{elem}</UserInput>
                                <DeleteIcon color='error' onClick={() => awardDelete(i)} />
                            </InputContainer>
                        )} */}
                    </Grid>
                    <hr />
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            id="references"
                            label="Your References"
                            name="references"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" className={classes.submit} onClick={addReference}>
                            Add Reference
                    </Button>
                        {/* {references.map((elem, i) =>
                            <InputContainer key={i}>
                                <UserInput>{elem}</UserInput>
                                <DeleteIcon color='error' onClick={() => referenceDelete(i)} />
                            </InputContainer>
                        )} */}
                    </Grid>
                </Grid>
                <hr />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={handleSignUpClick}
                >
                    Update Profile
          </Button>
            </form>
        </>
    )
}
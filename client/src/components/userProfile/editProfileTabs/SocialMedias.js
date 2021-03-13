import React, { useState } from 'react';
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

export default function SocialMedias() {
    const classes = useStyles();

    const [linkedIn, setLinkedin] = useState('');
    const [spotify, setSpotify] = useState('');
    const [iTunes, setiTunes] = useState('');
    const [soundCloud, setSoundCloud] = useState('');
    const [youTube, setYouTube] = useState('');

    const handleLinkedInChange = (event) => {
        setLinkedin(event.target.value);
    };

    const handleSpotifyChange = (event) => {
        setSpotify(event.target.value);
    };

    const handleiTunesChange = (event) => {
        setiTunes(event.target.value);
    }

    const handleSoundCloudChange = (event) => {
        setSoundCloud(event.target.value);
    };

    const handleYouTubeChange = (event) => {
        setYouTube(event.target.value);
    };

    const handleUpdateClick = (event) => {
        event.preventDefault();
        // dispatch(signUp({ linkedIn, spotify, iTunes, soundCloud }, history));
    };

    return (
        <>
            <h2>Social Media</h2>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="linkedin"
                            variant="outlined"
                            fullWidth
                            id="linkedin"
                            label="LinkedIn"
                            value={linkedIn}
                            onChange={handleLinkedInChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="spotify"
                            label="Spotify"
                            name="spotify"
                            value={spotify}
                            onChange={handleSpotifyChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            id="iTunes"
                            label="iTunes"
                            name="iTunes"
                            value={iTunes}
                            onChange={handleiTunesChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="soundCloud"
                            label="SoundCloud"
                            id="soundCloud"
                            value={soundCloud}
                            onChange={handleSoundCloudChange}
                        />
                    </Grid>
                </Grid>
                <h3>Your Creations</h3>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="youTube"
                    label="YouTube"
                    type="youTube"
                    id="youTube"
                    value={youTube}
                    onChange={handleYouTubeChange}
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
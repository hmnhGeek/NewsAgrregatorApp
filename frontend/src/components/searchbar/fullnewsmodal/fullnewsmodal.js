import React from 'react';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'block',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'scroll',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const FullNewsModal = props => {
    const classes = useStyles();
    return (
        <Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open}
                onClose={props.handleClose}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <h1 id="transition-modal-title" style={{fontFamily: "timesnewroman"}}>{props.title}</h1>
                        {props.newsImage && <img style={{display: 'block', margin: '0 auto'}} src={props.newsImage} />}
                        <br />
                        <p style={{fontSize: "20px", fontFamily: 'timesnewroman', lineHeight: "1.5"}} id="transition-modal-description">{props.news}</p>
                    </div>
                </Fade>
            </Modal>
        </Container>
    );
}

export default FullNewsModal;
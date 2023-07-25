import { useRef, useState } from "react";

import classes from "./Form.module.css";

import { useNavigate } from "react-router-dom";

import { TextField, Button } from "@mui/material";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

const isName = (value: string) => value.trim().length > 0;

const isNumber = (value: string) =>
    value.trim().length === 10 && !isNaN(Number(value));

const isEmail = (value: string) =>
    value.trim().length > 0 && value.includes("@") && value.includes(".");

function Form() {
    const [formIsInvalid, setFormIsInvalid] = useState(false);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const enteredName = nameInputRef.current!.value;
        const enteredPhone = phoneInputRef.current!.value;
        const enteredEmail = emailInputRef.current!.value;

        const enteredNameIsValid = isName(enteredName);
        const enteredPhoneIsValid = isNumber(enteredPhone);
        const enteredEmailIsValid = isEmail(enteredEmail);

        const formIsValid =
            enteredNameIsValid && enteredPhoneIsValid && enteredEmailIsValid;

        if (!formIsValid) {
            setFormIsInvalid(true);
            return;
        }

        const values = {
            name: enteredName,
            phone: enteredPhone,
            email: enteredEmail,
        };

        localStorage.setItem(new Date().toISOString(), JSON.stringify(values));

        nameInputRef.current!.value = "";
        phoneInputRef.current!.value = "";
        emailInputRef.current!.value = "";

        navigate("/second");
    };

    function dialogCloseHandler() {
        setFormIsInvalid(false);
    }

    return (
        <div className={classes["form-body"]}>
            <div className={classes.form}>
                <form onSubmit={submitHandler}>
                    <TextField
                        label="Name"
                        inputRef={nameInputRef}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Phone Number"
                        inputRef={phoneInputRef}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Email Address"
                        inputRef={emailInputRef}
                        fullWidth
                        margin="dense"
                    />

                    <div className={classes.button}>
                        <Button
                            type="submit"
                            variant="outlined"
                            size="large"
                            endIcon={<SendIcon />}
                            sx={{
                                marginTop: "10px",
                            }}>
                            Submit
                        </Button>
                    </div>

                    <Dialog
                        open={formIsInvalid}
                        onClose={dialogCloseHandler}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Invalid Form"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please enter valid details before going to next
                                page.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={dialogCloseHandler}>OK</Button>
                        </DialogActions>
                    </Dialog>
                </form>
            </div>
        </div>
    );
}

export default Form;

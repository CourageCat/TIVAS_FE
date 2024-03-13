import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import InputItem from "~/components/InputItem";
import classNames from "classnames/bind";
import styles from "./CardForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerGoogle } from "~/controllers/auth";
import createAxios from "~/configs/axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

function FormCard() {
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth.login.user);
    const stateEmail = useSelector((state) => state.auth.sendMail);
    const axiosInstance = createAxios(dispatch, currentUser);

    const statusLogin = useSelector((state) => state.auth.login.isFetching);

    const [fullName, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullNameSystem, setFullNameSystem] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
            billing_details: {
                name: fullName,
                address: {
                    line1: address,
                },
            },
        });

        console.log("Error", error);

        if (!error) {
            try {
                const { id } = paymentMethod;
                registerGoogle(dispatch, axiosInstance, {
                    username: username,
                    email: stateEmail.email,
                    fullName: fullNameSystem,
                    phoneNumber: phoneNumber,
                    paymentMethod: id,
                });
            } catch (error) {
                console.log("Error message: ", error.message);
            }
        } else {
            console.log("Error message: ", error.message);
        }
    };

    return (
        <section className={cx("formCard-wrapper")}>
            <h2 className={cx("heading")}>Sign up</h2>
            <form className={cx("form-wrapper")} onSubmit={handleSubmit}>
                <h3 className={cx("title")}>User information</h3>
                <InputItem
                    type="text"
                    value={username}
                    setValue={setUserName}
                    placeholder="Username *"
                />
                <InputItem
                    type="text"
                    value={fullNameSystem}
                    setValue={setFullNameSystem}
                    placeholder="Full Name *"
                />
                <InputItem
                    type="text"
                    value={phoneNumber}
                    setValue={setPhoneNumber}
                    placeholder="Phone Number *"
                />
                <h3 className={cx("title")}>Card Information</h3>
                <InputItem
                    type="text"
                    value={fullName}
                    setValue={setFullName}
                    placeholder="Full Name *"
                />
                <InputItem
                    type="text"
                    value={address}
                    setValue={setAddress}
                    placeholder="Billing address *"
                />
                <CardElement />

                <button
                    type={
                        fullNameSystem === "" ||
                        fullName === "" ||
                        address === ""
                            ? "button"
                            : "submit"
                    }
                    className={cx("action-login", {
                        "hide-login":
                            fullNameSystem === "" ||
                            fullName === "" ||
                            address === "",
                        "show-login":
                            fullNameSystem !== "" &&
                            fullName !== "" &&
                            address !== "",
                    })}
                >
                    Register
                </button>
            </form>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={statusLogin}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
}

export default FormCard;

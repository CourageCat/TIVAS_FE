import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import InputItem from "~/components/InputItem";
import classNames from "classnames/bind";
import styles from "./CardForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { register } from "~/controllers/auth";
import createAxios from "~/configs/axios";

const cx = classNames.bind(styles);

function FormCard() {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const formRegister = useSelector((state) => state.formRegister.formValue);

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

    if (!error) {
      try {
        const { id } = paymentMethod;
        register(dispatch, axiosInstance, {
          email: sessionStorage.getItem("emailRegister"),
          username: formRegister.username,
          fullName: formRegister.fullName,
          password: formRegister.password,
          phoneNumber: formRegister.phoneNumber,
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
      <h3 className={cx("title")}>Card Information</h3>
      <form className={cx("form-wrapper")} onSubmit={handleSubmit}>
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
          type={fullName === "" || address === "" ? "button" : "submit"}
          className={cx("action-login", {
            "hide-login": fullName === "" || address === "",
            "show-login": fullName !== "" && address !== "",
          })}
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default FormCard;

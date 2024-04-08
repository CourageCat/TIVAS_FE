import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RegisterEmail from "../RegisterEmail";

import CardContainer from "../CardRegister/CardContainer";
import RegisterForm from "../RegisterForm";

import Popup from "~/components/AuthPopup";
import { resetForm, setStatus } from "~/redux/formRegisterSlice";

import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Register({ handleAccessLogin, handleCloseRegister, trigger }) {
    const dispatch = useDispatch();

    const stateEmail = useSelector((state) => state.auth.sendMail);

    const stateFormRegister = useSelector((state) => state.formRegister);

    const statusRegister = useSelector((state) => state.auth.register);

    const [registerPath, setRegisterPath] = useState(0);

    const handleRegisterPrevious = () => {
        if (registerPath === 1) {
            sessionStorage.removeItem("emailRegister");
            dispatch(resetForm());
        } else if (registerPath === 2) {
            dispatch(setStatus(false));
        }
        setRegisterPath((prev) => prev - 1);
    };

    useEffect(() => {
        if (trigger === false) setRegisterPath(0);
    }, [trigger]);

    useEffect(() => {
        if (registerPath === 0 && stateEmail?.email !== "") {
            setRegisterPath(1);
        } else if (registerPath === 1 && stateFormRegister.status === true) {
            setRegisterPath(2);
        }
    }, [stateFormRegister, registerPath, stateEmail?.email]);

    const renderRegister = () => {
        if (registerPath === 0) {
            return <RegisterEmail handleAccessLogin={handleAccessLogin} />;
        } else if (registerPath === 1) {
            return <RegisterForm />;
        } else if (registerPath === 2) {
            return <CardContainer />;
        }
    };

    return (
        <div>
            <Toaster position="top-right" richColors expand={true} />

            <Popup
                trigger={trigger}
                onClose={handleCloseRegister}
                status={registerPath}
                onPrevious={handleRegisterPrevious}
            >
                {renderRegister()}
            </Popup>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={statusRegister?.isFetching}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Register;

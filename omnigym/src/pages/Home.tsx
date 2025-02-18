import React, { useState } from "react";
import {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import './home.css';

const Home: React.FC = () => {
    const history = useHistory();

    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState<boolean>();

    const [isTouchedPassword, setIsTouchedPassword] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState<boolean>();

    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validatePassword = (password: string) => {
        return password.length >= 12;
    };

    const validate = (event: Event, field: "email" | "password") => {
        const value = (event.target as HTMLInputElement).value;

        if (field === "email") {
            setIsValidEmail(undefined);
            if (value === "") return;
            setIsValidEmail(validateEmail(value) !== null);
        } else if (field === "password") {
            setIsValidPassword(undefined);
            if (value === "") return;
            setIsValidPassword(validatePassword(value));
        }
    };

    return (
        <IonPage>
            <IonContent className="content-styling" fullscreen>
                <h1 className="omni-gym-title">Omnigym.</h1>
                <div className="centered-container">
                    <IonCard className="login-box">
                        <IonCardContent>
                            {/* Email Input */}
                            <IonInput
                                className={`${isValidEmail && "ion-valid"} ${
                                    isValidEmail === false && "ion-invalid"
                                } ${isTouchedEmail && "ion-touched"}`}
                                type="email"
                                fill="solid"
                                label="Email"
                                labelPlacement="floating"
                                helperText="Enter a valid email"
                                errorText="Invalid email"
                                onIonInput={(event) => validate(event, "email")}
                                onIonBlur={() => setIsTouchedEmail(true)}
                            />

                            {/* Password Input */}
                            <IonInput
                                className={`${isValidPassword && "ion-valid"} ${
                                    isValidPassword === false && "ion-invalid"
                                } ${isTouchedPassword && "ion-touched"}`}
                                type="password"
                                fill="solid"
                                label="Password"
                                labelPlacement="floating"
                                helperText="Enter at least 12 characters"
                                errorText="Password must be at least 12 characters"
                                onIonInput={(event) => validate(event, "password")}
                                onIonBlur={() => setIsTouchedPassword(true)}
                            />
                        </IonCardContent>

                        {/* Buttons */}
                        <div className="button-container">
                            <IonButton expand="block" className="sign-in-button" onClick={() => history.push("/Profile")}>
                                Sign In
                            </IonButton>
                            <IonButton expand="block" className="register-button" onClick={() => history.push("/register-gym")}>
                                Register
                            </IonButton>
                        </div>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
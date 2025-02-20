import React, { useState } from "react";
import axios from "axios";
interface ValidationResponse {
  valid: boolean;
}
interface RegistrationResponse {
  success: boolean;
  message?: string;
}

import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonDatetime,
  IonRouterLink,
  IonToast,
  IonIcon,
  IonCheckbox,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./RegisterGym.css";
import { eye, eyeOff } from "ionicons/icons";
import termsAndConditions from "../extras/UserAgreement";

const RegisterGym: React.FC = () => {
  const history = useHistory();

  // Form State
  const [email, setEmail] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<string | undefined>();
  const [showDateModal, setShowDateModal] = useState(false);
  const [isTouchedEmail, setIsTouchedEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>();

  const [isValidPassword, setIsValidPassword] = useState<boolean>();
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean | undefined>(undefined);
  const [isTouchedPhoneNumber, setIsTouchedPhoneNumber] = useState(false);
  const [isValidFirstName, setIsValidFirstName] = useState<boolean | undefined>(undefined);
  const [isValidLastName, setIsValidLastName] = useState<boolean | undefined>(undefined);
  const [isValidBirthDate, setIsValidBirthDate] = useState<boolean | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    conditionsMet: false,
    isStrong: false,
  });
  const [showValidation, setShowValidation] = useState(false);
  const [selectedGym, setSelectedGym] = useState<string | undefined>(undefined);
  const [isValidMembershipId, setIsValidMembershipId] = useState<boolean | undefined>(undefined);

  const [showToast, setShowToast] = useState(false);

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validateMembershipId = async (id: string) => {
    if (!selectedGym || !id) {
      setIsValidMembershipId(undefined);
      return;
    }

    try {
      const response = await axios.post<ValidationResponse>("http://localhost:5000/api/validate-member", {

        gym_name: selectedGym,
        member_id: id
      });
      setIsValidMembershipId(response.data.valid);
    } catch (error) {
      console.error("Validation error:", error);
      setIsValidMembershipId(false);
    }
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    const conditionsMet = [hasLowercase, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length >= 3;
    const isStrong = minLength && conditionsMet;
  
    setPasswordStrength({
      minLength,
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      conditionsMet,
      isStrong,
    });
  
    return isStrong;
  };

  const validatePhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.length === 10;
  };

  const formatPhoneNumber = (value: string) => {
    let cleaned = value.replace(/\D/g, "").substring(0, 10);
    let formatted = cleaned;
    if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length > 3) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    }
    return formatted;
  };
  
  const validateName = (name: string) => {
    return !/\d/.test(name);
  };
  
  const validateBirthDate = (date: string | null) => {
    if (!date) return false;
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed = (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
    );
    return isBirthdayPassed ? age >= 18 : age - 1 >= 18;
  };

  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleRegister = async () => {
    setIsValidPassword(validatePassword(password));
    setIsValidPhoneNumber(validatePhoneNumber(phoneNumber));
    setIsValidFirstName(validateName(firstName));
    setIsValidLastName(validateName(lastName));
    setIsValidBirthDate(validateBirthDate(birthDate));

    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      !isValidBirthDate ||
      !phoneNumber ||
      phoneNumber.replace(/\D/g, "").length !== 10 ||
      !isValidFirstName ||  
      !isValidLastName ||   
      !gender ||
      !isValidPassword ||
      !selectedGym ||
      !isTermsChecked
    ) {
      alert("Please fill in all required fields correctly!");
      return;
    }

    try {
      const validationResponse = await axios.post<ValidationResponse>("http://localhost:5000/api/validate-member", {

        gym_name: selectedGym,
        member_id: membershipId
      });

      if (!validationResponse.data.valid) {
        alert("Invalid membership ID for the selected gym");
        return;
      }

      const registrationResponse = await axios.post<RegistrationResponse>("http://localhost:5000/api/register", {

        email: email,
        password: password,
        gym_name: selectedGym,
        member_id: membershipId,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        gender: gender,
        birth_date: birthDate
      });

      if (registrationResponse.data.success) {
        setShowToast(true);
        setTimeout(() => {
          history.push("/home");
        }, 2000);
      } else {
        alert(registrationResponse.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <h1 className="omnigym-title">Omnigym.</h1>
        <div className="centered-container">
          <IonCard className="login-box">
            <IonCardContent>
              <IonRow className="name-row">
                <IonCol size="6" className="name-col">
                  <IonItem className="faded-label">
                    <IonSelect
                      value={selectedGym}
                      onIonChange={(event) => {
                        const gym = event.detail.value;
                        setSelectedGym(gym);
                        if (gym && membershipId) {
                          validateMembershipId(membershipId);
                        }
                      }}
                      placeholder="Gym"
                      className="DropdownFont"
                    >
                      <IonSelectOption value="Planet Fitness">Planet Fitness</IonSelectOption>
                      <IonSelectOption value="Gold Gym">Gold's Fitness</IonSelectOption>
                      <IonSelectOption value="Lifetime Fitness">Lifetime Fitness</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>

                <IonCol size="6" className="name-col FontMember">
                  <IonInput
                    type="text"
                    fill="solid"
                    label="Membership ID *"
                    labelPlacement="floating"
                    value={membershipId}
                    onIonInput={(event) => {
                      const value = event.detail.value!;
                      setMembershipId(value);
                      if (selectedGym && value) {
                        validateMembershipId(value);
                      }
                    }}
                    className={`${isValidMembershipId ? "ion-valid" : isValidMembershipId === false ? "ion-invalid" : ""}`}
                  />
                  {isValidMembershipId && (
                    <IonLabel color="success" className="success-text">Valid Membership ID</IonLabel>
                  )}
                  {isValidMembershipId === false && membershipId && (
                    <IonLabel color="danger" className="error-text">Invalid Membership ID</IonLabel>
                  )}
                </IonCol>
              </IonRow>

              <IonRow className="name-row">
                <IonCol size="6" className="name-col">
                  <IonInput
                    type="text"
                    fill="solid"
                    label="First Name *"
                    labelPlacement="floating"
                    value={firstName}
                    onIonInput={(event) => {
                      const value = event.detail.value!;
                      setFirstName(value);
                      setIsValidFirstName(/^[A-Za-z\s]+$/.test(value));
                    }}
                    className={`${isValidFirstName ? "ion-valid" : ""} ${isValidFirstName === false ? "ion-invalid" : ""}`}
                  />
                  {isValidFirstName === false && (
                    <IonLabel color="danger" className="error-text">Invalid name. No numbers allowed.</IonLabel>
                  )}
                </IonCol>

                <IonCol size="6" className="name-col">
                  <IonInput
                    type="text"
                    fill="solid"
                    label="Last Name *"
                    labelPlacement="floating"
                    value={lastName}
                    onIonInput={(event) => {
                      const value = event.detail.value!;
                      setLastName(value);
                      setIsValidLastName(/^[A-Za-z\s]+$/.test(value));
                    }}
                    className={`${isValidLastName ? "ion-valid" : ""} ${isValidLastName === false ? "ion-invalid" : ""}`}
                  />
                  {isValidLastName === false && (
                    <IonLabel color="danger" className="error-text">Invalid name. No numbers allowed.</IonLabel>
                  )}
                </IonCol>
              </IonRow>

              <IonInput
                type="tel"
                fill="solid"
                label="Phone Number *"
                labelPlacement="floating"
                errorText="Invalid Number"
                value={phoneNumber}
                onIonInput={(event) => {
                  const formattedNumber = formatPhoneNumber(event.detail.value!);
                  setPhoneNumber(formattedNumber);
                }}
                onIonBlur={() => setIsTouchedPhoneNumber(true)}
                className={`${isValidPhoneNumber && "ion-valid"} ${isValidPhoneNumber === false && "ion-invalid"} ${isTouchedPhoneNumber && "ion-touched"}`}
                maxlength={12}
              />

              <IonInput
                className={`${isValidEmail && "ion-valid"} ${isValidEmail === false && "ion-invalid"} ${isTouchedEmail && "ion-touched"}`}
                type="email"
                fill="solid"
                label="Email *"
                labelPlacement="floating"
                errorText="Invalid email"
                value={email}
                onIonInput={(event) => {
                  const value = event.detail.value!;
                  setEmail(value);
                  setIsValidEmail(!!validateEmail(value));
                }}
                onIonBlur={() => setIsTouchedEmail(true)}
              />

              <IonItem>
                <IonInput
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  className="fadedPassword"
                  label="Password *"
                  onIonInput={(e) => {
                    const value = e.detail.value!;
                    setPassword(value);
                    validatePassword(value);
                    setShowValidation(true);
                  }}
                  onIonBlur={() => {
                    setShowValidation(false);
                  }}
                />
                <IonButton fill="clear" onClick={() => setPasswordVisible(!passwordVisible)}>
                  <IonIcon icon={passwordVisible ? eyeOff : eye} />
                </IonButton>
              </IonItem>

              {showValidation && (
                <IonCard className="password-checklist">
                  <IonCardContent>
                    <p>Password must contain:</p>
                    <ul>
                      <li style={{ color: passwordStrength.minLength ? "green" : "red" }}>
                        {passwordStrength.minLength ? "✔" : "✖"} At least 8 characters
                      </li>
                      <li style={{ color: passwordStrength.hasLowercase ? "green" : "red" }}>
                        {passwordStrength.hasLowercase ? "✔" : "✖"} Lowercase letter (a-z)
                      </li>
                      <li style={{ color: passwordStrength.hasUppercase ? "green" : "red" }}>
                        {passwordStrength.hasUppercase ? "✔" : "✖"} Uppercase letter (A-Z)
                      </li>
                      <li style={{ color: passwordStrength.hasNumber ? "green" : "red" }}>
                        {passwordStrength.hasNumber ? "✔" : "✖"} Number (0-9)
                      </li>
                      <li style={{ color: passwordStrength.hasSpecialChar ? "green" : "red" }}>
                        {passwordStrength.hasSpecialChar ? "✔" : "✖"} Special character (!@#$%^&*)
                      </li>
                    </ul>
                  </IonCardContent>
                </IonCard>
              )}

              <IonItem button onClick={() => setShowDateModal(true)} className="faded-label">
                <IonLabel className={birthDate ? "floating-label active" : "floating-label"}>Birthdate*</IonLabel>
                <IonInput value={birthDate ? new Date(birthDate).toLocaleDateString() : ""} readonly />
              </IonItem>

              <IonModal isOpen={showDateModal} onDidDismiss={() => setShowDateModal(false)}>
                <IonDatetime
                  value={birthDate ?? ''}
                  onIonChange={(event) => {
                    const selectedDate = event.detail.value ? String(event.detail.value) : null;
                    setBirthDate(selectedDate);
                    setIsValidBirthDate(validateBirthDate(selectedDate));
                    setShowDateModal(false);
                  }}
                />
                <IonButton expand="full" onClick={() => setShowDateModal(false)}>Done</IonButton>
              </IonModal>

              {isValidBirthDate === false && (
                <IonLabel color="danger" className="error-text">You must be at least 18 years old to sign up.</IonLabel>
              )}

              <IonItem className="faded-label">
                <IonLabel className="floating-label">Gender *</IonLabel>
                <IonSelect
                  value={gender}
                  onIonChange={(event) => setGender(event.detail.value)}
                >
                  <IonSelectOption value="male">Male</IonSelectOption>
                  <IonSelectOption value="female">Female</IonSelectOption>
                  <IonSelectOption value="other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCardContent>

            <div className="terms-checkbox-container">
              <IonCard className="terms-card">
                <IonCardContent>
                  <IonItem>
                    <IonCheckbox checked={isTermsChecked} onIonChange={(e) => setIsTermsChecked(e.detail.checked)} />
                    <IonLabel>
                      By clicking submit, you agree to our{" "}
                      <strong className="terms-link" onClick={() => setShowTermsModal(true)}>
                        Terms & Conditions
                      </strong>.
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </div>

            <IonModal isOpen={showTermsModal} onDidDismiss={() => setShowTermsModal(false)}>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Terms & Conditions</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => setShowTermsModal(false)}>Close</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="terms-modal-content">
                <div dangerouslySetInnerHTML={{ __html: termsAndConditions.replace(/\n/g, "<br/>") }} />
              </IonContent>
            </IonModal>

            <div className="button-container">
              <IonButton expand="block" className="submit-button" onClick={handleRegister}>
                Submit
              </IonButton>
              <IonRouterLink href="/home" className="signin-link">
                Already have an account? <strong>Sign In</strong>
              </IonRouterLink>
            </div>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Account registered successfully!"
          duration={2000}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default RegisterGym;

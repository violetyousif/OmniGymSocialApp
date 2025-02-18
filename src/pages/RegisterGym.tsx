import React, { useState } from "react";
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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./RegisterGym.css";
import { eye, eyeOff } from "ionicons/icons";

const RegisterGym: React.FC = () => {
  const history = useHistory();

  // Form State
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

  const validGymMembers: Record<string, string[]> = {
    Planet: ["11223", "22334", "33445"],
    Golds: ["44556", "55667", "66778"], 
    LA: ["77889", "88990", "99001"], 
  };

  const validateMembershipId = (id: string) => {
    if (selectedGym && validGymMembers[selectedGym]?.includes(id)) {
      setIsValidMembershipId(true);
    } else {
      setIsValidMembershipId(false);
    }
    setMembershipId(id);
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
  

  const validate = (
    event: Event,
    field: "email" | "password" | "phonenumber" | "membershipId" | "gym" | "firstname" | "lastname"
  ) => {
    const value = (event.target as HTMLInputElement).value;
  
    if (field === "email") {
      setIsValidEmail(undefined);
      if (value === "") return;
      setIsValidEmail(validateEmail(value) !== null);
    } else if (field === "password") {
      setIsValidPassword(undefined);
      if (value === "") return;
      setIsValidPassword(validatePassword(value));
    } else if (field === "phonenumber") {
      setIsValidPhoneNumber(undefined);
      if (value === "") return;
      setIsValidPhoneNumber(validatePhoneNumber(value));
    } else if (field === "firstname") {
      setIsValidFirstName(undefined);
      if (value === "") return;
      setIsValidFirstName(validateName(value));
    } else if (field === "lastname") {
      setIsValidLastName(undefined);
      if (value === "") return;
      setIsValidLastName(validateName(value));
    } else if (field === "membershipId") {
      setMembershipId(value);
      if (selectedGym && validGymMembers[selectedGym]?.includes(value)) {
        setIsValidMembershipId(true);
      } else {
        setIsValidMembershipId(false);
      }
    } else if (field === "gym") {
      setSelectedGym(value);
      if (membershipId && validGymMembers[value]?.includes(membershipId)) {
        setIsValidMembershipId(true);
      } else {
        setIsValidMembershipId(false);
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    let cleaned = value.replace(/\D/g, "").substring(0, 10); 
    // Apply formatting XXX-XXX-XXXX
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
  
    // Adjust age if birthday hasn't occurred yet this year
    const isBirthdayPassed = (
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
    );
  
    return isBirthdayPassed ? age >= 18 : age - 1 >= 18;
  };
  
  const handleRegister = () => {
    setIsValidEmail(!!validateEmail(membershipId)); 
    setIsValidPassword(validatePassword(password));
    setIsValidPhoneNumber(validatePhoneNumber(phoneNumber));
    setIsValidFirstName(validateName(firstName));
    setIsValidLastName(validateName(lastName));
    setIsValidBirthDate(validateBirthDate(birthDate));
  
    // Check if all validations pass
    if (
      !membershipId ||
      !firstName ||
      !lastName ||
      !birthDate ||
      !isValidBirthDate ||
      !phoneNumber ||
      phoneNumber.replace(/\D/g, "").length !== 10 ||
      !isValidFirstName ||  
      !isValidLastName ||   
      !gender ||
      !isValidEmail || 
      !isValidPassword ||
      !selectedGym ||
      isValidMembershipId === false  
    ) {
      alert("Please fill in all required fields correctly, including a valid Gym and Membership ID!");
      return;
    }

    // Show success toast
    setShowToast(true);

    // Redirect to home after 2 seconds
    setTimeout(() => {
      history.push("/home");
    }, 2000);
  };
  

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <h1 className="omni-gym-title">Omni Gym</h1>
        <div className="centered-container">
          <IonCard className="login-box">
            <IonCardContent>
            <IonRow className="name-row">
              {/* GYM Selection */}
              <IonCol size="6" className="name-col">
                <IonItem className="faded-label">
                  <IonSelect
                    value={selectedGym}
                    onIonChange={(event) => {
                      setSelectedGym(event.detail.value);
                      validateMembershipId(membershipId);
                    }}
                    placeholder="Gym"
                    className="DropdownFont"
                  >
                    <IonSelectOption value="Planet">Planet</IonSelectOption>
                    <IonSelectOption value="Golds">Gold's</IonSelectOption>
                    <IonSelectOption value="LA">LA</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>

              {/* Membership ID Input */}
              <IonCol size="6" className="name-col FontMember">
                <IonInput
                  type="text"
                  fill="solid"
                  label="Membership ID *"
                  labelPlacement="floating"
                  value={membershipId}
                  onIonInput={(event) => validateMembershipId(event.detail.value!)}
                  className={`${isValidMembershipId ? "ion-valid" : isValidMembershipId === false ? "ion-invalid" : ""}`}
                />
                {isValidMembershipId && (
                  <IonLabel color="success" className="success-text">Valid Membership ID</IonLabel>
                )}
                {isValidMembershipId === false && (
                  <IonLabel color="danger" className="error-text">Invalid Membership ID</IonLabel>
                )}
              </IonCol>
            </IonRow>

              {/* Name Row */}
              <IonRow className="name-row">
                {/* First Name Input */}
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

                {/* Last Name Input */}
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

              {/* Phone Number */}
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
                  validate(event, "phonenumber");
                }}
                onIonBlur={() => setIsTouchedPhoneNumber(true)}
                className={`${isValidPhoneNumber && "ion-valid"} ${isValidPhoneNumber === false && "ion-invalid"} ${isTouchedPhoneNumber && "ion-touched"}`}
                maxlength={12}
              />
              {/* Email Input */}
              <IonInput
                className={`${isValidEmail && "ion-valid"} ${
                  isValidEmail === false && "ion-invalid"
                } ${isTouchedEmail && "ion-touched"}`}
                type="email"
                fill="solid"
                label="Email *"
                labelPlacement="floating"
                errorText="Invalid email"
                onIonInput={(event) => validate(event, "email")}
                onIonBlur={() => setIsTouchedEmail(true)}
              />

              {/* Password Input */}
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

              {/* Birthdate Field (Matches IonInput Styles) */}
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

              {/* Gender Selection */}
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
            <IonLabel className="Agree">By clicking submit button you agree to our Terms & Conditions</IonLabel>
            {/* Buttons */}
            <div className="button-container">
              <IonButton expand="block" className="sign-in-button" onClick={handleRegister}>
                Submit
              </IonButton>
              <IonRouterLink href="/" className="signin-link">
                Already have an account? <strong>Sign In</strong>
              </IonRouterLink>
            </div>
          </IonCard>
        </div>
          {/* Success Toast Message */}
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

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
  IonCheckbox,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
  IonRouterLink
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const RegisterGym: React.FC = () => {
  const history = useHistory();

  // Checkbox state for agreeing to Terms & Conditions
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRegister = () => {
    if (!isTermsChecked) {
      alert("You must agree to the Terms & Conditions before registering.");
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

              {/* Terms & Conditions Checkbox */}
              <IonItem lines="none">
                <IonCheckbox
                  checked={isTermsChecked}
                  onIonChange={(e) => setIsTermsChecked(e.detail.checked)}
                />
                <IonLabel className="terms-label">
                  By clicking submit, you agree to our{" "}
                  <strong className="terms-link" onClick={() => setShowTermsModal(true)}>
                    Terms & Conditions
                  </strong>.
                </IonLabel>
              </IonItem>

              {/* Submit Button (Disabled until checkbox is checked) */}
              <div className="button-container">
                <IonButton 
                  expand="block" 
                  className="sign-in-button" 
                  onClick={handleRegister} 
                  disabled={!isTermsChecked}
                >
                  Submit
                </IonButton>
                <IonRouterLink href="/home" className="signin-link">
                  Already have an account? <strong>Sign In</strong>
                </IonRouterLink>
              </div>

            </IonCardContent>
          </IonCard>
        </div>

        {/* Terms & Conditions Modal */}
        <IonModal isOpen={showTermsModal} onDidDismiss={() => setShowTermsModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Terms & Conditions</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowTermsModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>By using our service, you agree to the following terms and conditions...</p>
            <p>[Insert your Terms & Conditions here]</p>
          </IonContent>
        </IonModal>

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

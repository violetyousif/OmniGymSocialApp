
/**
 * The Profile page represents users profile on the OmniGym Social App.
 * It uses Ionic components to structure the page layout.
 */

import React, { useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonButtons, 
  createAnimation, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Profile.css';


const Profile: React.FC = () => {
  const modalEl = useRef<HTMLIonModalElement>(null);
  const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot!;

    const backdropAnimation = createAnimation()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = createAnimation()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction('reverse');
  };

  const openModal = () => {
    modalEl.current?.present();
  };

  const closeModal = () => {
    modalEl.current?.dismiss();
  };

  const toggleAccordion = () => {
    if (!accordionGroup.current) return;
    const nativeEl = accordionGroup.current;

    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Omnigym.</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="top-bar">
          <img src="/src/pages/images/DarkGreyLogo.png" alt="logo" className="logo-image" />
          <IonButton shape="round" className="message-button">
            <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline}></IonIcon>
          </IonButton>
        </div>


        {/* Clickable Profile Image */}
        <div className="profile-container">
          <img
            src="/src/pages/images/profilepicture.jpg"
            alt="profile"
            className="profile-image"
            onClick={openModal}
          />
          <h1 className="profile-name">Jane Doe</h1>
        </div>

        {/* Modal for Enlarged Image */}
        <IonModal ref={modalEl} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Profile Image</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeModal}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <img src="/src/pages/images/profilepicture.jpg" alt="Profile Large" className="modal-image" />
          </IonContent>
        </IonModal>

        {/* Accordion Section */}
        <div className="content-container">
          <p>gedgnd</p>
        <IonAccordionGroup ref={accordionGroup}>
          <IonAccordion value="first">
            <IonItem slot="header" color="light">
              <IonLabel>About Me</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              First Content
            </div>
          </IonAccordion>

          <IonAccordion value="second">
            <IonItem slot="header" color="light">
              <IonLabel>Gym Stats</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Second Content
            </div>
          </IonAccordion>

          <IonAccordion value="third">
            <IonItem slot="header" color="light">
              <IonLabel>Third Accordion</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              Third Content
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonButtons, 
  createAnimation, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/react';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import './Profile.css';

const Profile: React.FC = () => {
  const modalEl = useRef<HTMLIonModalElement>(null);

  // State to track which content is displayed in the card
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'info'>('about');

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Omnigym.</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Top Icons on Profile: short logo and message button */}
      <IonContent className="ion-padding" fullscreen>
        <div className="top-bar">
          <img src="/src/pages/images/DarkGreyLogo.png" alt="logo" className="logo-image" />
          <IonButton shape="round" className="message-button">
            <IonIcon slot="icon-only" icon={chatbubbleEllipsesOutline}></IonIcon>
          </IonButton>
        </div>

        {/* Profile Section */}
        <div className="profile-container">
          <img
            src="/src/pages/images/profilepicture.jpg"
            alt="profile"
            className="profile-image"
            onClick={openModal}
          />
          <h1 className="profile-name">Jane Doe</h1>
        </div>

        {/* Modal for Enlarging Image */}
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

        {/* Single Card that Changes Content Based on Button Click */}
        <div className="card-container">
          <IonCard>
            {/* Buttons to Switch Between Different Tabs */}
            <div className="card-buttons">
              <IonButton fill="clear" onClick={() => setActiveTab('about')}>About</IonButton>
              <IonButton fill="clear" onClick={() => setActiveTab('stats')}>Stats</IonButton>
              <IonButton fill="clear" onClick={() => setActiveTab('info')}>Workout Partners</IonButton>
            </div>
            <IonCardHeader>
              <IonCardTitle className="ion-card-title">
                {activeTab === 'about' && 'About'}
                {activeTab === 'stats' && 'Stats'}
                {activeTab === 'info' && 'Friends'}
              </IonCardTitle>
              <IonCardSubtitle className="ion-card-subtitle">
                {activeTab === 'about' && 'Personal Bio'}
                {activeTab === 'stats' && 'My Progress'}
                {activeTab === 'info' && 'Fitness Journey'}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="ion-card-content">
              {activeTab === 'about' && (
                <p>Hi, I'm Jane! I love fitness and helping others reach their goals.</p>
              )}
              {activeTab === 'stats' && (
                <p>Workouts completed: 120 <br /> Best Lift: 250 lbs Deadlift</p>
              )}
              {activeTab === 'info' && (
                <p>I started my fitness journey 3 years ago and love trying new workouts.</p>
              )}
            </IonCardContent>


          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

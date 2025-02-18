import React, { useState, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonButtons, 
  createAnimation, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // For navigation after sign-out
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import './Profile.css';

const Profile: React.FC = () => {
  const modalEl = useRef<HTMLIonModalElement>(null);
  const history = useHistory(); // Hook for navigation

  // const [fullName, setFullName] = useState<string>(firstName, lastName) => {
  //   // Replace with actual logic to fetch user's name from imported table data
  //   const userName = "Jane Doe" || fullName; // Example user name
  //   return userName;
  // });

  // State to track which content is displayed in the card
  const [activeTab, setActiveTab] = useState<'about' | 'stats' | 'gym friends'>('about');

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

  // Logout User Function
  const logoutUser = () => {
    // Add authentication sign-out logic here (if using Firebase, Auth0, etc.)
    console.log("User logged out");

    // Redirect to Home (Sign In) page after sign-out
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Omnigym.</IonTitle>
          {/* Logout User Button aligned to the right */}
          <IonButtons slot="end">
            <IonButton onClick={logoutUser} className="logout-button">
              Logout
            </IonButton>
          </IonButtons>
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
              <IonButton fill="clear" onClick={() => setActiveTab('stats')}>Fitness Stats</IonButton>
              <IonButton fill="clear" onClick={() => setActiveTab('gym friends')}>Friends</IonButton>
            </div>
            <IonCardHeader>
              <IonCardTitle className="ion-card-title">
                {activeTab === 'about' && 'About'}
                {activeTab === 'stats' && 'Fitness Stats'}
                {activeTab === 'gym friends' && 'Friends List'}
              </IonCardTitle>
              <IonCardSubtitle className="ion-card-subtitle">
                {activeTab === 'about' && 'Open to being approached: Sometimes.'}
                {activeTab === 'stats' && 'My Progress'}
                {activeTab === 'gym friends' && 'Friends List'}
              </IonCardSubtitle>
            </IonCardHeader>

            {/* About Section: Change values based on imported table data */}
            <IonCardContent className="ion-card-content">
              {activeTab === 'about' && (
                <div className="about-section">
                  <p className="about-caption">Hi, I'm Jane! I love fitness and helping others reach their goals.</p>
                  <p>Gym Goal:</p><span id="gym-goal">Strength Training</span>
                  <p>PR Song:</p><span id="pr-song">GODDESS by Written by Wolves</span>
                  <p>Favorite Exercise:</p><span id="favorite-exercise">Deadlifts</span>
                  <p>Wilks 2 Score:</p><span id="wilks 2 score">366</span>
                </div>
              )}
              {activeTab === 'stats' && (
                <div className="stats-section">
                  <p>Trophies:</p><span className="trophies">2 won</span>
                  <p>PR Deadlift: </p><span id="pr-deadlift-weight">245lbs</span>
                  <p>PR Deadlift Reps: </p><span id="pr-deadlift-reps">6</span>
                  <p>PR Deadlift: </p><span id="pr-benchpress-weight">105lbs</span>
                  <p>PR Deadlift Reps: </p><span id="pr-benchpress-reps">4</span>
                  <p>PR Deadlift: </p><span id="pr-squats-weight">155lbs</span>
                  <p>PR Deadlift Reps: </p><span id="pr-squats-reps">10</span>
                </div>
              )}
              {activeTab === 'gym friends' && (
                <p>Become Jane's first friend!</p>
              )}
            </IonCardContent>


          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

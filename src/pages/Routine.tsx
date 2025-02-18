import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Routine.css';

const Routine: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Routine page" />
      </IonContent>
    </IonPage>
  );
};

export default Routine;
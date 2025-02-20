import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personOutline, clipboardOutline, settingsOutline } from 'ionicons/icons';
import Profile from './pages/Profile';
import Routine from './pages/Routine';
import Settings from './pages/Settings';
import Home from './pages/Home';  // Import your Home page
import RegisterGym from './pages/RegisterGym'; // Ensure this path is correct and the file exists

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';  // For dark mode

/* Theme variables */
import './theme/variables.css';


setupIonicReact();

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            {/* Routes where the tab bar should NOT be shown */}
            <Route exact path="/home" component={Home} />
            <Route exact path="/register-gym" component={RegisterGym} />

            {/* Routes where the tab bar SHOULD be shown */}
            <Route>
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/routine" component={Routine} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/">
                    <Redirect to="/profile" /> {/* Default to Profile if no route is found */}
                  </Route>
                </IonRouterOutlet>

                {/* Tab Bar (Only shown for Profile, Routine, and Settings) */}
                <IonTabBar slot="bottom">
                  <IonTabButton tab="profile" href="/profile">
                    <IonIcon aria-hidden="true" icon={personOutline} />
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="routine" href="/routine">
                    <IonIcon aria-hidden="true" icon={clipboardOutline} />
                    <IonLabel>Routine</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="settings" href="/settings">
                    <IonIcon aria-hidden="true" icon={settingsOutline} />
                    <IonLabel>Settings</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
);

export default App;

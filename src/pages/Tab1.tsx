import {IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { CordovaPluginTwilioVoiceSdk } from '@ionic-native/cordova-plugin-twiliovoicesdk'
import {useEffect, useState} from "react";
import {LocalNotifications} from "@capacitor/local-notifications";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from "@ionic/angular";
let Twilio:any;
const TOKEN_URL = "https://quickstart-ios-server-7675-dev.twil.io/access-token?identity=test";
const Tab1: React.FC = () => {
  const [token, setToken] = useState(null);
  const [target, setTarget] = useState('');
  useEffect(()=> {
    async function doStuffAfterTwilioPluginLoaded() {
      try {
        // permission stuff
        const androidPermissions = new AndroidPermissions();
        const result = await androidPermissions.checkPermission(androidPermissions.PERMISSION.RECORD_AUDIO);
        if(!result.hasPermission) {
          await androidPermissions.requestPermissions([androidPermissions.PERMISSION.RECORD_AUDIO]);
        }

        // const resp = await axios.get(TOKEN_URL);
        // console.log("resp.data",resp.data);
        // setToken(resp.data);
        await CordovaPluginTwilioVoiceSdk.load();
        // @ts-ignore
        Twilio = window.Twilio;
        if(!Twilio) {
          alert("No twilio");
          throw new Error("Twilio plugin load failure");
        }
        Twilio.TwilioVoiceClient.initialize("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzA0NmUyZmUyOGJhNzEzNGY1ZjIwNWRlMjE4MjczMWJhLTE2MjQ4ODY0ODEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJtYWsiLCJ2b2ljZSI6eyJpbmNvbWluZyI6eyJhbGxvdyI6dHJ1ZX0sIm91dGdvaW5nIjp7ImFwcGxpY2F0aW9uX3NpZCI6IkFQNjY2MGVkNWJkMDgwNGVlMzkyYjMxZjQzNmM2MzUxMzQifSwicHVzaF9jcmVkZW50aWFsX3NpZCI6IkNSOWFiMDdjMGQ4YTA1ZTcwN2M0ZDM1MWEwZTNhYWQ2MGYifX0sImlhdCI6MTYyNDg4NjQ4MSwiZXhwIjoxNjI0ODkwMDgxLCJpc3MiOiJTSzA0NmUyZmUyOGJhNzEzNGY1ZjIwNWRlMjE4MjczMWJhIiwic3ViIjoiQUNhOTNlNzc3YWRlMGQxY2YzZjhkOWIxY2ExOTQ0NTU5NyJ9.EBLo1NiPYA20iqJuvAYKcq6XrPbUnLQfangueR63MrE");

        Twilio.TwilioVoiceClient.clientinitialized(function() {
          alert("Ready to start call")
          //$('#statusMessage').text('Ready to start call');
        });


        // Accept or reject a call - only needed on Android - iOS uses CallKit

        Twilio.TwilioVoiceClient.callinvitereceived(function(call:any) {
          LocalNotifications.schedule({
            notifications: [
              {
                id: 1,
                title: "title",
                body: "body"
              }
            ],
          });
        });


        // Handle Errors
        Twilio.TwilioVoiceClient.error(function(error:any) {
          alert("error :- " + JSON.stringify(error))

        });

        // Handle Call Connection
        Twilio.TwilioVoiceClient.calldidconnect(function(call:any) {
          // $('#statusMessage').text("Successfully established call");
          // $('#dialButton').toggle();
          // $('#hangupButton').toggle();

        });

        // Handle Call Disconnect
        Twilio.TwilioVoiceClient.calldiddisconnect(function(call:any) {
          // $('#statusMessage').text("Call ended");
          // $('#dialButton').toggle();
          // $('#hangupButton').toggle();
        });
        // }
        // tokenRequest.open('GET', 'https://4000143aa0f8.ngrok.io/access-token');
        // tokenRequest.send();
      }catch(e) {
        console.log(e);
      }
    }

    doStuffAfterTwilioPluginLoaded();
  }, []);

  function onClick() {
    console.log("onClick");
    Twilio.TwilioVoiceClient.call(token, target);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />
        {(token?<IonButton color="primary" onClick={onClick}>Primary</IonButton>:'')}
        <IonInput value={target} onIonChange={e => setTarget(e.detail.value!)}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

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
// APP_SID=APfd58bbc7855e44242865b247be64e906
// PUSH_CREDENTIAL_SID=CR80b251e4ced8361207633558e40852ab
const Tab1: React.FC = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzA0NmUyZmUyOGJhNzEzNGY1ZjIwNWRlMjE4MjczMWJhLTE2MjU1NjYyNjAiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJhbmV3aW9zIiwidm9pY2UiOnsiaW5jb21pbmciOnsiYWxsb3ciOnRydWV9LCJvdXRnb2luZyI6eyJhcHBsaWNhdGlvbl9zaWQiOiJBUDRjMTJlMGIzMmM1ZmY5MjQxMWQzOTRiMzJhZWNjYTg5In19fSwiaWF0IjoxNjI1NTY2MjYwLCJleHAiOjE2MjU1Njk4NjAsImlzcyI6IlNLMDQ2ZTJmZTI4YmE3MTM0ZjVmMjA1ZGUyMTgyNzMxYmEiLCJzdWIiOiJBQ2E5M2U3NzdhZGUwZDFjZjNmOGQ5YjFjYTE5NDQ1NTk3In0.EwUElUJrvgBVJpwdx8DgplGC4Z8qrgbzxIX-njqJYAI";
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
        alert("Starting to load");
        console.log(".laod");
        let cordovaTwilioSDkObject = CordovaPluginTwilioVoiceSdk.create();
        cordovaTwilioSDkObject.load();
        alert("loaded");
        // @ts-ignore
        Twilio = window.Twilio;
        if(!Twilio) {
          alert("No twilio");
          throw new Error("Twilio plugin load failure");
        }
        Twilio.TwilioVoiceClient.initialize(token);

        Twilio.TwilioVoiceClient.clientinitialized(function() {
          console.log("init success!");
          alert("Ready to start call")
          //$('#statusMessage').text('Ready to start call');
        });


        // Accept or reject a call - only needed on Android - iOS uses CallKit

        Twilio.TwilioVoiceClient.callinvitereceived(function(call:any) {
          alert("incoming");
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
    alert("onClick "+target);
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
        <IonButton color="primary" onClick={onClick}>Primary</IonButton>
        <IonInput value={target} onIonChange={e => setTarget(e.detail.value!)}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

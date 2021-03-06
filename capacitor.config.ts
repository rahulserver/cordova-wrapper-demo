import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rahulserver.cordovademo',
  appName: 'twilio-demo',
  webDir: 'build',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      "INCOMING_CALL_APP_NAME": "foo"
    },
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "splash",
      iconColor: "#488AFF",
      sound: "beep.wav",
    }
  },
};

export default config;

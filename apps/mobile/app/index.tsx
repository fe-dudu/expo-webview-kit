import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

SystemUI.setBackgroundColorAsync('#ffffff');

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'http://localhost:5173' }}
          allowsBackForwardNavigationGestures={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </>
  );
}

import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'

export default function App() {
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const webviewRef = useRef(null)

  backButtonHandler = () => {
    console.log('back')
    if (webviewRef.current) webviewRef.current.goBack()
    return true
  }

  frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward()
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);

    }
  }, [])

  return (
    <WebView
      source={{
        uri: 'http://alllisterapi.ddns.net/vendor'
      }}
      style={{ marginTop: Constants.statusBarHeight }}
      renderLoading={() => (
        <ActivityIndicator
          color='black'
          size='large'
          style={styles.flexContainer}
        />
      )}
      ref={webviewRef}
      onNavigationStateChange={navState => {
        setCanGoBack(navState.canGoBack)
        setCanGoForward(navState.canGoForward)
        setCurrentUrl(navState.url)
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

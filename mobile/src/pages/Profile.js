import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile( { navigation } ) {

    const userName = navigation.getParam('github_username');

    return(
        <WebView source={ {uri: `http://github.com/${userName}`}} style={{flex: 1}}/>
    );
}

export default Profile;
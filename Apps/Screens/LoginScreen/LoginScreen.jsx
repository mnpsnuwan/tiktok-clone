import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { supabase } from '../../Utils/SupabaseConfig';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });

        // Supabase
        if(signUp?.emailAddress){
          const { data, error } = await supabase
          .from('USERS')
          .insert([
            { name: signUp?.firstName, 
              email: signUp?.emailAddress,
              username: (signUp?.emailAddress).split('@')[0] },
          ])
          .select()
          if(data)
            {
              console.log(data)
            }        
        }
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{
        flex:1
        }}>
      <Video 
        style={styles.video}
        source={{
          uri: 'https://cdn.pixabay.com/video/2021/03/08/67358-521707474_large.mp4',
        }}
        shouldPlay
        resizeMode='cover'
        isLooping={true}
        />
        <View style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 100,
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: Colors.BACKGROUND_TRANSPARENT
        }}>
            <View>
                <Image source={require('../../../assets/images/tactic.png')}
                style={{
                    width:100,
                    height: 100
                }}/>
            </View>
            <Text style={{
                fontFamily: 'UbuntuBold',
                color: Colors.WHITE,
                fontSize: 35
            }}
            >TacTic</Text>
            <Text style={{
                fontFamily: 'UbuntuRegular',
                color: Colors.WHITE,
                fontSize: 17,
                textAlign: 'center',
                marginTop: 15
            }}>Ultimate place to share your thoughts as short videos with great community!</Text>
            <TouchableOpacity onPress={ onPress }
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexDirection: 'row',
                backgroundColor: Colors.WHITE,
                padding: 10,
                paddingHorizontal: 60,
                borderRadius: 30,
                position: 'absolute',
                bottom: 150
            }}>
                <Image source={require('../../../assets/images/google.png')}
                        style={{
                            width:30,
                            height: 30
                        }}/>
                <Text style={{
                        fontFamily: 'UbuntuRegular'
                    }}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: 1000,
    position: 'absolute',
    alignContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../Utils/SupabaseConfig';

export default function HomeScreen() {
    const {user} = useUser();

    useEffect(() => {
        user&&updateProfileImage();
    }, [user])

    const updateProfileImage = async() => {
        const {data, error} = await supabase.from('Users')
        .update({'profile_image':user?.imageUrl})
        .eq('email',user?.primaryEmailAddress?.emailAddress)
        .is('profile_image', null)
        .select();
        console.log(data)
    }

    return (
        <View style={{
            padding: 20,
        }}>
        <Text>HomeScreen</Text>
        </View>
    )
}
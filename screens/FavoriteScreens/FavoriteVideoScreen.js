import React, {useState, useRef, useMemo} from 'react';
import {Image,
    Text,
    StyleSheet,
    View,
    SafeAreaView
}
from 'react-native';
import { FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {COLOR, SCREEN_WIDTH} from '../../constant';
import VideoItem from '../../components/VideoItem';
import BottomSheet from '@gorhom/bottom-sheet';
import VideoScreen from './VideoScreen';

function FavoriteVideoScreen({navigation})
{
    const likedVideos = useMemo(()=> [
        { description : "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    sources :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" ,
    subtitle : "By Blender Foundation",
    thumb : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    title : "Big Buck Bunny"
  },
  { description : "The first Blender Open Movie from 2006",
    sources :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" ,
    subtitle : "By Blender Foundation",
    thumb : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    title : "Elephant Dream"
  },
  { description : "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    sources :  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" ,
    subtitle : "By Google",
    thumb : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    title : "For Bigger Blazes"
  }],[])
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%','90%'], []);

    return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.layoutContainer}>
            <View style = {styles.header}>
                <Text style = {styles.headerText}>Video yêu thích</Text>
            </View>
            <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={likedVideos}
            keyExtractor = {(item)=> item.title}
            renderItem={({item,index, sep})=>(
            <View style={{width:SCREEN_WIDTH}}>
                <VideoItem image={{uri: item.thumb}}
                    isLiked = {true}
                    onPress = {()=>{
                        var data = {videoUrl: item.sources};
                        navigation.push('VideoScreen', data);
                    }}
                    />
            </View>
            )}
            />
        </View>
        
    </SafeAreaView>
    
    )
    
};

const styles = StyleSheet.create({
    layoutContainer:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.85)",
    },
    header: {
        padding: 10, 
        marginTop: 30,
        textAlign: 'left',
        alignItems:'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLOR.WHITE
    },
})

export default FavoriteVideoScreen;
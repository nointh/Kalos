import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';
import { COLOR } from '../constant';
import { SearchBar } from "react-native-elements";
//Bottom Sheet

import SheetExerciseDetail from "../components/SheetExerciseDetail";
import { useRef } from "react";
import { useState } from "react";
import SheetFilter from '../components/SheetFilter';

//test data
// import exercisesData from "../assets/testData/exercisesData";
import {NTN_host} from '../host';
import {_EXAMPLE_TOKEN} from '../constant'

function ExerciseScreen() {
    const ExerciseURL = NTN_host + "/api/exercises";
    const [exercisesData, setExercisesData] = useState([]);
    // fetch exercise data 
    useEffect(()=>{
        try{
            fetch(ExerciseURL)
            .then(response => response.json())
            .then((data) =>{
                setExercisesData(data["exercises"]);
            })
            .catch((e) =>{
                console.log(e);
                throw e            
            })
        }
        catch(e) 
        {
            console.log("there is errors " + error);
        }
    });
    //render exercise item
    const renderExerciseItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.exerciseWrapper}
                onPress={() => handleBottomSheet(item)}>
                <View style={styles.exerciseLeftWrapper}>
                    <Image
                        style={styles.exerciseImage}
                        // source={require('../assets/images/InclinePushUps.png')}
                        source={{uri: item.image}}
                    ></Image>
                </View>
                <View style={styles.exerciseRightWrapper}>
                    <Text
                        style={styles.exerciseName}
                        numberOfLines={2}>{item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    //Bottom sheet exercise detail
    //ref + state for sheet
    const bottomSheetRef = useRef(null);
    const sheetFilterRef = useRef(null);
    const [exerciseDetail, setExerciseDetail] = useState(null);

    //handle bottom sheet
    const handleBottomSheet = (item) => {
        setExerciseDetail(item);
        bottomSheetRef.current.snapTo(0);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tất Cả Bài Tập</Text>

            {/* Search bar */}
            <View style={styles.searchWrapper}>
                <SearchBar
                    containerStyle={styles.search}
                    inputStyle={styles.searchInput}
                    placeholder="Tìm Kiếm"
                    inputContainerStyle={styles.searchInput}
                    platform="android"
                />
                {/* exercise filter */}
                <TouchableOpacity 
                    style={styles.searchFilter}
                    onPress={() => sheetFilterRef.current.snapTo(0)}>
                    <Icon
                        name="filter-alt"
                        type="material"
                        size={22}
                        color="white"></Icon>
                </TouchableOpacity>
            </View>

            {/* List Exercise */}
            <FlatList
                style={styles.ListExercise}
                data={exercisesData}
                renderItem={renderExerciseItem}
                keyExtractor={item => `${item._id}`}
                showsVerticalScrollIndicator={false}>
            </FlatList>

            {/*Bottom Sheet Exercise Detail */}
            <SheetExerciseDetail
                bottomSheetRef={bottomSheetRef}
                exerciseDetail={exerciseDetail}>
            </SheetExerciseDetail>
            {/* Exercise Filter */}
            <SheetFilter
                sheetFilterRef={sheetFilterRef}>
            </SheetFilter>
                
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        backgroundColor: COLOR.MATTE_BLACK,
    },
    title: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: 'white',
        
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
    },
    search: {
        flex: 1,
        borderRadius: 20,
        marginRight: 10,

    },
    searchInput: {
        height: 20,

    },
    searchFilter: {
        
    },
    ListExercise: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    exerciseWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        height: 80,
    },
    exerciseLeftWrapper: {
    },
    exerciseRightWrapper: {
        flex: 1,
    },
    exerciseImage: {
        resizeMode: "center",
        height: 80,
        width: 100,
        borderRadius: 30,

    },
    exerciseName: {
        marginLeft: 20,
        marginRight: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
});

export default ExerciseScreen;
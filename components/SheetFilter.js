import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { COLOR } from '../constant';
import { useState } from "react";


export default function SheetFilter({ sheetFilterRef }) {

    // test data: level, muscleGroup, equipment
    const levels = [
        'Tất Cả',
        'Người Mới',
        'Trung Bình',
        'Nâng Cao'
    ];
    const muscleGroups = [
        'Ngực',
        'Vai',
        'Tay Sau',
        'Xô',
        'Tay Trước',
        'Chân',
        'Bụng'
    ];
    const equipments = [
        'Có Dụng Cụ',
        'Không Dụng Cụ',
    ];

    //state cho việc nhấn vào từng item
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);

    //handle press function: highlight item khi nhấn vào item
    const handleLevelPress = (index) => {
        setSelectedLevel(index);
    }
    const handleMuscleGroupPress = (index) => {
        setSelectedMuscleGroup(index);
    }
    const handleEquipmentPress = (index) => {
        setSelectedEquipment(index);
    }

    //handle apply fitler: lấy dữ liệu đã chọn -> đóng bottom sheet và filter vào flatlist các bài tập
    const handleApplyFilter = () => {
        sheetFilterRef.current.snapTo(1);
    }

    //render nội dung bên trong bottom sheet
    const renderContent = () => (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Lọc Bài Tập</Text>
            <ScrollView style={styles.bodyWrapper}>

                {/* level */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Độ Khó</Text>
                    <View style={styles.groupListItem}>
                        {levels.map((item, index) => {

                            //kiểm tra level item có phải là selectedLevel hay không?
                            const bgColor = index === selectedLevel ? COLOR.LIGHT_BROWN : COLOR.LIGHT_GREY;
                            const fontColor = index === selectedLevel ? 'white' : 'black';

                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.groupItem, { backgroundColor: bgColor }]}
                                    onPress={() => handleLevelPress(index)}>
                                    <Text style={[styles.groupItemText, { color: fontColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                {/* muscleGroup */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Nhóm Cơ</Text>
                    <View style={styles.groupListItem}>
                        {muscleGroups.map((item, index) => {

                            //kiểm tra level item có phải là selectedLevel hay không?
                            const bgColor = index === selectedMuscleGroup ? COLOR.LIGHT_BROWN : COLOR.LIGHT_GREY;
                            const fontColor = index === selectedMuscleGroup ? 'white' : 'black';

                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.groupItem, { backgroundColor: bgColor }]}
                                    onPress={() => handleMuscleGroupPress(index)}>
                                    <Text style={[styles.groupItemText, { color: fontColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                {/* equipment */}
                <View style={styles.groupWrapper}>
                    <Text style={styles.groupTitle}>Dụng Cụ</Text>
                    <View style={styles.groupListItem}>
                        {equipments.map((item, index) => {

                            //kiểm tra level item có phải là selectedLevel hay không?
                            const bgColor = index === selectedEquipment ? COLOR.LIGHT_BROWN : COLOR.LIGHT_GREY;
                            const fontColor = index === selectedEquipment ? 'white' : 'black';

                            return (
                                <TouchableOpacity
                                    key={item}
                                    style={[styles.groupItem, { backgroundColor: bgColor }]}
                                    onPress={() => handleEquipmentPress(index)}>
                                    <Text style={[styles.groupItemText, { color: fontColor }]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                {/* apply filter button */}
                <TouchableOpacity
                    style={styles.applyFilter}
                    onPress={handleApplyFilter}>
                    <Text style={styles.applyFilterText}>Áp Dụng</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

    //render header của bottom sheet
    const renderHeader = () => (
        <View style={styles.HeaderWrapper}>
            <View style={styles.HeaderIcon}></View>
        </View>
    )

    //bottom sheet
    return (
        <BottomSheet
            ref={sheetFilterRef}
            snapPoints={['100%', 0]}
            initialSnap={1}
            renderContent={renderContent}
            renderHeader={renderHeader}
            enabledInnerScrolling
            enabledContentGestureInteraction={false}>
        </BottomSheet>

    )
}

const styles = StyleSheet.create({
    HeaderWrapper: {
        backgroundColor: 'black',
        alignItems: "center",
        height: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    HeaderIcon: {
        marginTop: 10,
        borderWidth: 2,
        width: 50,
        borderRadius: 40,
        borderColor: 'white',
    },
    wrapper: {
        backgroundColor: COLOR.MATTE_BLACK,
        height: '100%',
        paddingBottom: 100,
    },
    title: {
        alignSelf: "center",
        marginVertical: 10,
        color: 'white',
        fontWeight: "bold",
        fontSize: 20,
    },
    groupWrapper: {
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    groupTitle: {
        fontWeight: "bold",
        color: COLOR.LIGHT_GREY,
        fontSize: 18,
        marginBottom: 10,
    },
    groupListItem: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        width: '100%',
    },
    groupItem: {
        margin: 8,
        backgroundColor: COLOR.LIGHT_GREY,
        padding: 15,
        borderRadius: 8,
        width: '45%',
        alignItems: "center",
    },
    groupItemText: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 16,
    },
    applyFilter: {
        backgroundColor: COLOR.ORANGE,
        marginHorizontal: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        marginTop: 16,
        marginBottom: 10,
    },
    applyFilterText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
});
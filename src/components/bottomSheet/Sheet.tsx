import {View} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useMemo, useRef, useState} from 'react';
import Card from './card/Card';
import {styles} from './styles';
import {FilteredData} from 'interface/types';
const Sheet = ({filteredData}: FilteredData) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '50%', '90%'], []);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      style={{
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#FAFAFA',
      }}
      handleStyle={{marginBottom: 10}}
      handleIndicatorStyle={styles.IndicatorStyle}>
      <BottomSheetFlatList
        data={filteredData}
        keyExtractor={(item, i) => i.toString()}
        ItemSeparatorComponent={() => <View style={styles.Seperator} />}
        initialNumToRender={10}
        renderItem={item => (
          <Card
            key={item.item.id}
            id={item.item.id}
            amount={item.item.amount}
            unit={item.item.unit}
            createdAt={item.item.createdAt}
          />
        )}
      />
    </BottomSheet>
  );
};

export default Sheet;

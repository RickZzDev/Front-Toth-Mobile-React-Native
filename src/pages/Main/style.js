import styled from 'styled-components/native'
// import {Animated} from 'react-native'
import {StyleSheet,Platform} from 'react-native'
import {Dimensions, PixelRatio} from 'react-native';

const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel(screenWidth * parseFloat(widthPercent) / 100);
};

const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
return PixelRatio.roundToNearestPixel(screenHeight * parseFloat(heightPercent) / 100);
};


export const FundoHeader = styled.View`
    background:#378ce4;
    border-bottom-left-radius:120px;
    justify-content:center;
    align-items:center;
    flex:1;


`


export const Logo = styled.Image`
    flex:1;
    height:250;
    width:250;
`

export const TextBemVindo = styled.Text`
    color:white;
    font-size:17px;
    margin-left:auto;
    margin-right:25;
    margin-bottom:25;
`

export const CaixaEmail=styled.View`
    align-self:center;
    margin-top:50px;
    height: ${heightPercentageToDP('8%')}px;
    width:80%;
    background:#e8e8e8;
    border-radius:100px;
    align-items:center;
    padding: 0px 20px;
    flex-direction:row;
    elevation:5;

`

export const CaixaSenha=styled.View`
    align-self:center;
    margin-top:30px;
    height: ${heightPercentageToDP('8%')}px;
    width:80%;
    background:#e8e8e8;
    border-radius:100px;
    align-items:center;
    padding: 0px 20px;
    flex-direction:row;
    elevation:5;
`

export const InputEmail = styled.TextInput`
    width:100%;
    height:100%;
    border-radius:100px;
    padding: 0px 10px;
    
`

export const InputSenha = styled.TextInput`
    width:100%;
    height:100%;
    border-radius:100px;
    padding: 0px 10px;
`

export const Botao = styled.TouchableOpacity`
    background:#378ce4;
    align-self:center;
    margin-top:${heightPercentageToDP('5%')}
    border-radius:100px;
    padding:0 20px;
    width:80%;
    align-items:center;
    height:${heightPercentageToDP('5%')};
    justify-content:center;
    elevation:5;
`

export const TextBottao = styled.Text`
    color:white;
    font-size:17px;
`
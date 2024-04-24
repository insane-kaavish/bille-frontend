import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const OuterContainer = styled(View)`
  flex: 1;
  align-items: center;
`;

export const StyledTitle = styled(Text)`
  font-size: 17px;
`;

export const WidgetContainer = styled(View)`
  width: 280px;
  height: 270px;
`;

export const Container = styled(View)`
  width: 100%;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SingleItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 3px 0;
`;

export const ColorIcon = styled(View)`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
`;

export const Label = styled(Text)`
  margin-left: 5px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "normal")};
`;


export const DonutChartContainer = styled(View)`
  margin: 20px 40px 0 40px;
`;

export const DonutInnerText = styled(TouchableOpacity)`
  width: 100px;
  height: 65px;
  font-size: 13px;
  position: absolute;
  top: 50%;
  left: 50%; 
  justify-content: center;
  align-items: center;
  text-align: center;
`;

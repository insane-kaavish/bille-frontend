import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Svg, G } from "react-native-svg";
import { pie } from "d3-shape";

import PieSlice from "./DonutSlice";
import { DonutChartContainer, DonutInnerText } from '../Styles'; 


const Pie = ({ value, data, size, pieSize, onItemSelected }) => {
  const [arcs, setArcs] = useState(null);

  useEffect(() => {
    const calculatedArcs = pie().value(item => item.number)(data);
    setArcs(calculatedArcs);
  }, [data, pieSize]);

  return (
    arcs && (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <G transform="translate(100, 100)">
            {data.map(({ color }, index) => (
              <PieSlice
                key={`pie_shape_${index}`}
                color={color}
                onSelected={onItemSelected(index)}
                arcData={arcs[index]}
                isActive={value.index === index}
              />
            ))}
          </G>
        </Svg>
    )
  );
};

export default Pie;

import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_venn from '@amcharts/amcharts4/plugins/venn';

am4core.useTheme(am4themes_animated);

const CircleChartComponent = ({ chartId }) => {
  useEffect(() => {
    // Create chart instance
    let chart = am4core.create(chartId, am4plugins_venn.VennDiagram);

    // Add data
    let data = [
      { name: "A", value: 10 },
      { name: "B", value: 10 },
      { name: "C", value: 10 },
      { name: "X", value: 2, sets: ["A", "B"] },
      { name: "Y", value: 2, sets: ["A", "C"] },
      { name: "Z", value: 2, sets: ["B", "C"] },
      { name: "Q", value: 1, sets: ["A", "B", "C"] }
    ];

    let series = chart.series.push(new am4plugins_venn.VennSeries());
    series.dataFields.category = "name";
    series.dataFields.value = "value";
    series.dataFields.intersections = "sets";
    series.data = data;

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.marginTop = 40;

    // Clean up chart on component unmount
    return () => {
      chart.dispose();
    };
  }, [chartId]);

  return <div id={chartId} style={{ width: '100%', height:'100%' }} />;
};

export default CircleChartComponent;

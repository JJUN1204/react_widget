import React, { useEffect, useRef } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


import LineChartComponent from '../chart/LineChartComponent';
import BarChartComponent from '../chart/BarChartComponent ';
import PieChartComponent from '../chart/PieChartComponent ';
import RadarChartComponent from '../chart/RadarChartComponent ';
import CircleChartComponent from '../chart/CircleChartComponent';
import SolidGaugeComponent from '../chart/SolidGaugeComponent';
am4core.useTheme(am4themes_animated);

const GridItem = ({ item }) => {

  const renderChart = (chartType, chartId) => {
    switch (chartType) {
      case 'LineChart':
        return <LineChartComponent chartId={chartId} />;
      case 'BarChart':
        return <BarChartComponent chartId={chartId} />;
      case 'PieChart':
        return <PieChartComponent chartId={chartId} />;
      case 'RadarChart':
        return <RadarChartComponent chartId={chartId} />;
      case 'CircleChart':
        return <CircleChartComponent chartId={chartId} />;
      case 'SolidGauge':
        return <SolidGaugeComponent chartId={chartId} />;
      default:
        return null;
    }
  };


  return (
    <div data-grid={item} className="widget-item">
      <div className="widget-item-con">
        <div className="widget-item-con__head">
          <p className="widget-item-title">{item.chartType}</p>
        </div>
        <div className="widget-item-con__body">
          {renderChart(item.chartType, item.i)}
        </div>
      </div>
    </div>
  )
};

export default GridItem;

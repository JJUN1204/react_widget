import React, { useEffect, useState } from 'react';
import axios from 'axios';


// Grid 및 Resizable 스타일을 위한 CSS 파일 불러오기
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Grid Layout 관련 라이브러리 import
import { Responsive, WidthProvider } from 'react-grid-layout';

import LineChartComponent from '../component/chart/LineChartComponent';
import BarChartComponent from '../component/chart/BarChartComponent ';
import PieChartComponent from '../component/chart/PieChartComponent ';
import RadarChartComponent from '../component/chart/RadarChartComponent ';
import CircleChartComponent from '../component/chart/CircleChartComponent';
import SolidGaugeComponent from '../component/chart/SolidGaugeComponent';

// Grid 아이템 레이아웃 컴포넌트 import
import GridItem from '../component/layout/GridItem';


// ResponsiveGridLayout를 WidthProvider로 래핑하여 생성
const ResponsiveGridLayout = WidthProvider(Responsive);

const WidgetPage = () => {
    // Layout 상태를 관리하기 위한 useState 훅
  const [layouts, setLayouts] = useState([]);


   // 컴포넌트가 처음 렌더링될 때 fetchLayouts 함수를 호출하여 레이아웃 데이터를 가져옴
  useEffect(() => {
    fetchLayouts();
  }, []);

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


  // 서버로부터 레이아웃 데이터를 가져오는 함수
  const fetchLayouts = async () => {
    try {
      const response = await axios.get('http://cmcsv.com:1001/layouts');
      setLayouts(response.data)
    } catch (error) {
      console.error('Error fetching layouts:', error);
    }
  };

  return (
    <div style={{backgroundColor:'#f6f6f7'}}>
      {/* Main Content */}
      <main className="main">
         {/* layouts 배열을 순회하면서 각 layout에 대해 위젯을 생성 */}
        <section className="widget">
          <h2 className="hidden">위젯 목록</h2>
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layouts, md: layouts, sm: layouts, xs: layouts, xxs: layouts }}
            cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
            rowHeight={32}
            width={1400}
            isResizable={false}
            resizeHandles={['se']}
            breakpoints={{ lg: 1200, md: 1000, sm: 800, xs: 600, xxs: 400 }}
            compactType={'vertical'}
            useCSSTransforms={true}
            isDraggable={false}
          >
            {layouts.map(item => (
              <div key={item.i} data-grid={item} className="widget-item">
                <div className="widget-item-con">
                  <div className="widget-item-con__head">
                    <p className="widget-item-title">{item.chartType}</p>
                  </div>
                  <div className="widget-item-con__body">
                    {renderChart(item.chartType, item.i)}
                  </div>
                </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        </section>
      </main>
    </div>
  );
};

export default WidgetPage;

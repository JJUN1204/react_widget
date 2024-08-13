import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LineChartComponent from '../chart/LineChartComponent';
import BarChartComponent from '../chart/BarChartComponent ';
import PieChartComponent from '../chart/PieChartComponent ';
import RadarChartComponent from '../chart/RadarChartComponent ';
import CircleChartComponent from '../chart/CircleChartComponent';
import SolidGaugeComponent from '../chart/SolidGaugeComponent';

const ResponsiveGridLayout = WidthProvider(Responsive);

const ResponsiveGrid = ({ layouts, handleLayoutChange, deleteLayouts }) => {
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
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layouts, md: layouts, sm: layouts, xs: layouts, xxs: layouts }}
            cols={{ lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 }}
            rowHeight={32}
            width={1400}
            isResizable={true}
            onLayoutChange={handleLayoutChange}
            resizeHandles={['se']}
            breakpoints={{ lg: 1200, md: 1000, sm: 800, xs: 600, xxs: 400 }}
            compactType={'vertical'}
            useCSSTransforms={true}
            draggableHandle=".widget-item-con"
        >
            {layouts.map(item => (
                <div key={item.i} data-grid={item} className="widget-item">
                    <button className="widget-item-del" onClick={() => deleteLayouts(item.i)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
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
    );
};

export default ResponsiveGrid;

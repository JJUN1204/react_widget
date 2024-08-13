import React from 'react';
import sampleImage1 from '../../images/widget_sample_1.png';
import sampleImage2 from '../../images/widget_sample_2.png';
import sampleImage3 from '../../images/widget_sample_3.png';
import sampleImage4 from '../../images/widget_sample_4.png';
import sampleImage5 from '../../images/widget_sample_5.png';
import sampleImage6 from '../../images/widget_sample_6.png';
import RadarChart from '../../images/radarchart-lines.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const WidgetList = ({ addGridItem }) => (
    <div className="widget-add-list">
        {[
            { img: sampleImage1, type: 'BarChart', label: 'Bar Chart' },
            { img: sampleImage2, type: 'PieChart', label: 'Pie Chart' },
            { img: sampleImage3, type: 'LineChart', label: 'Line Chart' },
            { img: RadarChart, type: 'RadarChart', label: 'Radar Chart' },
            { img: sampleImage4, type: 'SolidGauge', label: 'Solid Gauge' },
            { img: sampleImage5, type: 'CircleChart', label: 'Circle Chart' }
        ].map(({ img, type, label }) => (
            <div className="widget-add-item" key={type}>
                <img src={img} alt={label} />
                <p>{label}</p>
                <button className="widget-item-add" onClick={() => addGridItem(type)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        ))}
    </div>
);

export default WidgetList;

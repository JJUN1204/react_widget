import React, { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { v4 as uuidv4 } from 'uuid';
import Header from '../component/layout/Header';
import WidgetList from '../component/layout/WidgetList';
import ResponsiveGrid from '../component/layout/ResponsiveGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const WidgetEditPage = () => {
    const [layouts, setLayouts] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        fetchLayouts();
    }, []);

    const onClickBack = () => {
        navigate(`/`);
    };

    const fetchLayouts = async () => {
        try {
            const response = await axios.get('http://cmcsv.com:1001/layouts');
            setLayouts(response.data);
            
        } catch (error) {
            console.error('Error fetching layouts:', error);
        }
    };

    const saveLayouts = async () => {
        try {
            const response = await axios.put('http://cmcsv.com:1001/saveLayouts', layouts);
            if (response.data.result === 'UPDATE_COMPLETE') {
                alert("저장완료");
            }
        } catch (e) {
            console.error('Error saving layouts:', e);
        }
    };

    const deleteLayouts = async (i) => {
        try {
            const response = await axios.delete(`http://cmcsv.com:1001/deleteLayout?i=${i}`);
            if (response.data.result === 'DELETE_COMPLETE') {
                setLayouts(prevLayouts => prevLayouts.filter(layout => layout.i !== i));
                
            }
        } catch (e) {
            console.error('Error deleting layouts:', e);
        }
    };

    const addGridItem = async (chartType) => {
        const columns = 12;
    
        const getNextPosition = (layouts) => {
            if (layouts.length === 0) {
                return { x: 0, y: 0 };
            }
    
            const maxY = Math.max(...layouts.map(layout => layout.y));
            const currentRowItems = layouts.filter(layout => layout.y === maxY);
    
            const maxXInRow = currentRowItems.length > 0 ? Math.max(...currentRowItems.map(item => item.x + item.w)) : 0;
    
            if (maxXInRow + 4 <= columns) {
                return { x: maxXInRow, y: maxY };
            } else {
                return { x: 0, y: maxY + 1 };
            }
        };
    
        const { x, y } = getNextPosition(layouts);

        const newItem = 
            {
                i: uuidv4(),
                x: x,
                y: y,
                w: 4,
                h: 8,
                minW: 4,
                maxW: 8,
                minH: 5,
                maxH: 10,
                static: false,
                chartType: chartType
            }
        

        setLayouts(prevLayouts => [...prevLayouts, newItem]);
    
        
    };
    
    

    const handleLayoutChange = (layout) => {
        setLayouts(prevLayouts => {
            return layout.map(layout => ({ ...prevLayouts.find(item => item.i === layout.i), ...layout }));
        });
    };

    return (
        <div>
            <main className="main">
                <section className="widget type-edit">
                    <h2 className="hidden">위젯 목록</h2>
                    <p className="widget-text">필요한 위젯을 홈 화면에 추가하세요.</p>
                    <div className="widget-add">
                        <WidgetList addGridItem={addGridItem} />
                    </div>
                    <p className="widget-text">
                        위젯을 움직여 순서를 변경할 수 있습니다.<br />
                        <span>* 화면 해상도에 따라 한 줄에 보이는 위젯 개수는 달라질 수 있습니다.</span>
                    </p>
                    <ResponsiveGrid
                        layouts={layouts}
                        handleLayoutChange={handleLayoutChange}
                        deleteLayouts={deleteLayouts}
                    />
                    <div className="widget-modify" style={{zIndex : 100}}>
                        <button
                            className="btn"
                            onClick={onClickBack}
                        >
                            <Link to={'/'}></Link>
                            <FontAwesomeIcon icon={faXmark} />
                            취소
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={saveLayouts}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                            저장
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default WidgetEditPage;

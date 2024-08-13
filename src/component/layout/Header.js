import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faGear, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { color } from '@amcharts/amcharts4/core';

const Header = () => (
    <header className="header">
        <div className="header-con">
            <h1 className="header-title">
                <Link to="/">
                    <FontAwesomeIcon icon={faLayerGroup} style={{color:'#7530F9'}} />
                    Dashboard
                </Link>
            </h1>
            <ul className="header-list">
                <li>
                    <Link to="/edit" className="ico-box">
                        <FontAwesomeIcon icon={faGear} />
                    </Link>
                </li>
                <li>
                    <button
                        className="ico-box"
                        onClick={() => {
                            document.documentElement.classList.add('load');
                            document.documentElement.classList.toggle('dark');
                            setTimeout(() => {
                                document.documentElement.classList.remove('load');
                            }, 300);
                        }}
                    >
                        <FontAwesomeIcon icon={faLightbulb} className="mode-light" />
                        <FontAwesomeIcon icon={faLightbulb} className="mode-dark" />
                    </button>
                </li>
            </ul>
        </div>
    </header>
);

export default Header;

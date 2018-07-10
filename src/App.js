import React, { Component } from 'react';
import './App.css';
import JsxCarousel from './components/JsxCarousel/JsxCarousel';

const slides = [
    {
        url: 'images/1_Fire-Ray.jpg',
        thumbnail: 'images/1_Fire-Ray-small.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 1',
            rightTitle: 'App',
            appName: 'app 1',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/2_Rig_Jockey.jpg',
        thumbnail: 'images/2_Rig_Jockey-small.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 2',
            rightTitle: 'App',
            appName: 'app 2',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/3_Real_life_adblock.jpg',
        thumbnail: 'images/3_Real_life_adblock-small.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 3',
            rightTitle: 'App',
            appName: 'app 3',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/4_Advanced_Farming_Assistant.jpg',
        thumbnail: 'images/4_Advanced_Farming_Assistant-small.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 4',
            rightTitle: 'App',
            appName: 'app 4',
            descriptionText: 'app... app.. app'
        },
    },
    {
        url: 'images/5_Perfect-_Rideshare_Helper.jpg',
        thumbnail: 'images/5_Perfect-_Rideshare_Helper-small.jpg',
        description: {
            leftTitle: 'Team',
            team: 'car 5',
            rightTitle: 'App',
            appName: 'app 5',
            descriptionText: 'app... app.. app'
        },
    }
];

class App extends Component {
    render() {
        return (
            <div className="App">
                <JsxCarousel slides={slides}/>
            </div>
        );
    }
}

export default App;

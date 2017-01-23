var React = require('react');
var PropTypes = React.PropTypes;
var Loading = require('../components/Loading');
var helpers = require('../utils/weatherUtils');
var getDate = helpers.getDate;
var convertTemp = helpers.convertTemp;

var styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 1200,
        margin: '50px auto'
    },
    dayContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 35
    },
    header: {
        fontSize: 65,
        color: '#333',
        fontWeight: 100,
        textAlign: 'center'
    },
    subheader: {
        fontSize: 30,
        color: '#333',
        fontWeight: 100
    },
    weather: {
        height: 130
    }
}

function DayItem(props) {
    var date = getDate(props.day.dt);
    var icon = props.day.weather[0].icon;
    return (
        <div style={styles.dayContainer}>
            <img style={styles.weather} src={'./app/images/weather-icons/' + icon + '.svg'} alt='Weather'/>
            <h2 style={styles.subheader}>{date}</h2>
        </div>
    )
}

function ForecastUI(props) {
    return (
        <div>
            <h1 style={styles.header}>{props.city}</h1>
            <div style={styles.container}>
                {props.forecast.list.map(function(listItem) {
                    return <DayItem key={listItem.dt} day={listItem}/>
                })}
            </div>
        </div>
    )
}

function ShowCity(props) {
    return props.isLoading === true
        ? <Loading speed={300} text="Getting Weather Data"/>
        : <ForecastUI city={props.city} forecast={props.forecastData}/>
}

ShowCity.propTypes = {
    city: PropTypes.string.isRequired,
    forecastData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
}

module.exports = ShowCity;
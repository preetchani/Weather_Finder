import React,{ Component } from 'react';
import Weather from "./Weather";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;

const Title = () => {
  return (
    <div>
      <h1 className="title-container__title">Weather Finder</h1>
      <h3 className="title-container__subtitle">
        Find out temperature, conditions and more...
      </h3>
    </div>
  );
};

const Form = ({ onWeather }) => {
  return (
    <form onSubmit={e => onWeather(e)}>
      <input type="text" name="city" placeholder="City..." />
      <input type="text" name="country" placeholder="Country..." />
      <button className="form-button">get Weather</button>
    </form>
  );
};

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
    if (city && country) {
      try {
        const apiCall = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`
        );
        const { main, sys, name, weather } = await apiCall.json();
        this.setState({
          temperature: main.temp,
          city: name,
          country: sys.country,
          humidity: main.humidity,
          description: weather[0].description,
          error: ""
        });
      } catch (ex) {
        console.log(ex.message);
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "please enter a valid values."
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className="col-xs-7 form-container">
                <Form onWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

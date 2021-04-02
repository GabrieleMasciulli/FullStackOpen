import React from 'react';

const Weather = ({ data }) => {
  console.log(data);
  return (
    <div>
      <p>
        <strong>Temperature:</strong> {data.current.temperature} °C
      </p>
      <img src={data.current.weather_icons[0]} alt='' />
      <p>
        <strong>Wind:</strong> {data.current.wind_speed} mph,
        <strong>Direction: </strong> {data.current.wind_dir}
      </p>
    </div>
  );
};

export default Weather;

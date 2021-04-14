export default function DisplayWeather({ city, temp, temp_min, temp_max, description }) {
  return(
    <div style={styles.weatherBox}>
      <div style={styles.header}>
        <div>
          <h2>{city}</h2>
          <p>{description[0].toUpperCase().concat(description.slice(1))}</p>
        </div>
        <div>
          <h1 style={styles.temp}>{temp.toFixed()} °F</h1>
          <h3 style={styles.tempHighLow}>{temp_min.toFixed()}° / {temp_max.toFixed()}°</h3>
        </div>
      </div>
    </div>
  )
}

const styles = {
  weatherBox: {
    width: '100%',
    padding: '1em',
    backgroundColor: 'grey',
    borderRadius: '8px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    paddingBottom: 0,
    marginBottom: '-0.5em',
  },
  tempHighLow: {
    textAlign: 'center',
    color: 'lightgrey'
  }
}
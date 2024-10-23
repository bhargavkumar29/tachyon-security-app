import React, { useState, useEffect } from 'react';
import './DeviceAvailability.css';

function DeviceAvailability() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [result, setResult] = useState('');

  // Function to check device availability
  const checkAvailability = async (e) => {
    e.preventDefault();

    if (!selectedDevice || !inputPassword) {
      alert('Please select a device and enter the password.');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/check_availability?deviceName=${selectedDevice}&password=${inputPassword}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult(data.status);
      } else {
        setResult(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error checking availability');
    }
  };

  // Sample devices list (for now, this can be updated to fetch from the backend later)
  useEffect(() => {
    setDevices([
      { deviceName: 'Router1' },
      { deviceName: 'Switch2' }
    ]);
  }, []);

  return (
    <div>
      <h2>Check Device Availability</h2>
      <form onSubmit={checkAvailability}>
        <div>
          <label>Select Device:</label>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            <option value="">Select</option>
            {devices.map((device, index) => (
              <option key={index} value={device.deviceName}>
                {device.deviceName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </div>
        <button type="submit">Check Availability</button>
      </form>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default DeviceAvailability;

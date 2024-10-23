import React, { useState } from 'react';
import './DeviceRegistration.css';

function DeviceRegistration({ onAddDevice }) {
  const [deviceName, setDeviceName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deviceName && ipAddress && password) {
      const newDevice = { deviceName, ipAddress, password };
      
      try {
        const response = await fetch('http://127.0.0.1:5000/add_device', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newDevice),
        });

        const data = await response.json();
        
        if (response.ok) {
          onAddDevice(newDevice);
          alert('Device added successfully');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding device');
      }

      setDeviceName('');
      setIpAddress('');
      setPassword('');
    } else {
      alert('All fields are required!');
    }
  };

  return (
    <div>
      <h2>Register Device</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Device Name:</label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>
        <div>
          <label>IP Address:</label>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Add Device</button>
      </form>
    </div>
  );
}

export default DeviceRegistration;

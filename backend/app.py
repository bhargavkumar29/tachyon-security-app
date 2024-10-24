from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import random
import re
app = Flask(__name__)

# Enable CORS for the /add_device endpoint only from http://localhost:5173
CORS(app, resources={r"/add_device": {"origins": "http://localhost:5173"}})

# In-memory storage for devices
devices = []

# Function to validate IP address format
def is_valid_ip(ip):
    pattern = r'^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$'
    return re.match(pattern, ip) is not None

# Route to register a new device
@app.route('/add_device', methods=['POST'])
def add_device():
    data = request.get_json()
    
    device_name = data.get('deviceName')
    ip_address = data.get('ipAddress')
    password = data.get('password')

    # Check for missing fields
    if not device_name or not ip_address or not password:
        return jsonify({"message": "All fields are required"}), 400

    # Validate IP address format
    if not is_valid_ip(ip_address):
        return jsonify({"message": "Invalid IP address format"}), 400

    # Add device to in-memory storage
    devices.append({
        "deviceName": device_name,
        "ipAddress": ip_address,
        "password": password
    })
    
    return jsonify({"message": "Device registered successfully"}), 201

# Route to check device availability
@app.route('/check_availability', methods=['GET'])
def check_availability():
    device_name = request.args.get('deviceName')
    input_password = request.args.get('password')

    # Find the device by name
    device = next((d for d in devices if d['deviceName'] == device_name), None)

    if not device:
        return jsonify({"message": "Device not found"}), 404

    if device['password'] != input_password:
        return jsonify({"message": "Incorrect Password"}), 403

    # Simulate reachability check using a random number
    if random.randint(0, 100) % 2 == 0:
        return jsonify({"status": "Reachable"})
    else:
        return jsonify({"status": "Not Reachable"})

if __name__ == '__main__':
    app.run(debug=True)
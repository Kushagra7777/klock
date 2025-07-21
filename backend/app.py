from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store logs in memory
user_logs = []

@app.route('/process', methods=['POST'])
def process_data():
    data = request.json
    print("Received data:", data)

    # Save to log
    user_logs.append(data)

    return jsonify({"result": "Action logged successfully"})

@app.route('/log', methods=['GET'])
def get_logs():
    return jsonify(user_logs)

if __name__ == '__main__':
    app.run(debug=True)

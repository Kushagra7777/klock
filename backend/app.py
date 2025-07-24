# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import ao_core as ao

# app = Flask(__name__)
# CORS(app)

# user_logs = []
# arch = ao.Arch(arch_i=[3], arch_z=[1], connector_function='full_conn')
# agent = ao.Agent(arch, notes="identra_demo_01", save=False)

# @app.route('/process', methods=['POST'])
# def process_data():
#     data = request.json
#     print("Received data:", data)

#     # Handle button click
#     if data.get("action") == "button_click":
#         print("Button label:", data.get("label"))
#         if data.get("label") == "Sign in securely":
#             ip = [1, 1, 1]
#             agent.next_state(ip, LABEL=[1], unsequenced=True)

#     # Handle mouse movement for 10s
#     if data.get("action") == "mouse_moving_10_seconds":
#         ip = [1, 0, 0]
#         response = agent.next_state(ip, unsequenced=True)
#         if response == [1]:
#             print("Next suggested step: sign in button")
#             return jsonify({
#                 "result": "Action logged successfully",
#                 "message": "Next suggested step: sign in button"
#             })

#     # Default return
#     user_logs.append(data)
#     return jsonify({"result": "Action logged successfully"})


# @app.route('/log', methods=['GET'])
# def get_logs():
#     return jsonify(user_logs)

# if __name__ == '__main__':
#     app.run(debug=True)




from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/log', methods=['POST'])
def log_event():
    data = request.get_json()
    print("\n[EVENT]", data)
    return jsonify({"status": "received"}), 200

@app.route('/tracker.js')
def serve_tracker():
    return send_from_directory('.', 'tracker.js')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)

from flask import Flask, jsonify
from flask_cors import CORS
from routes.heart_routes import heart_bp
from routes.diabetes_routes import diabetes_bp

app = Flask(__name__)
CORS(app, resources={r"/predict/*": {"origins": "http://localhost:5173"}})  # ✅ allow React to access Flask

# register blueprints
app.register_blueprint(heart_bp, url_prefix="/predict")
app.register_blueprint(diabetes_bp, url_prefix="/predict")

@app.route("/")
def home():
    return jsonify({"message": "HealthPredict Flask backend active"}), 200

if __name__ == "__main__":
    app.run(debug=True)

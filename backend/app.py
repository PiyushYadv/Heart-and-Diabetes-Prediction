from flask import Flask
from flask_cors import CORS

# Import Blueprints
from routes.heart_routes import heart_bp
from routes.diabetes_routes import diabetes_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register routes
    app.register_blueprint(heart_bp, url_prefix="/heart")
    app.register_blueprint(diabetes_bp, url_prefix="/diabetes")

    @app.route('/')
    def home():
        return "<h3>Visit /heart or /diabetes to use the models.</h3>"

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

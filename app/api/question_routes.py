from flask import Blueprint, jsonify
from flask_login import login_required


user_routes = Blueprint('questions', __name__)


@app.route('/')
def index():
    # keep sample simple with just a link to the form
    return 'Could it be, the first page?'

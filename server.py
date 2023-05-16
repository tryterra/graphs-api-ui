from flask import Flask, request, jsonify
from flask_cors import cross_origin
import requests
app = Flask(__name__)


@app.route("/graphs/render_gpt", methods=["GET"])
@cross_origin(origins=["http://localhost:3000", "http://localhost:*"])
def render_gpt():
    external_endpoint = "http://127.0.0.1:8080/graphs/render_gpt"
    print("get")
    print("header:", request.headers)
    print(type(request.headers))
    response = requests.get(external_endpoint, params=request.args, headers=request.headers)
    # print("header:", response.request.headers)
    return response.json()

@app.route("/graphs/render_gpt", methods=["OPTIONS"])
@cross_origin(origins=["http://localhost:3000", "http://localhost:*"])
def option_handler():
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    }
    return ("", 204, headers)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8081)
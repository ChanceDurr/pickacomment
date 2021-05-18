from flask import Flask

app = Flask(__name__)

@app.route("/get_comments", methods=["GET", "POST", "OPTIONS"])
def get_comments():
    print("hello")
    return "Here is a comment"

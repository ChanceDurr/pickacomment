from flask import Flask

app = Flask(__name__, static_folder="../build", static_url_path="/")

@app.route("/get_comments", methods=["GET", "POST", "OPTIONS"])
def get_comments():
    print("hello")
    return "Here is a comment"

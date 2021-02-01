import json
from PFE import analyse 
from flask import Flask, request

app = Flask(__name__)

@app.route('/api/upload', methods = ['POST'])
def upload_file():
    schema = request.form['dataSchema']
    file = request.files['file'].read().decode("utf-8")
    lines = file.splitlines()
    advices = analyse(lines, schema)
    return {"advices": advices}

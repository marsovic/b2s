import json
import pandas as pd
from PFE import analyse 
from flask import Flask, request

app = Flask(__name__, static_folder='../build', static_url_path='/internal')

def num(s):
    try:
        return float(s)
    except ValueError:
        return s

@app.route('/internal')
def index():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

    
@app.route('/api/upload', methods = ['POST'])
def upload_file():
    schema = request.form['dataSchema']
    openDays = json.loads(request.form['openDays'])
    workingHours = json.loads(request.form['workingHours'])
    file = request.files['file'].read().decode("utf-8")
    lines = file.splitlines()

    advices = analyse(lines, schema, openDays, workingHours)
    return {"advices": advices}

@app.route('/api/json', methods=['POST'])
def json_parse(): 
    file = request.files['file'].read().decode("utf-8")
    lines = file.splitlines()
    df = list()
    for line in lines:
        tempLine = line.split(";")
        for newLine in range(len(tempLine)):
            tempLine[newLine] = num(tempLine[newLine].replace(",", "."))
        df.append(tempLine)
        
    df = pd.DataFrame( data = df[1:], index = [index for index in range(len(df)-1)], columns = df[0])
        
    return {"json": df.to_json(orient='index')}


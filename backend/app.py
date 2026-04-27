from flask import Flask, jsonify

app = Flask(__name__)

blogs = [
    {'title': 'All About Cats', 'content': 'Cats are small, carnivorous mammals.'},
    {'title': 'All About Dogs', 'content': 'Dogs are domesticated mammals loved for their loyalty.'},
    {'title': 'All About Lions', 'content': 'Lions are large carnivorous mammals found in Africa and Asia.'},
]

@app.route('/blogs', methods=['GET'])
def get_blogs():
    return jsonify(blogs)

if __name__ == '__main__':
    app.run(debug=True)
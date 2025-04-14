from flask import Flask, request, jsonify, render_template
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sumar_matrices', methods=['POST'])
def sumar_matrices():
    data = request.get_json()
    matriz1 = data.get('matriz1')
    matriz2 = data.get('matriz2')

    if not matriz1 or not matriz2:
        return jsonify({'error': 'Faltan las matrices'}), 400

    # Validar dimensiones
    if len(matriz1) != len(matriz2) or len(matriz1[0]) != len(matriz2[0]):
        return jsonify({'error': 'Las matrices deben tener las mismas dimensiones'}), 400

    resultado = [
        [matriz1[i][j] + matriz2[i][j] for j in range(len(matriz1[0]))]
        for i in range(len(matriz1))
    ]

    return jsonify({'resultado': resultado})

if __name__ == '__main__':
    app.run(debug=True, port=8000)

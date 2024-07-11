from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_config = {
    'host': 'koliramone.mysql.pythonanywhere-services.com',
    'user': 'koliramone',
    'password': 'ezequiel123qweasd',
    'database': 'koliramone$usuarioscac'
}

@app.route('/usuariocac', methods=['GET'])
def ver_usuariocac():
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuariocac")  # Asegúrate de que esta es la tabla correcta
    usuarios = cursor.fetchall()
    cursor.close()
    return jsonify(usuarios)

@app.route('/eliminar_usuario/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    cursor.execute("DELETE FROM usuariocac WHERE id = %s", (id,))
    db.commit()
    cursor.close()
    return jsonify({"mensaje": "REGISTRO ELIMINADO CON EXITO!!!"})

@app.route('/agregar_usuario', methods=['POST'])
def crear_usuario():
    info = request.json
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    cursor.execute("INSERT INTO usuariocac (nombre, apellido, email, pw) VALUES (%s, %s, %s, %s,%s)",(info["nombre"], info["apellido"], info["email"], info["pw"]))
    db.commit()
    cursor.close()
    return jsonify({"mensaje": "REGISTRO CREADO CON EXITO!!!"})

@app.route('/actualizar_usuario/<int:id>', methods=['PUT'])
def modificar_usuario(id):
    info = request.json
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
    cursor.execute("UPDATE usuariocac SET nombre = %s, apellido = %s, email = %s, pw = %s WHERE id = %s",(info["nombre"], info["apellido"], info["email"], info["pw"], id))
    db.commit()
    cursor.close()
    return jsonify({"mensaje": "REGISTRO ACTUALIZADO CON EXITO!!!"})

if __name__ == '__main__':
    app.run(debug=True)

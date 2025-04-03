from flask import Blueprint, request, jsonify
from .database import get_db
from .utils import hash_password, validate_password

# vai organizar as rotas separadamente
bp = Blueprint("routes", __name__)


# rota pra cadastrar o email e senha, salvando o hasj da senha no banco
@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # vai validar os requisitos minimos da senha
    if not validate_password(password):
        return jsonify(
            {
                "message": "Senha inváida. Requisitos: 8 caracteres, letra maiúscula, minúscula, número e caractere especial."
            }
        )

    password_hash = hash_password(password)
    db = get_db()

    # vai tentar inserir no banco
    try:
        db.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (email, password_hash),
        )
        db.commit()
        return jsonify({"message": "Cadastro realizado com sucesso"})
    except db.IntegrityError:
        # caso email ja esteja cadastrado
        return jsonify({"message": "E-mail já cadastrado"}), 409


# rota pra validar a senha, comparando o hash gerado com o armazenado
@bp.route("/validate", methods=["POST"])
def validate():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    db = get_db()
    user = db.execute(
        "SELECT password_hash FROM users WHERE email = ?", (email,)
    ).fetchone()

    if not user:
        return jsonify({"message": "E-mail inexistente"}), 404

    input_hash = hash_password(password)

    if user["password_hash"] == input_hash:
        return jsonify({"message": "Senha correta"})
    else:
        return jsonify({"message": "Senha incorreta"}), 401

# rota pra consultar o hash da senha usando o email
@bp.route('/hash/<email>', methods=['GET'])
def get_hash(email):
    db = get_db()
    user = db.execute('SELECT password_hash FROM users WHERE email = ?', (email,)).fetchone()
    
    if user:
        return jsonify({'email': email, 'hash': user['password_hash']})
    else:
        return jsonify({'message': 'E-mail inexistente'}), 404
    
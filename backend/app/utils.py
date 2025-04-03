import hashlib
import re

# vai gerar o hash SHA-1 da senha
def hash_password(password):
    return hashlib.sha1(password.encode()).hexdigest()

# vai validar a senha com:
# min 8 caracteres, min 1 letra maiuscula, min 1 letra minuscula, min 1 numero e min 1 caractere especial
def validate_password(password):
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$'
    return re.match(pattern, password)
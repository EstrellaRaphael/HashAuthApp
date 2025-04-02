import sqlite3
from flask import current_app, g

# vai criar uma conexao com o banco e salva em um objeto global por request (g)

def get_db():
    pass

# vai fechar a conexão com o banco no final de cada request feito
def close_db():
    pass

# vai iniciar a estrutura do banco de dados
def init_db():
    pass

# vai registrar os metodos acima na aplicação flask
def init_app():
    pass
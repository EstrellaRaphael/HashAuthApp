import sqlite3
from flask import current_app, g

# vai criar uma conexao com o banco e salva em um objeto global por request (g)


def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(current_app.config["DATABASE"])
        g.db.row_factory = sqlite3.Row
    return g.db


# vai fechar a conexão com o banco no final de cada request feito
def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


# vai iniciar a estrutura do banco de dados
def init_db():
    db = get_db()
    db.execute(
        """
            CREATE TABLE IF NOT EXISTS users (
            email TEXT PRIMARY KEY,
            password_hash TEXT NOT NULL
            )
        """)
    db.commit()

# vai registrar os metodos acima na aplicação flask
def init_app(app):
    app.teardown_appcontext(close_db)
    with app.app_context():
        init_db()

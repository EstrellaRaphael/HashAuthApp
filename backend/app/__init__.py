from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from . import database
from . import routes
import os

def create_app():
    load_dotenv() # vai carregar as variaveis do .env
    
    # vai criar a instancia da aplicação flask
    app = Flask(__name__, instance_relative_config=True)
    
    # vai definir a localização do banco de dados lendo a variavel do .env
    app.config.from_mapping(
        DATABASE=os.path.join(app.instance_path, os.getenv("DATABASE_PATH", "users.db"))
    )
    
    # vai permitir requisições para integração com angular
    CORS(app)
    
    # vai iniciar o banco de dados
    database.init_app(app)
    
    # vai registrar as rotas da aplicação
    app.register_blueprint(routes.bp)
    
    # vai garantir que a pasta instance/ existe
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    return app
from app import create_app

# vai criar a aplicação baseado na configuração feita no modulo app
app = create_app()

if __name__ == "__main__":
    # vai rodar localmente com debug
    app.run(debug=True)
# extract-info-auth

Esta aplicação foi criada com o propósito de extrair informações do token de autenticação. 
Para execução foi utilizada a aplicação https://auth0.com/.

## Configuração

Para execução desta aplicação se faz necessário, dentro do arquivo `index.js`, modificar as credenciais para as que a aplicação irá fornecer.

Essas credenciais são obtidas após registro e acessar o menu Applications >> APIs


``` JS
const CREDENTIALS = {
    client_id: "{{your_client_id}}",
    client_secret: "{{your_client_secret}}",
    user: "{{your_user}}"
}
```
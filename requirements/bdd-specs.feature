# BDD Specs

Para entender mais sobre o BDD, acesse [esse link](https://www.devmedia.com.br/desenvolvimento-orientado-por-comportamento-bdd/21127#:~:text=BDD%20%C3%A9%20t%C3%A9cnica%20de%20desenvolvimento,teste%20e%20depois%20o%20c%C3%B3digo.).


Feature: Cliente Online

Como um cliente Online
Quero que o sistema me mostre minhas compras
Para que possa controlar minhas despesas.

Scenario: Obter dados da API

Dado que o Cliente tenha conexão com a internet
Quando o cliente solicitar para carregar suas compras
Então O sistema deve exibir suas compras vindo de uma API
E substituir os dados do cache com os dados mais atuais.


Feature: Cliente offline

Como um cliente Offline
Quero que o sistema me mostre as ultimas compras gravadas.
Para que eu possa ver minhas despesas mesmo sem ter Internet.

Scenario: Obter dados do Cache

Dado que o cliente não tenha conexão com a internet
E exista algum dado gravado no cache.
E os dados do cache forem mais novos que 3 dias.
Quando o cliente solicitar para carregar suas compras.
Então o sistema deve exibir suas compras vindas do cache.

Dado que o cliente não tenha conexão com a internet
E exista algum dado gravado no cache
E os dados do cache forme mais velhos ou iguais a 3dias
Quando o cliente solicitar para carregar suas compras.
Então o sistema deve exibir uma mensagem de erro.

Dado que o cliente não tenha conexão com a internet
E o cache esteja vazio.
Quando o cliente solicitar para carregar suas compras.
Então o sistema deve exibir uma mensagem de erro.

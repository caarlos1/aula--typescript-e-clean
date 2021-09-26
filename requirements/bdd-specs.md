# BDD Specs

Para entender mais sobre o BDD, acesse [esse link](https://www.devmedia.com.br/desenvolvimento-orientado-por-comportamento-bdd/21127#:~:text=BDD%20%C3%A9%20t%C3%A9cnica%20de%20desenvolvimento,teste%20e%20depois%20o%20c%C3%B3digo.).

## Narrativa 1

```
    Como um cliente Online
Quero que o sistema me mostre minhas compras
    Para que possa controlar minhas despesas.
```

### Cenários

```
    Dado que o Cliente tenha conexão com a internet
Quando o cliente solicitar para carregar suas compras
    O sistema deve exibir suas compras vindo de uma API
        E substituir os dados do cache com os dados mais atuais.
```

## Narrativa 2

```
    Como um cliente Offline
Quero que o sistema me mostre as ultimas compras gravadas.
    Para que eu possa ver minhas despesas mesmo sem ter Internet.
```

### Cenários

```
    Dado que o cliente não tenha conexão com a internet
        & exista algum dado gravado no cache.
        & os dados do cache forem mais novos que 3 dias.
Quando o cliente solicitar para carregar suas compras.
    O sistema deve exibir suas compras vindas do cache.

    Dado que o cliente não tenha conexão com a internet
        & exista algum dado gravado no cache
        & os dados do cache forme mais velhos ou iguais a 3dias
Quando o cliente solicitar para carregar suas compras.
    O sistema deve exibir uma mensagem de erro.

    Dado que o cliente não tenha conexão com a internet
        & o cache esteja vazio.
Quando o cliente solicitar para carregar suas compras.
    O sistema deve exibir uma mensagem de erro.
```
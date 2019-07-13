## Objetivo

### API CALENDAR

API crida para validar e enviar email das reservas efetuadas pelo CHATBOT. Essa API será consumida pela plataforma BLIP que faz a criação de CHATBOTS. Quando o usuário finalizar sua reserva com o CHATBOT, seus dados serão validados e será enviado um email como seus dados de reserva.


### Criação

Foi criado para a disciplina de Tecnologias Emergentes, o trabalho foi pensando para meu pai que possui um sitio e não tem controle e nem tempo para as reservas. Então para facilitar a reserva, criei um chatbot que irá fazer todo o processo da reserva. E chegará para o meu pai somente o email da reserva. Esse CHATBOT se encontra no messenger do facebook, e foi utilizado a plataforma BLIP para criação do CHATBOT e o mesmo irá consumir  minha API.

## FUNCIONANDO

### Local

- Instale todas as dependências com **NPM INSTALL**
- Crie um arquivo **.env** ele terá que possuir todas as variaveis do arquivo **env.default**
- Quando o arquivo **.env** estiver com todas as variaveis do **env.default**  as varivaies **AUTH_USER e AUTH_PASS** deve receber suas configurações de email e senha respectivament.

- Para colocar a API para funcionar basta executar **NODE SERVER**

- Para testar chame a rota "Método POST" **http://localhost:8090/calendar/create** passando os parametros 
* name
* phone
* startDate
* endDate

Esta rota irá criar a reserva, e enviará um email para o locatario.


[![CircleCI](https://circleci.com/gh/vitorfreitas/rabbitmq-playground.svg?style=svg&circle-token=b26fd3969e38b34bc4322e04908c566a413cf869)](https://circleci.com/gh/vitorfreitas/rabbitmq-playground)

# RabbitMQ + Elasticsearch + Kibana logger

## Dependencies

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/)
- [Docker compose](https://docs.docker.com/compose/install/)

## Running the project

- Clone this repo
- Inside the repo folder, run `docker-compose up -d`
- Run the consumer using `yarn queue:consume`
- Publish a message using the publisher `yarn exchange:emit`

## Production [Non-]Suitability Disclaimer

The code inside this repo is not production-ready. The content of this repo is
the product of my recent studies over RabbitMQ, Elasticsearch and Kibana.

## License

MIT © [Vitor Freitas]()

**PR's and tips are welcome!**

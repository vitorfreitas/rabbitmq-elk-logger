[![CircleCI](https://circleci.com/gh/vitorfreitas/rabbitmq-playground.svg?style=svg&circle-token=b26fd3969e38b34bc4322e04908c566a413cf869)](https://circleci.com/gh/vitorfreitas/rabbitmq-playground)
[![Maintainability](https://api.codeclimate.com/v1/badges/17a933b83c2bf9088778/maintainability)](https://codeclimate.com/github/vitorfreitas/rabbitmq-elk-logger/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/17a933b83c2bf9088778/test_coverage)](https://codeclimate.com/github/vitorfreitas/rabbitmq-elk-logger/test_coverage)

# RabbitMQ + Elasticsearch + Kibana logger

## Dependencies

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/)
- [Docker compose](https://docs.docker.com/compose/install/)

## Variables

`ERROR_SEVERITY`: The severity of error that's being published. Possible
severities are: `error`, `warning` and `info`. The severity informed on
the consumer means that it's gonna be saved on Elasticsearch.
e.g: The publisher/emitter publishes a message with `warning` severity
level. If the consumer is waiting for `warning`s, the message received
will be saved.

## Running the project

- Clone this repo
- Inside the repo folder, run `docker-compose up -d`
- Run the consumer using `yarn queue:consume <ERROR_SEVERITY>`
- Publish a message using the publisher `yarn exchange:emit <ERROR_SEVERITY>`

## Production [Non-]Suitability Disclaimer

The code inside this repo is not production-ready. The content of this repo is
the product of my recent studies over RabbitMQ, Elasticsearch and Kibana.

## License

MIT © [Vitor Freitas]()

**PR's and tips are welcome!**

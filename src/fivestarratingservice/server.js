const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const pino = require('pino');

const PORT = process.env.PORT;

const logger = pino({
    name: 'currencyservice-server',
    messageKey: 'message',
    changeLevelName: 'severity',
    useLevelLabels: true
});

const {
    getRating,
    addRating
} = require('./app/db/ratings');

//verschoenern!     
const packageDefinition1 = protoLoader.loadSync('./proto/demo.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const packageDefinition2 = protoLoader.loadSync('./proto/grpc/health/v1/health.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const ratingPackage = grpc.loadPackageDefinition(packageDefinition1).hipstershop;
const healthPackage = grpc.loadPackageDefinition(packageDefinition2).grpc.health.v1;

/**
 * Endpoint for health checks
 */
function check (call, callback) {
  callback(null, { status: 'SERVING' });
}

(function main() {
    const server = new grpc.Server();
    server.addService(ratingPackage.fiveStarRatingService.service, {
        getRating,
        addRating
    });
    server.addService(healthPackage.Health.service, {check});
    server.bind(
        `0.0.0.0:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
    );
    logger.info(`5StarRatingService grpc server listening on ${PORT}`);
    server.start();
}());
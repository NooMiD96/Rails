export const ErrorRequestHandler = (app) => app.use((err, request, response, next) => {
    console.log(err); // логирование ошибки
    response.status(500).send('Something broke!');
})
export function errorHandler(error, request, reply) {
  if (error.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
    return reply.status(400).send({
      status: 'Erro de Sintaxe',
      mensagem:
        'O corpo da requisição não é um JSON válido. Verifique se há vírgulas sobrando ou aspas simples.',
    });
  }

  if (error.validation) {
    const formattedErrors = error.validation.map(err => {
      const campo = err.path ? err.path.join('.') : 'desconhecido';

      return {
        campo,
        mensagem: err.message,
        regra: err.code || 'validacao_invalida',
      };
    });

    return reply.status(400).send({
      status: 'Erro de Validação',
      codigo: 400,
      detalhes: formattedErrors,
    });
  }

  request.log.error(error);

  const statusCode = error.statusCode || 500;

  return reply.status(statusCode).send({
    status: statusCode === 500 ? 'Erro Interno do Servidor' : 'Erro',
    mensagem: statusCode === 500 ? 'Ocorreu um erro interno no servidor.' : error.message,
  });
}

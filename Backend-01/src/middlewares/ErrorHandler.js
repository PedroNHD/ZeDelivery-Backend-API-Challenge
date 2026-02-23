export function errorHandler(error, request, reply) {
  // Erro de JSON malformado
  if (error.code === 'FST_ERR_CTP_INVALID_JSON_BODY') {
    return reply.status(400).send({
      status: 'Erro de Sintaxe',
      mensagem:
        'O corpo da requisição não é um JSON válido. Verifique se há vírgulas sobrando ou aspas simples.',
    });
  }

  // Erro de Validação de Schema
  if (error.validation) {
    const formattedErrors = error.validation.map(err => {
      return {
        campo: err.instancePath.replace('/', '') || err.params.missingProperty,
        mensagem: err.message,
        regra: err.keyword,
      };
    });

    return reply.status(400).send({
      status: 'Erro de Validação',
      codigo: 400,
      detalhes: formattedErrors,
    });
  }

  // Para outros erros (500, etc), mantém o padrão ou personaliza
  return reply.status(500).send({
    status: 'Erro Interno do Servidor',
    mensagem: 'Ocorreu um erro interno no servidor.',
  });
}

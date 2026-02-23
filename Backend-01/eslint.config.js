import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // --- Variáveis e Sintaxe Base ---
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Avisa sobre variáveis não usadas, exceto as que começam com "_"
      eqeqeq: 'error', // Obriga o uso de === e !== em vez de == e !=
      'no-self-assign': 'error', // Proíbe atribuir uma variável a ela mesma (ex: x = x)
      'no-duplicate-imports': 'error', // Proíbe importar o mesmo módulo em múltiplas linhas
      'consistent-return': 'warn', // Exige que funções retornem sempre um valor ou nunca retornem
      'no-var': 'error', // Proíbe o uso de 'var', forçando 'let' ou 'const'
      'prefer-const': 'error', // Obriga o uso de 'const' para variáveis que não são reatribuídas

      // --- Segurança e Prevenção de Erros ---
      'no-console': 'warn', // Avisa sobre o uso de console.log, console.error, etc. (pode ser útil para debugging, mas deve ser evitado em produção)
      'no-debugger': 'error', // Proíbe a instrução 'debugger' no código final
      'no-unreachable': 'error', // Avisa sobre código que nunca será executado (após um return/throw)
      'no-unsafe-optional-chaining': 'error', // Evita erro ao usar ?. em contextos onde o valor é obrigatório
      'no-empty': ['warn', { allowEmptyCatch: true }], // Avisa sobre blocos vazios, mas permite catch{} vazio se necessário
      'no-ex-assign': 'error', // Proíbe reatribuir o objeto de erro no bloco catch
      'no-func-assign': 'error', // Impede sobrescrever uma função declarada

      // --- Boas Práticas ---
      curly: 'warn', // Obriga o uso de chaves em blocos como if, else, for, etc.
      'default-case': 'warn', // Exige um 'default' em sentenças switch
      'no-implicit-coercion': 'warn', // Evita conversões implícitas confusas (ex: !! ou +)
      'require-await': 'warn', // Avisa se uma função async não possui a palavra-chave 'await'
      'no-return-await': 'warn', // Evita o uso desnecessário de 'return await' (performance)
      'no-array-constructor': 'error', // Proíbe usar 'new Array()', prefira '[]'
      'dot-notation': 'warn', // Prefere obj.prop em vez de obj['prop'] quando possível

      // --- Regras para NodeJS ---
      'handle-callback-err': 'error', // Obriga o tratamento do parâmetro de erro em callbacks
      'no-path-concat': 'error', // Proíbe concatenação manual de caminhos, use path.join()
      'no-new-require': 'error', // Proíbe usar 'new require()'
      'no-sync': 'warn', // Avisa sobre métodos síncronos (fs.readFileSync) que bloqueiam o Event Loop

      // --- Regras de Limpeza ---
      'no-else-return': 'warn', // Remove 'else' desnecessário se o 'if' já tiver um 'return'
      'no-lonely-if': 'warn', // Transforma 'else { if ... }' em 'else if'
      'no-multi-assign': 'warn', // Proíbe encadear atribuições (ex: const a = b = c = 1)
      'no-nested-ternary': 'warn', // Proíbe ternários aninhados (difíceis de ler)
      'no-unneeded-ternary': 'warn', // Proíbe ternários simples que podem ser booleanos (ex: x ? true : false)
      'object-shorthand': ['warn', 'always'], // Força sintaxe curta em objetos (ex: { name } em vez de { name: name })
      'spaced-comment': ['error', 'always'], // Exige um espaço após // ou /* nos comentários

      // --- Regras de Segurança e Lógica ---
      'no-throw-literal': 'error', // Obriga a lançar objetos de Erro (throw new Error()) e não strings
      'no-prototype-builtins': 'warn', // Evita chamar métodos do Object.prototype diretamente
      'no-promise-executor-return': 'error', // Proíbe retornar valores dentro do executor de uma Promise
      'no-template-curly-in-string': 'warn', // Avisa se ${} for usado em strings comuns (sem ser template literal)
      'no-eval': 'error', // Proíbe o uso da função perigosa eval()
      'no-implied-eval': 'error', // Proíbe funções que agem como eval (setTimeout com string)
    },
  },

  // Desliga regras que conflitam com o Prettier
  prettier,
];

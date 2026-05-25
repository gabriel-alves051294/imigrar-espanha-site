/// <reference path="../pb_data/types.d.ts" />
//
// NEUTRALIZADO por decisao do produto:
//   "as pontuacoes nunca podem ser reduzidas. Somente nao contabilizadas
//    em caso de mensagem ofensiva."
//
// Mensagens ofensivas sao BLOQUEADAS pelo hook moderate ANTES do create,
// entao nao chegam a ganhar ponto. Nao ha necessidade de revogar.
//
// Banimento e delete por moderacao NAO reduzem pontos. Membro continua
// com o que acumulou; quem ve eh apenas a UI (chat tem TTL visual de 6h).
//
// Arquivo mantido vazio (sem handlers) pra preservar historico de versao.

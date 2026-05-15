import * as SQLite from 'expo-sqlite';

// Abre banco
const db = SQLite.openDatabaseSync('tarefa.db');

// Inicializa tabela
export const database = {
  init: async () => {
    try {
      await db.execAsync('PRAGMA journal_mode = WAL;'); // Melhora estabilidade/performance

      await db.execAsync(`
                CREATE TABLE IF NOT EXISTS tarefa (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    status INTEGER DEFAULT 0
                );
            `);

      console.log('Tabela criada.');
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
    }
  },

  // LISTAR
  getTarefa: async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM tarefa;');

      return result;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  },

  // INSERIR
  adicionarTarefa: async (nome) => {
    try {
      await db.runAsync('INSERT INTO tarefa (nome) VALUES (?);', [nome]);
    } catch (error) {
      console.error('Erro ao adicionar:', error);
    }
  },

  // ATUALIZAR
  atualizarTarefa: async (id, nome) => {
    try {
      await db.runAsync('UPDATE tarefa SET nome = ? WHERE id = ?;', [nome, id]);
    } catch (error) {
      console.error('Erro ao atualizar:', error);
    }
  },

  // EXCLUIR
  removerTarefa: async (id) => {
    try {
      await db.runAsync('DELETE FROM tarefa WHERE id = ?;', [id]);
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  },

  // CONCLUIR
  concluirTarefa: async (id) => {
    try {
      await db.runAsync(
        'UPDATE tarefa SET status = NOT status WHERE id = ?;', // Vira toogle, da pra desfazer
        [id]
      );
    } catch (error) {
      console.error('Erro ao concluir:', error);
    }
  },
};

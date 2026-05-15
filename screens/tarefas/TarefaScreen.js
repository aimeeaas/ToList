import { useState, useEffect } from 'react';

import { View, Text, StyleSheet, ScrollView } from 'react-native';

import TextInputBox from '../../components/textInputBox/TextInputBox';
import CustomButtom from '../../components/customButtom/CustomButtom';

// Importa o objeto database
import { database } from '../../repository/TarefaRepository';

function TarefaScreen() {
  // Lista de tarefas
  const [tarefas, setTarefa] = useState([]);

  // Valor digitado
  const [nome, setNome] = useState('');

  // ID da tarefa em edição
  const [editando, setEditando] = useState(null);

  // Carrega banco e tarefas
  useEffect(() => {
    async function setup() {
      try {
        // Cria tabela
        await database.init();

        // Busca tarefas
        const data = await database.getTarefa();

        setTarefa(data);
      } catch (error) {
        console.error('Erro ao carregar:', error);
      }
    }

    setup();
  }, []);

  // Atualiza lista
  async function refresh() {
    const data = await database.getTarefa();

    setTarefa(data);
  }

  // Salvar tarefa
  async function salvar() {
    // Verifica campo vazio
    if (!nome.trim()) {
      alert('Digite uma tarefa.');

      return;
    }

    try {
      // EDITAR
      if (editando) {
        await database.atualizarTarefa(editando, nome);

        setEditando(null);
      } else {
        // CADASTRAR
        await database.adicionarTarefa(nome);
      }

      // Limpa input
      setNome('');

      // Atualiza lista
      await refresh();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  }

  // Editar tarefa
  function editar(tarefa) {
    setNome(tarefa.nome);

    setEditando(tarefa.id);
  }

  // Excluir tarefa
  async function excluir(id) {
    await database.removerTarefa(id);

    refresh();
  }

  // Concluir tarefa
  async function concluir(id) {
    await database.concluirTarefa(id);

    refresh();
  }

  // RETURN ---------------------------------------------------------------------------------------------------------------

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>

      {/* INPUT */}
      <TextInputBox
        placeholder="Digite uma tarefa"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      {/* BOTÃO */}
      <CustomButtom
        title={editando ? 'Atualizar' : 'Adicionar tarefa'}
        onPress={salvar}
        style={styles.cadastrar}
      />

      {/* LISTA */}
      {tarefas.map((tarefa) => {
        return (
          <View key={tarefa.id} style={styles.card}>
            {/* TEXTO */}
            <Text style={styles.texto}>
              {tarefa.status === 1 ? '✅' : '⬜'} {tarefa.nome}
            </Text>

            {/* BOTÕES */}
            <View style={styles.buttonContainer}>
              {/* EDITAR */}
              <CustomButtom
                title="Editar"
                onPress={() => editar(tarefa)}
                style={styles.button}
              />

              {/* EXCLUIR */}
              <CustomButtom
                title="Excluir"
                onPress={() => excluir(tarefa.id)}
                style={styles.button}
              />

              {/* CONCLUIR */}
              <CustomButtom
                title="Concluir"
                onPress={() => concluir(tarefa.id)}
                style={styles.button}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
    margin: 20,
  },

  input: {
    width: 300,
    height: 100,
    alignSelf: 'center',
  },

  card: {
    backgroundColor: '#f5f5f5',
    padding: 25,
    borderRadius: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  texto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 15,
    flexWrap: 'wrap',
  },

  button: {
    width: 120,
    backgroundColor: '#a17ebf',
  },

  cadastrar: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginBottom: 25,
  },
});

export default TarefaScreen;

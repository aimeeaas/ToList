import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import CustomButtom from '../../components/customButtom/CustomButtom';

function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      {/* PRIMEIRO CARD */}
      <View style={styles.homeCard}>
        <Text style={styles.homeTitle}>Organize suas tarefas ✨</Text>

        <Text style={styles.homeText}>
          Planeje sua rotina, acompanhe suas atividades e mantenha seus
          objetivos organizados de forma simples e prática com o ToList.
        </Text>
      </View>

      {/* SEGUNDO CARD */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Com o ToList você pode...</Text>

        <Text style={styles.infoText}>
          ✅ Criar tarefas{'\n'}
          ✏️ Editar{'\n'}
          🗑️ Excluir{'\n'}
          🎯 Concluir tarefas
        </Text>
      </View>

      {/* TERCEIRO CARD */}
      <View style={styles.homeCard}>
        <Text style={styles.homeTitle}>Mantenha o foco 🚀</Text>

        <Text style={styles.homeText}>
          Pequenas tarefas concluídas todos os dias ajudam você a criar hábitos,
          aumentar sua produtividade e alcançar seus objetivos com mais
          organização.
        </Text>

        <CustomButtom
          title="Ir para tarefas"
          onPress={() => navigation.navigate('ToList')}
          style={styles.homeButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeCard: {
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

  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#69328d',
    marginBottom: 10,
    textAlign: 'center',
  },

  homeText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },

  homeButton: {
    width: 180,
  },

  infoCard: {
    backgroundColor: '#f2ebf7',
    padding: 22,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },

  infoText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 28,
  },
});

export default HomeScreen;

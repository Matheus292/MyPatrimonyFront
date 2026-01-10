<template>
  <main>
    <Menu></Menu>
    <div class="dashboard-content">
      <div class="cards-section">
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Carregando dados...</p>
        </div>
        
        <div v-else-if="error" class="error-container">
          <div class="error-icon">⚠️</div>
          <p class="error-message">{{ error }}</p>
          <button @click="loadCards" class="retry-button">Tentar Novamente</button>
        </div>
        
        <div v-else>
          <div class="cards-container">
            <CardComponent
              v-for="card in sortedCards"
              :key="card.order"
              :card="card"
              :currency="card.currency || 'BRL'"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Menu from '@/components/Menu.vue';
import CardComponent from '@/components/card/CardComponent.vue';
import api from '@/services/api';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    CardComponent
  },
  data() {
    return {
      cards: [],
      loading: false,
      error: null
    }
  },
  computed: {
    sortedCards() {
      return [...this.cards].sort((a, b) => a.order - b.order);
    }
  },
  async mounted() {
    await this.loadCards();
  },
  methods: {
    async loadCards() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.get('/api/dashboard/info');
        
        // Se os dados vêm diretamente como array
        if (Array.isArray(response.data)) {
          this.cards = response.data;
        } 
        // Se os dados vêm dentro de uma propriedade 'cards'
        else if (response.data.cards && Array.isArray(response.data.cards)) {
          this.cards = response.data.cards;
        }
        // Se a estrutura for diferente, ajuste conforme necessário
        else {
          console.warn('Estrutura de dados inesperada:', response.data);
          this.cards = [];
        }
        
      } catch (err) {
        console.error('Erro ao carregar cards:', err);
        
        if (err.response) {
          this.error = `Erro ${err.response.status}: ${err.response.data.message || 'Falha na requisição'}`;
        } else if (err.request) {
          this.error = 'Erro de conexão. Verifique se o servidor está funcionando.';
        } else {
          this.error = 'Erro inesperado ao carregar os dados.';
        }
        
        // Fallback para dados de exemplo em caso de erro
        this.cards = [
          {
            title: "Total investido (R$)",
            value: 56927.85361588585,
            currency: "BRL",
            date: null,
            order: 2
          },
          {
            title: "Rendimento Mensal",
            value: 2847.32,
            currency: "BRL",
            date: "2026-01-01",
            order: 1
          },
          {
            title: "Carteira Diversificada",
            value: 12,
            date: null,
            order: 3
          },
          {
            title: "Meta Anual",
            value: 68000.00,
            currency: "BRL",
            date: "2026-12-31",
            order: 4
          }
        ];
        
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
main {
  background-color: #222;
  width: 100vw;
  min-height: 100vh;
  color: white;
  font-family: 'Arial', sans-serif;
}

.dashboard-content {
  padding: 20px;
}

.cards-section {
  margin-top: 20px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 0;
}

/* Loading Styles */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Error Styles */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.error-message {
  font-size: 18px;
  color: #ff6b6b;
  margin: 0 0 30px 0;
  max-width: 400px;
  line-height: 1.5;
}

.retry-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column;
    align-items: center;
  }
  
  .dashboard-content {
    padding: 10px;
  }
  
  .section-title {
    font-size: 24px;
  }
}
</style>
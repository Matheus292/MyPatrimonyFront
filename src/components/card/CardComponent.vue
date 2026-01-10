<template>
  <div class="card" :style="{ background: randomGradient }">
    <div class="card-header">
      <h3 class="card-title">{{ card.title }}</h3>
    </div>
    <div class="card-body">
      <div class="card-value">{{ formatValue(card.value) }}</div>
      <div class="card-date">{{ card.date ? formatDate(card.date) : '' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    card: {
      type: Object,
      required: true,
      validator(value) {
        return value.title && typeof value.value !== 'undefined' && typeof value.order !== 'undefined';
      }
    },
    currency: {
      type: String,
      default: 'BRL',
      validator(value) {
        return ['BRL', 'USD'].includes(value);
      }
    }
  },
  data() {
    return {
      randomGradient: this.generateRandomGradient()
    }
  },
  methods: {
    generateRandomGradient() {
      const gradients = [
        'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', // Azul escuro para cinza escuro
        'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // Roxo escuro
        'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)', // Azul navy escuro
        'linear-gradient(135deg, #065f46 0%, #047857 100%)', // Verde escuro
        'linear-gradient(135deg, #991b1b 0%, #dc2626 100%)', // Vermelho escuro
        'linear-gradient(135deg, #92400e 0%, #d97706 100%)', // Laranja escuro
        'linear-gradient(135deg, #581c87 0%, #7c2d12 100%)', // Roxo para marrom escuro
        'linear-gradient(135deg, #1f2937 0%, #374151 100%)', // Cinza escuro
        'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', // Azul muito escuro
        'linear-gradient(135deg, #4c1d95 0%, #6b21a8 100%)', // Roxo profundo
      ];
      
      const randomIndex = Math.floor(Math.random() * gradients.length);
      return gradients[randomIndex];
    },
    formatValue(value) {
      if (typeof value === 'number') {
        const locale = this.currency === 'USD' ? 'en-US' : 'pt-BR';
        
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: this.currency
        }).format(value);
      }
      return value;
    },
    formatDate(date) {
      if (!date) return '';
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('pt-BR');
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  padding: 24px;
  margin: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 280px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.card-header {
  margin-bottom: 8px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  opacity: 0.9;
  line-height: 1.2;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  min-height: 60px;
}

.card-value {
  font-size: 22px;
  font-weight: 700;
  margin: 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-date {
  font-size: 12px;
  opacity: 0.8;
  font-weight: 400;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
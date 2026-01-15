/**
 * 🔌 VETRIC - Serviço de API
 * Integração com Backend Node.js
 */

import axios, { AxiosInstance } from 'axios';
import { log, error } from '../lib/logger';

console.log('RUN Vetric API')

class VetricAPI {
  private api: AxiosInstance;

  constructor() {
    const runtimeEnv = (window as any).__ENV__?.VITE_API_URL;
    const buildEnv = (import.meta as any).env.VITE_API_URL;
    console.log('[VITE_API_URL runtime]', runtimeEnv);
    console.log('[VITE_API_URL build]', buildEnv);

    const apiUrl =
      (window as any).__ENV__?.VITE_API_URL ||
      (import.meta as any).env.VITE_API_URL;

    if (!apiUrl) {
      throw new Error('VITE_API_URL não definida. Defina a variável de ambiente no runtime.');
    }
    console.log('[VITE_API_URL selected]', apiUrl);

    this.api = axios.create({
      baseURL: `${apiUrl}`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('[VETRIC API BASE]', this.api.defaults.baseURL);

    // Interceptor para adicionar token de autenticação
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('@vetric:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      (config as any).__start = performance.now();
      log('[API]', (config.method || 'GET').toUpperCase(), config.url);
      return config;
    });

    this.api.interceptors.response.use(
      (response) => {
        const start = (response.config as any).__start;
        const ms = start ? Math.round(performance.now() - start) : undefined;
        log('[API]', response.config.method?.toUpperCase(), response.config.url, '->', response.status, ms !== undefined ? `${ms}ms` : '');
        return response;
      },
      (err) => {
        try {
          const cfg = err.config || {};
          const start = (cfg as any).__start;
          const ms = start ? Math.round(performance.now() - start) : undefined;
          const status = err.response?.status;
          const data = err.response?.data;
          error('[API Error]', cfg.method?.toUpperCase(), cfg.url, '->', status ?? '-', ms !== undefined ? `${ms}ms` : '', data || err.message);
        } catch (e) {
          error('[API Error]', err);
        }
        return Promise.reject(err);
      }
    );
  }

  // ==================== DASHBOARD ====================

  async getDashboardStats() {
    const { data } = await this.api.get('/api/dashboard/stats');
    return data.data;
  }

  async getChargers() {
    const { data } = await this.api.get('/api/dashboard/chargers');
    return data.data;
  }

  async getChargerByUuid(uuid: string) {
    const { data } = await this.api.get(`/api/dashboard/charger/${uuid}`);
    return data.data;
  }

  // ==================== MORADORES ====================

  async getMoradores() {
    const { data } = await this.api.get('/api/moradores');
    return data.data;
  }

  async getMoradorById(id: number) {
    const { data } = await this.api.get(`/api/moradores/${id}`);
    return data.data;
  }

  async getMoradorByTag(tag: string) {
    const { data } = await this.api.get(`/api/moradores/tag/${tag}`);
    return data.data;
  }

  async createMorador(morador: {
    nome: string;
    apartamento: string;
    telefone: string;
    tag_rfid: string;
    notificacoes_ativas?: boolean;
  }) {
    const { data } = await this.api.post('/api/moradores', morador);
    return data.data;
  }

  async updateMorador(id: number, updates: {
    nome?: string;
    apartamento?: string;
    telefone?: string;
    tag_rfid?: string;
    notificacoes_ativas?: boolean;
  }) {
    const { data } = await this.api.put(`/api/moradores/${id}`, updates);
    return data.data;
  }

  async deleteMorador(id: number) {
    const { data } = await this.api.delete(`/api/moradores/${id}`);
    return data;
  }

  async getMoradoresStats() {
    const { data } = await this.api.get('/api/moradores/stats/summary');
    return data.data;
  }

  // ==================== CARREGAMENTOS ====================

  async getCarregamentos(limit: number = 100) {
    const { data } = await this.api.get(`/api/carregamentos?limit=${limit}`);
    return data.data;
  }

  async getCarregamentosAtivos() {
    const { data } = await this.api.get('/api/carregamentos/ativos');
    return data.data;
  }

  async getCarregamentosByMorador(moradorId: number, limit: number = 50) {
    const { data } = await this.api.get(`/api/carregamentos/morador/${moradorId}?limit=${limit}`);
    return data.data;
  }

  async getCarregamentosStatsToday() {
    const { data } = await this.api.get('/api/carregamentos/stats/today');
    return data.data;
  }

  async getCarregamentosStatsByPeriod(start: string, end: string) {
    const { data } = await this.api.get(`/api/carregamentos/stats/period?start=${start}&end=${end}`);
    return data.data;
  }

  // ==================== TEMPLATES ====================

  async getTemplates() {
    const { data } = await this.api.get('/api/templates');
    return data.data;
  }

  async getTemplateByTipo(tipo: string) {
    const { data } = await this.api.get(`/api/templates/${tipo}`);
    return data.data;
  }

  async updateTemplate(tipo: string, updates: {
    mensagem?: string;
    ativo?: boolean;
  }) {
    const { data } = await this.api.put(`/api/templates/${tipo}`, updates);
    return data.data;
  }

  // ==================== RELATÓRIOS ====================

  async getRelatorios() {
    const { data } = await this.api.get('/api/relatorios');
    return data.data;
  }

  async uploadRelatorio(formData: FormData) {
    const { data } = await this.api.post('/api/relatorios/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  }

  async downloadRelatorio(id: number) {
    const response = await this.api.get(`/api/relatorios/${id}/download`, {
      responseType: 'blob',
    });
    return response.data;
  }

  async deleteRelatorio(id: number) {
    const { data } = await this.api.delete(`/api/relatorios/${id}`);
    return data;
  }

  // ==================== EVOLUTION API ====================

  async testEvolutionApi(telefone: string, mensagem: string) {
    const { data } = await this.api.post('/api/test-evolution', {
      telefone,
      mensagem,
    });
    return data.data;
  }

  // ==================== CONFIGURAÇÕES ====================

  async getConfiguracoes() {
    const { data } = await this.api.get('/api/config');
    return data.data;
  }

  async getConfiguracao(chave: string) {
    const { data } = await this.api.get(`/api/config/${chave}`);
    return data.data;
  }

  async updateConfiguracao(chave: string, valor: string) {
    const { data } = await this.api.put(`/api/config/${chave}`, { valor });
    return data.data;
  }

  async updateConfiguracoes(configs: Array<{ chave: string; valor: string }>) {
    const { data } = await this.api.post('/api/config/batch', { configs });
    return data.data;
  }

  // ==================== SYSTEM ====================

  async restartBackend() {
    const { data } = await this.api.post('/api/system/restart');
    return data;
  }

  async getSystemStatus() {
    const { data } = await this.api.get('/api/system/status');
    return data.data;
  }

  // ==================== HEALTH CHECK ====================

  async healthCheck() {
    const { data } = await this.api.get('/health');
    return data;
  }

  // ==================== AUTH ====================

  async login(credentials: { email: string; senha: string }) {
    const { data } = await this.api.post('/api/auth/login', credentials);
    return data;
  }
}

// Exportar instância única
export const vetricAPI = new VetricAPI();
export default vetricAPI;


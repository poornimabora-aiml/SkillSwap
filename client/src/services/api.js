const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = localStorage.getItem('skillswap_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: (userId) => request(`/auth/profile/${userId}`),
  updateProfile: (payload) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(payload) }),
  addUserSkill: (payload) => request('/auth/skills/add', { method: 'POST', body: JSON.stringify(payload) }),
  removeUserSkill: (payload) => request('/auth/skills/remove', { method: 'DELETE', body: JSON.stringify(payload) }),

  // Skills Catalog & Explore
  getSkills: () => request('/skills'),
  getCategories: () => request('/skills/categories'),
  exploreSkills: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/skills/explore${qs ? `?${qs}` : ''}`);
  },

  // Two-Way Matching
  getMatchRecommendations: (userId) => request(`/matches/recommendations/${userId}`),
  getAllMutualMatches: () => request('/matches/all-mutual'),

  // Exchanges & Requests
  sendExchangeRequest: (payload) => request('/exchanges/request', { method: 'POST', body: JSON.stringify(payload) }),
  getMyRequests: (userId) => request(`/exchanges/requests/${userId}`),
  updateRequestStatus: (requestId, status) => request(`/exchanges/requests/${requestId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  getUserExchanges: (userId) => request(`/exchanges/user/${userId}`),
  completeExchange: (exchangeId, feedback) => request(`/exchanges/${exchangeId}/complete`, {
    method: 'PUT',
    body: JSON.stringify({ feedback })
  }),

  // Reviews
  submitReview: (payload) => request('/reviews', { method: 'POST', body: JSON.stringify(payload) }),
  getExchangeReviews: (exchangeId) => request(`/reviews/exchange/${exchangeId}`),

  // DBE College Evaluation Stats & Schema
  getDbeStats: () => request('/dbe/stats'),
  getDbeSchema: () => request('/dbe/schema')
};

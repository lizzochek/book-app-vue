export default {
  namespaced: true,
  state() {
    return {
      userId: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
    },
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login',
      });
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup',
      });
    },
    logout(context) {
      localStorage.removeItem('userId');

      context.commit('setUser', {
        userId: null,
      });
    },
    async auth(context, payload) {
      const { mode } = payload;

      const fetchParam = mode === 'signup' ? 'signUp' : 'signInWithPassword';
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:${fetchParam}?key=AIzaSyBOL3cMReim79mITUvcC9CesBpT7zk5NEw`;

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong');
      }

      localStorage.setItem('userId', resData.localId);
      context.commit('setUser', {
        userId: resData.localId,
      });
    },
    autoLogIn(context) {
      const userId = localStorage.getItem('userId');

      if (userId) {
        context.commit('setUser', {
          userId,
        });
      }
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },

    isAuthenticated(state) {
      return !!state.token;
    },
  },
};
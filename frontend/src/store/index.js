import { createStore } from 'vuex'
import axiosClient from '@/utils/axiosClient'
// const jwt = require('jsonwebtoken'); //appel de jwt pour les token


export default createStore({
  state: {
    posts: [],
    currentPost: null,
    currentUser: localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : null,
  },
  
  mutations: {
    loadPosts(state, posts) {
      state.posts = posts;
    },
    currentUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    currentPost(state, post){
      state.post = post;
    }
  },

  actions: {
    loadPosts: ({ commit }) => {
      return axiosClient
        .get('/api/post')
        .then(res => {
        commit('loadPosts', res.data.posts);
        return res.data.posts;
        })
        .catch(error => (error))
    },

    // faire l'action logout:
    // - supprimer le localStorage currentUser
    // - state.currentUser = null
    //
    // pour le reste du code, utiliser $store.state.user
    // pour savoir si tu es connecté
    // ou pour afficher les infos du user.

    login({ commit }, {email, password}) {
      return axiosClient.post('/api/auth/login', {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      })
      .then((res)=> {
        const user = {
          id: res.data.UserId,
          token: res.data.token,
          avatar: res.data.avatar,
          author: res.data.author
        }
        // console.log('login:res', res);
        // console.log('login:user', user);

        commit('currentUser', user);
        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
      })
    },
    logout({ commit }) {
      localStorage.clear('currentUser');
      commit('currentUser', null);
    },
    getPostId({ commit }, { id }){
      console.log('GET POST ID called');
      commit('currentPostLoading', true);
      commit('currentPostError', null);
      return axiosClient.get(`/api/post/${id}`)
      .then((res) => {
        const post = res.data.post;
        console.log('getPostId', post);
        commit('currentPost', post);
        commit('currentPostLoading', false);
        return post;
      })
      .catch(error => {
        commit('currentPostError', error);
        console.log('error getPostId()', error);
        throw new Error(error);
      })
    },

    
  }
})
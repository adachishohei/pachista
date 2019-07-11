import Vue from 'vue';
import Vuex, {MutationTree} from 'vuex';

Vue.use(Vuex);

interface State {
  user: any;
  status: boolean;
}

const state: State = {
  user: {},
  status: false,
};

const getters = {
  user: (state: State) => state.user,
  isSignedIn: (state: State) => state.status
};

const mutations: MutationTree<State> = {
  onAuthStateChanged: (state, data: any) => (state.user = data),
  onUserStatusChanged: (state, data: boolean) => (state.status = data),
};

const actions = {};

export default new Vuex.Store<State>({
  state,
  getters,
  mutations,
  actions,
});

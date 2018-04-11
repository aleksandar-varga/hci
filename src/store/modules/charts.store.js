import * as _ from 'lodash';
import Vue from 'vue';
import DataController from 'Controllers/data.controller';

const state = {
  // tabs: { id: { componentId: 0, layout: [{chartData, chartType, x, y , w, h, i }], name, }, id: .... }
  tabs: { '0': { componentId: 0, name: 'Tab 0', layout: [] } },
  tabId: 0
};

const getters = {
  layout: (state) => (tabId) => {
    return state.tabs[tabId].layout;
  },
  allIdsOnLayout: (state) => (id) => _.map(state.tabs[id].layout, 'id'),
  dataById: (state) => (tabId, id) => {
    return _.find(state.tabs[tabId], { id });
  },
  tabs: (state) => state.tabs,
  tab: (state) => (id) => state.tabs[id]
};

const mutations = {
  updateLayoutStorage(state) {
    localStorage.setItem('tabId', JSON.stringify(state.tabId));
    localStorage.setItem('tabs', JSON.stringify(state.tabs));
  },
  setTabs(state, data) {
    state.tabId = data.tabId || 0;

    _.forEach(data.tabs, (tab) => {
      _.forEach(tab.layout, (component) => {
        DataController.monitorSource(component.props.params);
      });
    });

    Vue.set(state, 'tabs', _.isEmpty(data.tabs) ? state.tabs : data.tabs);
  },
  removeComponent(state, data) {
    const index = _.findIndex(state.tabs[data.tabId].layout, { i: data.id });
    if (index < 0) {
      return;
    }
    state.tabs[data.tabId].layout.splice(index, 1);
  },
  addComponent(state, payload) {
    const tab = state.tabs[payload.tabId];
    tab.componentId++;
    tab.layout.push({
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      i: String(tab.componentId),
      type: payload.dataView.type,
      props: {
        type: payload.dataView.subtype,
        params: payload.dataSource.apiParams,
        points: payload.dataSource.points,
      }
    });
  },
  addTab(state, value) {
    state.tabId++;
    const newTab = { componentId: 0, layout: [], name: value };
    Vue.set(state.tabs, `${state.tabId}`, newTab);
  },
  removeTab(state, tabId) {
    Vue.delete(state.tabs, tabId);
  },
  renameTab(state, data) {
    const tab = state.tabs[data.tabId];
    tab.name = data.name;
  }
};

export {
  state,
  getters,
  mutations,
};

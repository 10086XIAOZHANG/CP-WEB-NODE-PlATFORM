/**
 *创建时间:  2018/4/13
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能: localStorage、cookieStorage配置
 */
import localStorage from 'store/storages/localStorage';
import cookieStorage from 'store/storages/cookieStorage';
import defaults from 'store/plugins/defaults';
import expire from 'store/plugins/expire';
import engine from 'store/src/store-engine';

const storages = [
  localStorage,
  cookieStorage,
];
const plugins = [
  defaults,
  expire,
];

const store = engine.createStore(storages, plugins);
// 加载插件后的store
export { store };


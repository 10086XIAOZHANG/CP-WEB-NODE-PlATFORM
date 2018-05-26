/**
 *创建时间:  2017/11/4
 *  作  者：Jimck_Zhang
 *  邮  箱：XIAOZHANG10086XIAOZHANG@live.com
 *  功  能:我们为了统一方便的管理路由和页面的关系，将配置信息统一抽离到 common/nav.js 下，同时应用动态路由
 */
import ScreenConfig from './screen.config';

const Config = {};
Config.defaultProps = {
  api: 'http://192.168.1.109:3000',
  K3_DB_ADDRESS: 'K3_DB_ADDRESS',
  resource_server: 'http://192.168.1.109:8085',
  ACCT_ID: 'ACCT_ID',
  SESSION_KEY: 'SESSION_KEY',
  USER_TOKEN: 'USER_TOKEN',
  USER_ID: 'USER_ID',
  LEFT_MENU_WIDTH: 'LEFT_MENU_WIDTH',
  LEFT_MENU_IMG_WIDTH: 'LEFT_MENU_IMG_WIDTH',
};
Config.screenConfig = ScreenConfig;
export default Config;

import config from './env.js'; // 测试环境
/**
 * 环境
 */
export const env = config.env;
/**
 * 日志状态, 生产环境禁止打印日志
 */
export const log = env === 'production' ? false : true;
/**
 * 版本号
 */
export const version = '1.0.0';
/**
 * OpenAI 密钥
 */
export const OPEN_API_KEY = '';
/**
 * AppId
 */
export const appId = config.appId;
/**
 * 根域名
 */
export const baseUrl = config.baseUrl;
export const apiVersion = config.apiVersion;

/**
 * 分享图片
 */
export const shareImage = config.shareImage;

export default {
  env,
  log,
  version,
  appId,
  apiVersion,
	baseUrl,
	OPEN_API_KEY
};

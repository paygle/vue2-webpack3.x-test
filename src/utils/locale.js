import locale from 'element-ui/src/locale';
import {
  getLocalStore,
  setLocalStore
} from './storage';

// 设置语言
let language = getLocalStore('language');
let thandle = null;

if (language) Vue.config.lang = language;

if (!Vue.config.lang) Vue.config.lang = 'cn';

const isFunc = (f) => typeof f === 'function';

const getProperty = (prop, obj) => obj[prop];

const addlangFile = (lang, cb) => {
  let fmap = {'en': 'en', 'cn': 'zh-CN', 'tw': 'zh-TW'};
  lang = String(lang).toLocaleLowerCase(lang);
  if (fmap[lang]) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `static/js/lang/${fmap[lang]}.js`;
    s.onload = cb;
    document.body.appendChild(s);
  }
};

const changeLang = (lang, cb) => {
  Vue.config.lang = lang;
  locale.use(Vue.langs[lang]);
  if (isFunc(cb)) thandle = setTimeout(function() { cb(lang); }, 100);
};

const loadLocalLang = (lang, cb) => {
  let nlang;
  let lz = ['en', 'cn', 'tw'];

  if (Vue && Vue.langs) {

    if (Vue.langs[lang]) {
      changeLang(lang, cb);
      return;
    }

    let llang = getLocalStore('translationCode');

    llang = llang && JSON.parse(llang);

    for (let i = 0; i < lz.length; i++) {
      nlang = Vue.langs[lz[i]];
      if (nlang) break;
    }

    if (nlang && llang && llang.langtype === lang &&
      nlang.timestamp === llang.timestamp) {

      Vue.langs[lang] = llang;
      changeLang(lang, cb);
      return true;

    } else {
      return false;
    }
  }
  return false;
};

/**
 * 设置语言
 * @param {String} lang       语言类型 cn 中文  tw 繁体 en 英文三选一
 * @param {Function} cb(lang) 语言设置完成后调用函数
 */
export const $setLocale = (lang, cb) => {

  clearTimeout(thandle);
  lang = String(lang).toLocaleLowerCase(lang);

  setLocalStore('language', lang);

  if (!loadLocalLang(lang, cb)) {
    addlangFile(lang, function() {
      changeLang(lang, cb);
      setLocalStore('translationCode', JSON.stringify(Vue.langs[lang]));
    });
  }
};

/**
 * 全局语言翻译函数
 * @param {String} key 需要翻译的KEY值
 */
Vue.prototype.$t = (key) => {
  if (Vue.langs[Vue.config.lang] && typeof key === 'string') {
    let lang = Vue.langs[Vue.config.lang];
    let params = key.split('.');
    for (let i = 0; i < params.length; i++) {
      lang = getProperty(params[i], lang);
      if (!lang) break;
      if (typeof lang === 'string' && i === params.length - 1) {
        key = lang;
      }
    }
    return key;
  }
  return key;
};

Vue.prototype.$setLocale = $setLocale;

import locale from 'element-ui/lib/locale';

// 设置语言
if (!Vue.config.lang) Vue.config.lang = 'zhCN';
if (Vue.langs) {
  locale.use(Vue.langs[Vue.config.lang] || Vue.langs.zhCN);
}

const getPathProperty = (prop, obj) => obj[prop];
const addlangFile = (lang, cb) => {
  let fmap = {'en': 'en', 'zhCN': 'zh-CN', 'zhTW': 'zh-TW'};
  if (fmap[lang]) {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = `static/js/lang/${fmap[lang]}.js`;
    s.onload = cb;
    document.body.appendChild(s);
  }
};

// 语言翻译
Vue.prototype.$t = (paths) => {
  if (Vue.langs[Vue.config.lang] && typeof paths === 'string') {
    let lang = Vue.langs[Vue.config.lang];
    let params = paths.split('.');
    for (let i = 0; i < params.length; i++) {
      lang = getPathProperty(params[i], lang);
      if (!lang) break;
      if (typeof lang === 'string' && i === params.length - 1) {
        paths = lang;
      }
    }
    return paths;
  }
  return paths;
};

// 设置语言
Vue.prototype.$setLocale = (lang, cb) => {
  if (lang !== Vue.config.lang) {
    let self = this;
    if (!Vue.langs[lang]) {
      addlangFile(lang, function() {
        Vue.config.lang = lang;
        locale.use(Vue.langs[lang]);
        if (typeof cb === 'function') cb.apply(self, arguments);
      });
    } else {
      Vue.config.lang = lang;
      locale.use(Vue.langs[lang]);
      if (typeof cb === 'function') {
        setTimeout(()=>cb.apply(self, arguments), 100);
      }
    }
  }
};

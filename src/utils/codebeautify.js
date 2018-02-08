
/**
 * @param { String } code 需要被格式化的代码
 * @param { Object } dom 挂载的DOM结点对象
 */
export function codeBeautify(code, dom) {
  let js_beautify = window.js_beautify;
  let SyntaxHighlighter = window.SyntaxHighlighter;
  let opts = {
    brace_style: 'collapse',
    break_chained_methods: false,
    indent_char: ' ',
    indent_scripts: 'keep',
    indent_size: '2',
    keep_array_indentation: true,
    preserve_newlines: true,
    space_after_anon_function: true,
    space_before_conditional: true,
    unescape_strings: false,
    wrap_line_length: '120'
  };

  if (js_beautify && SyntaxHighlighter) {

    let js = js_beautify(code, opts);
    js = js.replace(/>/g, '&gt;').replace(/</g, '&lt;');
    js = '<pre class="brush: js;toolbar:false;">' + js + '</pre>';
    dom.innerHTML = js;

    // 代码高亮
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.highlight();

  } else {
    console && console.info('Required vendor libs js_beautify and SyntaxHighlighter!');
  }
};

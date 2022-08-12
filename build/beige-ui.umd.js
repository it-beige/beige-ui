;(function (e, t) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((e = typeof globalThis != 'undefined' ? globalThis : e || self),
      t((e['beige-ui'] = {}), e.Vue))
})(this, function (e, t) {
  'use strict'
  const l = {
    type: { type: String, default: 'default' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 }
  }
  var o = t.defineComponent({
      name: 'BgButton',
      props: l,
      setup(n, { slots: u }) {
        const { type: f, size: r, disabled: p, block: c } = t.toRefs(n),
          b = c.value ? 's-btn--block' : ''
        return () =>
          t.createVNode(
            'button',
            {
              disabled: p.value,
              class: `s-btn s-btn--${f.value} s-btn--${r.value} ${b}`
            },
            [u.default ? u.default() : '\u6309\u94AE']
          )
      }
    }),
    s = {
      install(n) {
        n.component(o.name, o)
      }
    },
    i = '0.1.0'
  const a = [s]
  var d = {
    version: i,
    install(n) {
      a.forEach(u => n.use(u))
    }
  }
  ;(e.Button = o),
    (e.default = d),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})

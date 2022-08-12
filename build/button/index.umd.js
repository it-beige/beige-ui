;(function (e, t) {
  typeof exports == 'object' && typeof module != 'undefined'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((e = typeof globalThis != 'undefined' ? globalThis : e || self),
      t((e.index = {}), e.Vue))
})(this, function (e, t) {
  'use strict'
  const d = {
    type: { type: String, default: 'default' },
    size: { type: String, default: 'medium' },
    disabled: { type: Boolean, default: !1 },
    block: { type: Boolean, default: !1 }
  }
  var n = t.defineComponent({
      name: 'BgButton',
      props: d,
      setup(u, { slots: o }) {
        const { type: i, size: s, disabled: a, block: f } = t.toRefs(u),
          p = f.value ? 's-btn--block' : ''
        return () =>
          t.createVNode(
            'button',
            {
              disabled: a.value,
              class: `s-btn s-btn--${i.value} s-btn--${s.value} ${p}`
            },
            [o.default ? o.default() : '\u6309\u94AE']
          )
      }
    }),
    l = {
      install(u) {
        u.component(n.name, n)
      }
    }
  ;(e.Button = n),
    (e.default = l),
    Object.defineProperties(e, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' }
    })
})

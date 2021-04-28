function e(e) {
  return e && e.__esModule ? e.default : e;
}
var t = e(require("styled-components")),
  n = e(require("save-as")),
  r = require("lodash").sample,
  l = e(require("react-dom")),
  o = require("react"),
  s = e(o),
  a = o.useReducer,
  i = o.useEffect;
const u = [
    String.fromCodePoint(9917),
    String.fromCodePoint(9749),
    String.fromCodePoint(127850),
    String.fromCodePoint(127819),
    String.fromCodePoint(127829),
  ],
  c = { keys: [], paused: !1, history: [], finished: !1, started: !1 },
  d = (e, t) => {
    switch (t.type) {
      case "Start":
        return { ...e, started: !0 };
      case "NextKey": {
        const { history: n } = e,
          r = [...e.keys, t.key],
          l = n.filter(({ key: e, strokes: t }, r) => {
            const l = r > 2 && n[r - 2];
            return l && l.key === e && 0 === t.length;
          }).length,
          o = r.length >= 15 || l > 1;
        return e.finished
          ? e
          : {
              ...e,
              keys: r,
              paused: !1,
              history: [
                ...e.history,
                { key: t.key, strokes: [], start: t.now },
              ],
              finished: o,
            };
      }
      case "Pause":
        return { ...e, paused: !0 };
      case "Press": {
        const { history: n, finished: r } = e,
          l = n.splice(0, n.length - 1),
          o = n.length ? n[n.length - 1] : { strokes: [] };
        return r
          ? e
          : { ...e, history: [...l, { ...o, strokes: [...o.strokes, t.now] }] };
      }
      case "Reset":
        return c;
      default:
        return e;
    }
  },
  m = t.p`
  font-size: 3em;
`,
  h = ({ paused: e, keys: t }) =>
    s.createElement(
      m,
      null,
      e ? s.createElement(s.Fragment, null) : t[t.length - 1],
      " "
    ),
  p =
    (t.button`
  border: 1px solid white;
  border-radius: 1em;
  width: 100%;
  padding: 1em;
`,
    ({ history: e, onReset: t, onDownload: n }) => {
      const r = e.filter(({ key: t, strokes: n }, r) => {
          const l = r > 2 && e[r - 2],
            o = l && l.key === t;
          return (o && 0 !== n.length) || (!o && 0 === n.length);
        }).length,
        l = e.filter(({ key: t, strokes: n }, r) => {
          const l = r > 2 && e[r - 2];
          return l && l.key === t && 0 === n.length;
        }).length,
        o = e.filter(({ key: t, strokes: n }, r) => {
          const l = r > 2 && e[r - 2];
          return !(l && l.key === t) && 0 !== n.length;
        }).length;
      return s.createElement(
        "div",
        null,
        s.createElement("p", null, "Total: ", e.length),
        s.createElement("p", null, "Correct: ", r, " "),
        s.createElement("p", null, "Missed: ", l),
        s.createElement("p", null, "False positive: ", o, " "),
        s.createElement("button", { onClick: n }, "Download results"),
        s.createElement("button", { onClick: t }, "Start over")
      );
    }),
  y = t.div`
  min-width: 400px;
  width: 800px;
  border: 1px solid white;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
`,
  g = t.button`
  border: 1px solid white;
  border-radius: 1em;
  width: 100%;
  padding: 1em;
`,
  k = ({ onStart: e }) =>
    s.createElement(
      y,
      null,
      s.createElement(
        "p",
        null,
        "You are going to be presented with a sequence of stimuli."
      ),
      s.createElement(
        "p",
        null,
        "You will have to react when the image is the same as the one presented before the previous one."
      ),
      s.createElement(
        "p",
        null,
        "For example, you should push on any button when the following sequence appears:"
      ),
      s.createElement("p", null, s.createElement("strong", null, "AAA")),
      s.createElement("p", null, s.createElement("strong", null, "ABA")),
      s.createElement(
        "p",
        null,
        "For example, you should NOT push any button when a sequence does not fill this criteria, for example:"
      ),
      s.createElement("p", null, s.createElement("strong", null, "BBA")),
      s.createElement("p", null, s.createElement("strong", null, "BAA")),
      s.createElement("p", null, s.createElement(g, { onClick: e }, "Start"))
    ),
  E = t.div`
  width: 100%;
  height: 100%;
  background-color: black;
  margin: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`,
  f = () => {
    const [e, t] = a(d, c),
      { keys: l, paused: o, history: m, started: y, finished: g } = e,
      f = () => {
        var e;
        t({ type: "NextKey", key: r(u), now: e }),
          setTimeout(() => {
            t({ type: "Pause" });
          }, 1e3);
      };
    i(() => {
      if (y) {
        f();
        const e = setInterval(() => f(), 2500);
        return () => clearInterval(e);
      }
    }, [y]);
    document.addEventListener("keyup", (e) => {
      t({ type: "Press", now: new Date() });
    });
    return s.createElement(
      E,
      null,
      y
        ? g
          ? s.createElement(p, {
              history: m,
              onDownload: () =>
                n(
                  new Blob([JSON.stringify(m)], {
                    type: "text/plain;charset=utf-8",
                  }),
                  "result.json"
                ),
              onReset: () => t({ type: "Reset" }),
            })
          : s.createElement(h, { keys: l, paused: o })
        : s.createElement(k, {
            onStart: () => {
              t({ type: "Start" });
            },
          }),
      " "
    );
  };
l.render(s.createElement(f, null), document.getElementById("root"));
//# sourceMappingURL=index.js.map

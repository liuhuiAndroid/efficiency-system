function Digit(a) {
    function b(a, b) {
        var g, h, e = d(b),
            f = e.toString().length;
        for (g = 0; f > g; g++) h = document.createElement("div"), h.className = "," != e[g] && "." != e[g] ? "to__led-number" : "to__led-number to__led-number--no", h.innerHTML = e[g], a.appendChild(h)
    }

    function c(a, b, c) {
        function i() {
            return 9 == h ? h = 0 : h++, h
        }
        var e, f, g, h, j, k, d = a.childNodes.length - 1;
        for (e = 0; e < a.childNodes.length; e++) f = {}, f = "left" == c ? a.childNodes[e] : a.childNodes[d], g = f.innerHTML, h = 0, f.innerHTML = "", "," != g && "." != g && (b.timerTemp += b.single), j = .5 * b.timerTemp / b.speed, k = b.timerTemp - j, ! function(a, b) {
            setTimeout(function() {
                if (a.innerHTML = b, "," != b && "." != b) {
                    a.innerHTML = b;
                    var c = setInterval(function() {
                        a.innerHTML = i()
                    }, 50);
                    setTimeout(function() {
                        clearInterval(c), a.innerHTML = b
                    }, 1e3 * k)
                } else a.innerHTML = b
            }, 1e3 * j)
        }(f, g), d--
    }

    function d(a) {
        var c, d, f, g, h;
        for (a = a.toString(), c = a.split("."), d = c[0], f = "." + c[1], g = d, h = 1; h <= Math.floor((d.length - 1) / 3); h++) g = e(g, d.length - 3 * h, ",");
        return g += f
    }

    function e(a, b, c) {
        return a.slice(0, b) + c + a.slice(b)
    }
    Digit.prototype.render = function() {
        var d = a.direction,
            e = a.finish,
            f = a.speed,
            g = a.number.toString().replace(".", "").length - 1,
            h = Number((e / g).toFixed(2)),
            i = {
                number: g,
                single: h,
                speed: f,
                timerTemp: 0
            };
        i.timerTemp -= i.single, b(a.dom, a.number, i), c(a.dom, i, d)
    }
}
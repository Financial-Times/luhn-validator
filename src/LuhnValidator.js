(function(root) {
    function validate() {
        var check = 0;
        var isEven = false;
        // TODO There is a bit of duplication between here and the data-filters attribute
        var value = this.el.value.replace(/[\s\-]/g, '');

        for (var n = value.length - 1; n >= 0; n--) {
            var digit = parseInt(value.charAt(n), 10);

            if (isEven) {
                if ((digit *= 2) > 9) {
                    digit -= 9;
                }
            }

            check += digit;
            isEven = !isEven;
        }

        if ((check % 10) !== 0) {
            this.el.setCustomValidity(this.config.message);

            this.el.dispatchEvent(new CustomEvent('invalid', {
                bubbles: false,
                cancelable: true
            }));
        } else {
            this.el.setCustomValidity('');
        }
    }

    function compile(el) {
        var attrs = el.attributes;
        var prefix = 'luhn-validator-';
        var i = attrs.length;
        var name;
        var config = {};

        while (i--) {
            name = attrs[i].name;

            if (name.indexOf(prefix) === 0) {
                name = name.replace(prefix, '');
                config[name] = attrs[i].value;
            }
        }

        return new LuhnValidator(el, config);
    }

    function LuhnValidator(el, config) {
        if (!(this instanceof LuhnValidator)) {
            return new LuhnValidator(el);
        }

        this.el = el;
        this.config = config;
        // this.el.addEventListener('change', validate.bind(this));
        this.el.addEventListener('keyup', validate.bind(this));
    }

    LuhnValidator.init = function(rootEl) {
        var selector = '[luhn-validator]';

        if (rootEl.matches(selector)) {
            return compile(rootEl);
        }

        var nodes = rootEl.querySelectorAll(selector);
        var validators = [];
        var i = nodes.length;

        while (i--) {
            validators.push(compile(nodes[i]));
        }

        return validators;
    };

    if (typeof exports === 'object') {
        module.exports = LuhnValidator;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return LuhnValidator;
        });
    } else {
        root.LuhnValidator = LuhnValidator;
    }
})(this);
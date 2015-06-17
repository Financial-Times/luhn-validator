#Luhn Validator
A Javascript module for validating credit card numbers in HTML inputs.

##How it works
The validator listens to `keyup` events on configured inputs and validate their values. If the value is not a valid credit card number, it will set a custom validity error on the element and trigger an `invalid` event. If the browser supports the HTML5 constraint API, this will trigger some kind of validation message to be displayed.

You can also override the browser's validation error handling and implement your own by listening for `invalid` events on the element.

##Usage
The module exposes itself as a CommonJS module, AMD module or as a global variable.

First add the necessary [configuration options](#config-options) to the input element you want to validate:

```
<input type="text" id="credit-card-number" luhn-validator luhn-validator-message="Please enter a valid credit card number">
```

Then initialise the validator in your Javascript:

```
LuhnValidator.init(document.getElementById('credit-card-number'));
```

##<a id="config-options"></a>Configuration Options
There are two configuration options that must be defined as attributes on the DOM element you want to validate:

* `luhn-validator`<br>This attribute just tells the validator that you want to validate this element. It doesn't take a value.
* `luhn-validator-message`<br>The value of the element's `validationMessage` property when the element is invalid.

##Javascript API
* `LuhnValidator.init(HTMLElement)`<br>
Initialises the validator. If the given element has the configuration attributes defined on it, it will return a LuhnValidator instance using the given element.If the given element does not have a `luhn-validator` attribute, it will scan the element for any children with `luhn-validator` attributes. It will return an array of LuhnValidator instances for every element found.
* `LuhnValidator(HTMLElement, config = {})`<br>
Constructs an instance of LuhnValidator directly. The first argument is the element to validate, and the second argument is the config object. The keys of the config object are the same as defined in [configuration options](#config-options), minus the `luhn-validator-` prefix.






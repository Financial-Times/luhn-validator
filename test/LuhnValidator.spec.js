describe('Luhn Validator', function() {
    beforeAll(function() {
        fixture.setBase('test/fixtures');
    });

    beforeEach(function() {
        fixture.load('fixture.html');
        LuhnValidator.init(fixture.el);
    });

    afterEach(function() {
        fixture.cleanup();
    });

    it('should trigger an invalid event and set a custom validity message if invalid', function(done) {
        var input = document.getElementById('credit-card-number');

        input.addEventListener('invalid', function() {
            expect(input.validity.valid).toBe(false);
            expect(input.validationMessage).toEqual('Please enter a valid credit card number');

            done();
        });

        input.value = 'invalid';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));
    });

    it('should be valid for a valid Visa card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '4111111111111111';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(true);
        done();
    });

    it('should be invalid for a invalid Visa card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '4111111111111112';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(false);
        done();
    });

    it('should be valid for a valid Mastercard card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '5555555555554444';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(true);
        done();
    });

    it('should be invalid for a invalid Mastercard card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '5555555555554440';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(false);
        done();
    });

    it('should be valid for a valid Amex card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '378282246310005';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(true);
        done();
    });

    it('should be invalid for a invalid Amex card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '378282246310001';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(false);
        done();
    });

    it('should ignore hyphens in the card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '4111-1111-1111-1111';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(true);
        done();
    });

    it('should ignore spaces in the card number', function(done) {
        var input = document.getElementById('credit-card-number');

        input.value = '4111 1111 1111 1111';
        input.dispatchEvent(new Event('keyup', {
            bubbles: true,
            cancelable: true
        }));

        expect(input.validity.valid).toBe(true);
        done();
    });
});
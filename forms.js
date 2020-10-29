const init = function() {
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);
};

const reset = function(ev) {
    // HTML will automaticly put the form back to the inital state
    // unless we do that
    ev.preventDefault();
    // we can reset programatically
    document.getElementById('form-user').reset();
    feild.parentElement.classList.remove('error');

};

const validate = function() {
    let valid = false;
    let failures = [];
    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const select = document.getElementById('input-age'); // .selected index .options .length 
    const chk = document.getElementById('input-alive'); // .checked .value

    // logic for first (element)
    if (first.value === '') { // empty string ('') is a falsy value
        failures.push({ input: 'input-first', msg: 'Required feild'});
    }
    // logic for the email (element)
    if (email.value === '' || !email.value.includes('@')) {
    failures.push({ input: 'input-email', msg: 'Required feild'});
    }
    // logic for password (element)
    if (password.value === '' || password.value.length < 8) {
        failures.push({ input: 'input-password', msg: 'Must be at least 8 characters'});
    }
    // Logic for select (element)
    if (select.selectedIndex === 0) {
        failures.push({ input: 'input-age', msg: 'Too young'});
    }
    // Logic for check (element)
    if (!chk.checked) {
        failures.push({ input: 'input-alive', msg: "Must be alive to submit form"})
    }

    return failures;
};

const send = function(ev) {
    ev.preventDefault();
    ev.stopPropagation(); // bubbling up to any parent element (the click)
    
    let fails = validate();

    if (fails.length === 0) {
        // good to go
        document.getElementById('form-user').submit();
    } else {
        // bad user
        fails.forEach(obj => {
            const feild = document.getElementById(obj.input);
            feild.parentElement.classList.add('error');
            feild.parentElement.setAttribute('data-errormsg', obj.msg)
        })
    }
};

document.addEventListener('DOMContentLoaded', init);
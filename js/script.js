document.addEventListener('DOMContentLoaded', function () {
    let cpfInput = document.getElementById('cpf');
    let telefoneInput = document.getElementById('telefone');

    if (cpfInput) {
        cpfInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
            e.target.value = value;
        });
    }

    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 5) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d*)/, '($1');
            }
            e.target.value = value;
        });
    }

    let cnpjInput = document.getElementById('cnpj');
    let cepInput = document.getElementById('cep');

    if (cnpjInput) {
        cnpjInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 14) value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
            value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
            e.target.value = value;
        });
    }

    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    let uf = document.getElementById('uf');
    if (uf) {
        uf.addEventListener('input', function () {
            let value = this.value.toUpperCase();
            this.value = value.replace(/[^A-Z]/g, '').slice(0, 2);
        });
    }

    let form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            document.querySelectorAll('.input-error-message').forEach(function(el) {
                el.remove();
            });

            let errors = [];
            function showError(input, message) {
                let error = document.createElement('div');
                error.className = 'input-error-message';
                error.style.color = 'red';
                error.style.marginTop = '2px';
                error.textContent = message;
                input.parentNode.insertBefore(error, input.nextSibling);
            }

            if (cpfInput && cpfInput.value.replace(/\D/g, '').length !== 11) {
                errors.push('CPF deve ter 11 dígitos.');
                showError(cpfInput, 'CPF deve ter 11 dígitos.');
            }
            if (telefoneInput && telefoneInput.value.replace(/\D/g, '').length < 10) {
                errors.push('Telefone deve ter pelo menos 10 dígitos.');
                showError(telefoneInput, 'Telefone deve ter pelo menos 10 dígitos.');
            }
            if (cnpjInput && cnpjInput.value.replace(/\D/g, '').length !== 14) {
                errors.push('CNPJ deve ter 14 dígitos.');
                showError(cnpjInput, 'CNPJ deve ter 14 dígitos.');
            }
            if (cepInput && cepInput.value.replace(/\D/g, '').length !== 8) {
                errors.push('CEP deve ter 8 dígitos.');
                showError(cepInput, 'CEP deve ter 8 dígitos.');
            }
            if (uf && uf.value.length !== 2) {
                errors.push('UF deve ter 2 letras.');
                showError(uf, 'UF deve ter 2 letras.');
            }

            if (errors.length > 0) {
                e.preventDefault();
            }
        });
    }

});
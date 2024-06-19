const form = document.querySelector('form');
const firstNameField = document.querySelector('#first-name');
const lastNameField = document.querySelector('#last-name');
const emailField = document.querySelector('#email');
const radioSupport = document.querySelector('#support');
const radioGeneral = document.querySelector('#general');
const messageField = document.querySelector('#message');
const checkboxField = document.querySelector('#terms');
const btn = document.querySelector('button');

btn.addEventListener("click", function(e) {
    e.preventDefault();
    submit();
});

form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        submit();
    }
});

function submit() {
    const firstName = firstNameField.value.trim();
    const lastName = lastNameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();
    const isChecked = checkboxField.checked;

    let radioChecked = false;
    let queryType = '';

    if (radioSupport.checked) {
        radioChecked = true;
        queryType = 'Support Request';
    } else if (radioGeneral.checked) {
        radioChecked = true;
        queryType = 'General Enquiry';
    }

    const existingMessage = document.querySelector('.invalid-message');
    
    if (existingMessage) {
        return;
    }

    if (firstName === '' || lastName === '' || email === '' || message === '' || !isChecked || !radioChecked) {
        const paraInvalid = document.createElement('p');
        paraInvalid.className = 'invalid-message';
        paraInvalid.textContent = "Dados inválidos! Preencha todos os campos corretamente.";
        paraInvalid.style.marginTop = '15px';
        form.appendChild(paraInvalid);

        setTimeout(() => {
            paraInvalid.remove();
        }, 5000);
    } else {
        const formData = {
            'First name': firstName,
            'Last name': lastName,
            'E-mail address': email,
            'Query Type': queryType,
            'Message': message,
            'Consent': isChecked ? 'Yes' : 'No'
        };
        console.log(JSON.stringify(formData));
        form.innerHTML = '<p>Formulário enviado! <span class="approved">&#10004;</span></p>';
    }
}
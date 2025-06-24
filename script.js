document.addEventListener('DOMContentLoaded', function() {
    /* Declaración de constantes */
    const flipCard = document.querySelector('.flip-card');
    const registerText = document.getElementById('registerText');
    const loginText = document.getElementById('loginText');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const togglePasswordIcon = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('rememberPassword');
    const usernameInput = document.getElementById('username');

    /* Almacenamiento interno y Rotación del inicio de sesión */
    let users = JSON.parse(localStorage.getItem('users')) || [
        { name: 'Admin', username: 'admin', email: 'platantos@gmail.com', password: 'platanito' },
        { name: 'Usuario Demo', username: 'user1', email: 'usuario@gmail.com', password: 'abcd123' }
    ];
    
    function flipCardHandler() {
        flipCard.classList.toggle('flipped');
    }

    /* Para mostrar y ocultar la contrase*/
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
        toggleIcon.style.color = 'white'; 
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
        toggleIcon.style.color = 'white';
    }
}

    /* Manejo del inicio se sesión*/
    function handleLogin(event) {
        event.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username || !password) {
            alert('Por favor ingrese usuario y contraseña');
            return;
        }
        
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedUser', JSON.stringify({ username, password }));
            } else {
                localStorage.removeItem('rememberedUser');
            }
            window.location.href = 'home.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }
/* código para el mansejo del registro*/
    function handleRegister(event) {
        event.preventDefault();
        
        const inputs = event.target.elements;
        const newUser = {
            name: inputs[0].value.trim(),
            username: inputs[1].value.trim(),
            email: inputs[2].value.trim(),
            password: inputs[3].value.trim()
        };

        if (!newUser.name || !newUser.username || !newUser.email || !newUser.password) {
            alert('Por favor complete todos los campos');
            return;
        }
        
        if (newUser.password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const usernameExists = users.some(u => u.username === newUser.username);
        const emailExists = users.some(u => u.email === newUser.email);
        
        if (usernameExists) {
            alert('El nombre de usuario ya está registrado');
            return;
        }
        
        if (emailExists) {
            alert('El correo electrónico ya está registrado');
            return;
        }

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Registro exitoso! Ahora puedes iniciar sesión');
        flipCardHandler(); // Volver al login
        loginForm.reset();
    }

    function loadRememberedCredentials() {
        const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
        if (rememberedUser) {
            usernameInput.value = rememberedUser.username;
            passwordInput.value = rememberedUser.password;
            rememberCheckbox.checked = true;
        }
    }

    registerText.addEventListener('click', flipCardHandler);
    loginText.addEventListener('click', flipCardHandler);
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    if (togglePasswordIcon) {
        togglePasswordIcon.addEventListener('click', togglePasswordVisibility);
    }
    loadRememberedCredentials();
});
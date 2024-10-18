document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const homeSection = document.getElementById('home');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Mostrar formulario de registro
    document.getElementById('show-register').addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    // Mostrar formulario de inicio de sesión
    document.getElementById('show-login').addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Manejar registro
    registerBtn.addEventListener('click', () => {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        if (name && email && password) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                document.getElementById('register-message').innerText = '¡El correo ya está registrado!';
            } else {
                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));
                document.getElementById('register-message').innerText = '¡Registro exitoso!';
                setTimeout(() => {
                    loginForm.classList.remove('hidden');
                    registerForm.classList.add('hidden');
                }, 2000);
            }
        } else {
            document.getElementById('register-message').innerText = 'Por favor completa todos los campos.';
        }
    });

    // Manejar inicio de sesión
    loginBtn.addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            document.getElementById('user-name').innerText = user.name;
            loginForm.classList.add('hidden');
            homeSection.classList.remove('hidden');
        } else {
            document.getElementById('login-message').innerText = 'Correo o contraseña incorrectos.';
        }
    });

    // Manejar cierre de sesión
    logoutBtn.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        loginForm.classList.remove('hidden');
        document.getElementById('login-message').innerText = '';
        document.getElementById('register-message').innerText = '';
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    });
});

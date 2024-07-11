document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('usuariosForm');
    const tableBody = document.getElementById('usuariosTable').querySelector('tbody');
    let isUpdating = false;

    const fetchUsuarios = async () => {
        const response = await fetch('https://koliramone.pythonanywhere.com/usuariocac');
        const usuariocac = await response.json();
        tableBody.innerHTML = '';
        usuariocac.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.email}</td>
                <td>${usuario.pw}</td>
                <td>
                    <button onclick="editUsuario(${usuario.id}, '${usuario.nombre}', '${usuario.apellido}', '${usuario.email}', '${usuario.pw}')">Editar</button>
                    <button onclick="deleteUsuario(${usuario.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row); 
        });
    };

    const addUsuario = async (usuario) => {
        await fetch('https://koliramone.pythonanywhere.com/agregar_usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        fetchUsuarios();
    };

    const updateUsuario = async (id, usuario) => {
        await fetch(`https://koliramone.pythonanywhere.com/actualizar_usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        fetchUsuarios();
    };

    const deleteUsuario = async (id) => {
        await fetch(`https://koliramone.pythonanywhere.com/eliminar_usuario/${id}`, {
            method: 'DELETE'
        });
        fetchUsuarios();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('id').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const pw = document.getElementById('pw').value;
        const usuario = { nombre, apellido, email, pw };

        if (isUpdating) {
            updateUsuario(id, usuario);
            isUpdating = false;
        } else {
            addUsuario(usuario);
        }

        form.reset();
        document.getElementById('id').value = '';
    });

    window.editUsuario = (id, nombre, apellido, email, pw) => {
        document.getElementById('id').value = id;
        document.getElementById('nombre').value = nombre;
        document.getElementById('apellido').value = apellido;
        document.getElementById('email').value = email;
        document.getElementById('pw').value = pw;
        isUpdating = true;
    };

    window.deleteUsuario = (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            deleteUsuario(id);
        }
    };

    fetchUsuarios();
});

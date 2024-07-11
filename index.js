//Tarjetas de Lugares.HTML
    function mostrarPagina(idPagina) { 
    var paginas = document.querySelectorAll('.pagina');
    for (var i = 0; i < paginas.length; i++) {
        paginas[i].classList.remove('activa');
    }
    document.getElementById(idPagina).classList.add('activa');
    }
    function expandirCard(numeroTarjeta) {
        // Ocultar todas las tarjetas
        var tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(function(tarjeta) {
        tarjeta.style.display = 'none';
        }); 
        // Mostrar la tarjeta correspondiente al número
        var tarjetaMostrar = document.getElementById('tarjeta' + numeroTarjeta);
        tarjetaMostrar.style.display = 'block';
    }
    function cerrarTarjeta(numeroTarjeta) {
        // Ocultar la tarjeta correspondiente al número
        var tarjetaCerrar = document.getElementById('tarjeta' + numeroTarjeta);
        tarjetaCerrar.style.display = 'none';
    }


// REGISTRO DE USUARIO
    var nombreInput = document.getElementById("nombreApellido");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirmPassword");

    function registrar() {
        var nombre = nombreInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;

        if(nombre=="" || email=="" || password==""){
            alert("Debe llenar los campos!");
            resetearFormulario();
        }

        if(password=="" && confirmPassword=="" || nombre=="" || email=="" && password==confirmPassword){
            console.log("Debe completar los campos");
            alert("No se completó el registro por falta de campos")
            resetearFormulario();
        }else if(confirmPassword==password && email.includes('@') && email.includes(".com")){ 
            console.log("Nombre:", nombre);
            console.log("Email:", email);
            console.log("Contraseña:", password);
            console.log("Confirmar Contraseña:", confirmPassword);
            alert("Se registró tu cuenta "+nombre+"!");
        }else{        
            alert("Las contraseñas no coinciden o La dirección de email no es valida!"); 
            alert("No se pudo completar el registro")  
        }

        resetearFormulario();
    }
    document.querySelector(".btn2").addEventListener("click", registrar); 

    function resetearFormulario() {
        // Utilizar el método reset() para restablecer el formulario
        nombreInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = "";
    }   
    document.querySelector(".btn1").addEventListener("click", resetearFormulario);

    


    
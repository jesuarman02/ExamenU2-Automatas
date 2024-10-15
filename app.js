document.addEventListener('DOMContentLoaded', function() {
    let texto = '';
    const sinonimosDiccionario = {
        "Hola": ["Saludos", "Buenos días"],
        "Mundo": ["Planeta", "Tierra"],
        "Casa": ["Hogar", "Vivienda"],
        "Perro": ["Can", "Mascota"],
        "Amigo": ["Compañero", "Camarada"],
        "Familia": ["Parientes", "Hogar"],
        "Trabajo": ["Empleo", "Ocupación"],
        "Coche": ["Auto", "Vehículo"],
        "Libro": ["Texto", "Publicación"],
        "Comida": ["Alimento", "Manjar"]
    };

    document.getElementById('texto').addEventListener('input', function() {
        texto = document.getElementById('texto').value.trim();
    });

    document.getElementById('palabraDiccionario').addEventListener('change', function() {
        const palabraSeleccionada = this.value;
        const sinonimoSelect = document.getElementById('sinonimo');
        const reemplazarBtn = document.getElementById('reemplazarTexto');

        sinonimoSelect.innerHTML = '<option value="">-- Selecciona un sinónimo --</option>';
        sinonimoSelect.disabled = true;
        reemplazarBtn.disabled = true;

        if (palabraSeleccionada) {
            const sinonimos = sinonimosDiccionario[palabraSeleccionada] || [];
            sinonimos.forEach(sinonimo => {
                const option = document.createElement('option');
                option.value = sinonimo;
                option.textContent = sinonimo;
                sinonimoSelect.appendChild(option);
            });
            sinonimoSelect.disabled = false;
            reemplazarBtn.disabled = false;
        }
    });

    document.getElementById('reemplazarTexto').addEventListener('click', function() {
        if (!texto) {
            Swal.fire('Error', 'No hay texto para reemplazar', 'error');
            return;
        }

        const palabra = document.getElementById('palabraDiccionario').value;
        const sinonimo = document.getElementById('sinonimo').value;

        if (!palabra) {
            Swal.fire('Error', 'Selecciona una palabra del diccionario', 'error');
            return;
        }

        const expresion = new RegExp(palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, ''), 'gi');
        const coincidencias = texto.match(expresion);
        const numCoincidencias = coincidencias ? coincidencias.length : 0;

        if (numCoincidencias === 0) {
            Swal.fire('Sin coincidencias', `No se encontró la palabra "${palabra}" en el texto`, 'info');
            return;
        }

        const palabraReemplazo = sinonimo || palabra;
        texto = texto.replace(expresion, palabraReemplazo);
        document.getElementById('texto').value = texto;

        Swal.fire('Reemplazo exitoso', `Se han reemplazado todas las coincidencias de "${palabra}" por "${palabraReemplazo}"`, 'success');
    });

    document.getElementById('limpiarCampos').addEventListener('click', function() {
        document.getElementById('texto').value = '';
        document.getElementById('palabraDiccionario').value = '';
        document.getElementById('sinonimo').value = '';
        document.getElementById('sinonimo').disabled = true;
        document.getElementById('reemplazarTexto').disabled = true;
        texto = '';
        Swal.fire('Campos limpiados', 'Todos los campos han sido limpiados', 'success');
    });
});

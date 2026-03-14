document.addEventListener("DOMContentLoaded", () => {
    const mesAnio = document.getElementById('mesAnio');
    const calendarioGrid = document.getElementById('calendarioGrid');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');

    let fechaActual = new Date();
    
    // Días festivos oficiales 2026 (Puedes actualizar esto cada año)
    const diasFestivos = [
        '2026-01-01', '2026-02-02', '2026-03-16', 
        '2026-05-01', '2026-09-16', '2026-11-16', '2026-12-25'
    ];

    const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    function renderCalendario() {
        calendarioGrid.innerHTML = '';
        
        const mes = fechaActual.getMonth();
        const anio = fechaActual.getFullYear();
        
        mesAnio.textContent = `${nombresMeses[mes]} ${anio}`;

        diasSemana.forEach(dia => {
            const diaDiv = document.createElement('div');
            diaDiv.classList.add('dia-header');
            diaDiv.textContent = dia;
            calendarioGrid.appendChild(diaDiv);
        });

        const primerDia = new Date(anio, mes, 1).getDay();
        const diasEnMes = new Date(anio, mes + 1, 0).getDate();

        for (let i = 0; i < primerDia; i++) {
            const vacioDiv = document.createElement('div');
            vacioDiv.classList.add('dia-celda', 'dia-vacio');
            calendarioGrid.appendChild(vacioDiv);
        }

        for (let i = 1; i <= diasEnMes; i++) {
            const celda = document.createElement('div');
            celda.classList.add('dia-celda');
            celda.textContent = i;

            const mesStr = String(mes + 1).padStart(2, '0');
            const diaStr = String(i).padStart(2, '0');
            const fechaCelda = `${anio}-${mesStr}-${diaStr}`;
            const diaDeLaSemana = new Date(anio, mes, i).getDay();

            if (diasFestivos.includes(fechaCelda)) {
                celda.classList.add('dia-festivo');
            } else if (diaDeLaSemana === 0) {
                celda.classList.add('dia-domingo');
            } else if (diaDeLaSemana === 6) {
                celda.classList.add('dia-sabado');
            } else {
                celda.classList.add('dia-semana');
            }

            calendarioGrid.appendChild(celda);
        }
    }

    btnPrev.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() - 1);
        renderCalendario();
    });

    btnNext.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        renderCalendario();
    });

    renderCalendario();
});
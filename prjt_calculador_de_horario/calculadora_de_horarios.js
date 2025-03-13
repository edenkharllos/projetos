function calcularHorarios() {
    var entrada = document.getElementById("entrada").value;
    var compensado = document.getElementById("compensado").checked;
    var horario8h36 = document.getElementById("horario8h36").checked;
    var horariodom = document.getElementById("horariodom").checked;
    
    if (!entrada) {
        return; // Se o horário de entrada não estiver definido, não fazer nada
    }

    var horaEntrada = new Date("01/01/2024 " + entrada);

    var horaSaida7h20 = new Date("01/01/2024 " + saida);

    var horaAlmocoMin, horaAlmocoMax, horaSaida, horaRetorno;

    if (compensado) {
        // Cálculos para horário compensado
        horaAlmocoMin = new Date(horaEntrada.getTime() + (4 * 60 + 18) * 60000); // 4 horas  e 18 minutos após a entrada
        horaAlmocoMax = new Date(horaEntrada.getTime() + (5 * 60 + 30) * 60000); // 5 horas e 30 minutos após a entrada
        horaSaida = new Date(horaEntrada.getTime() + (9 * 60 + 48) * 60000); // 9 horas e 48 minutos após a entrada
        horaRetorno = new Date(horaSaida.getTime() + (11 * 60 + 60) * 60000) // 11 horas descanso
    } else if (horario8h36) {
        // Cálculos para horário 8h36
        horaAlmocoMin = new Date(horaEntrada.getTime() + (2 * 60 + 38) * 60000); // 4 horas e 18 minutos após a entrada
        horaAlmocoMax = new Date(horaEntrada.getTime() + (5 * 60 + 30) * 60000); // 5 horas e 30 minutos após a entrada
        horaSaida = new Date(horaEntrada.getTime() + (8 * 60 + 36) * 60000); // 9 horas e 48 minutos após a entrada
        horaRetorno = new Date(horaSaida.getTime() + (11 * 60 + 60) * 60000) // 11 horas descanso
    } else if (horariodom) {
        // Cálculos para horário de domingo
        horaAlmocoMin = new Date(horaEntrada.getTime() + (2 * 60 + 60) * 60000); // 4 horas e 18 minutos após a entrada
        horaAlmocoMax = new Date(horaEntrada.getTime() + (5 * 60 + 30) * 60000); // 5 horas e 30 minutos após a entrada
        horaSaida = new Date(horaEntrada.getTime() + (6 * 60 + 15) * 60000); // 9 horas e 48 minutos após a entrada
        horaRetorno = new Date(horaSaida.getTime() + (11 * 60 + 60) * 60000) // 11 horas descanso

        // Ajustes específicos de horários
        if (entrada, saida === "09:48") {
            horaAlmocoMin = new Date(horaEntrada.getTime() + (4 * 60 + 18) * 60000); // 14:06
            horaAlmocoMax = new Date(horaEntrada.getTime() + (5 * 60 + 30) * 60000); // 15:18
            horaSaida = new Date(horaEntrada.getTime() + (9 * 60 + 48) * 60000); // 19:36
            horaSaida7h20 = new Date(horaEntrada.getTime() + (7 * 60 + 48) * 60000);
            horaRetorno = new Date(horaSaida.getTime() + (11 * 60 + 60) * 60000);
        } else if (entrada, saida === "08:20") {
            horaAlmocoMin = new Date(horaEntrada.getTime() + (2 * 60 + 50) * 60000); // 11:10
            horaAlmocoMax = new Date(horaEntrada.getTime() + (5 * 60 + 30) * 60000); // 13:50
            horaSaida = new Date(horaEntrada.getTime() + (8 * 60 + 20) * 60000); // 16:40
            horaSaida7h20 = new Date(horaEntrada.getTime() + (7 * 60 + 20) * 60000); // 16:40
            horaRetorno = new Date(horaSaida.getTime() + (11 * 60 + 60) * 60000) //
        }
    } else {
        // Cálculos para horário não compensado
        horaAlmocoMin = new Date(horaEntrada.getTime() + (2 * 60 + 50) * 60000); // 2 horas e 50 minutos após a entrada
        horaAlmocoMax = new Date(horaEntrada.getTime() + (5 * 60 + 30) * 60000); // 5 horas e 30 minutos após a entrada
        horaSaida = new Date(horaEntrada.getTime() + (8 * 60 + 20) * 60000); // 8 horas e 20 minutos após a entrada
        horaRetorno = new Date(horaSaida.getTime() + (11 * 60 + 60) * 60000) // 11h horas descanso
    }

    document.getElementById("almocoMin").textContent = horaAlmocoMin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("almocoMax").textContent = horaAlmocoMax.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("saida").textContent = horaSaida.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById("retorno").textContent = horaRetorno.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
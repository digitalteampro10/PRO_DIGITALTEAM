document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nextStepButton').addEventListener('click', nextStep);
});

function nextStep() {
    const companyName = document.getElementById('companyNameInput').value;
    const industry = document.getElementById('industryInput').value;
    const phoneNumber = document.getElementById('phoneNumberInput').value;
    const contactDateTime = document.getElementById('contactDateTimeInput').value;

    showOptions(companyName, industry, phoneNumber, contactDateTime);
}

function showOptions(companyName, industry, phoneNumber, contactDateTime) {
    const optionsHTML = `
        <h1>¿Qué servicio necesitas?</h1>
        <div class="btn-group-vertical">
            <button class="btn btn-secondary" data-service="Página Web">Página Web</button>
            <button class="btn btn-secondary" data-service="Tienda Virtual">Tienda Virtual</button>
            <button class="btn btn-secondary" data-service="Publicidad en Redes Sociales">Publicidad en Redes Sociales</button>
            <button class="btn btn-secondary" data-service="Sistema a Medida">Sistema a Medida</button>
        </div>
    `;
    document.querySelector('.jumbotron').innerHTML = optionsHTML;

    // Asignar manejadores de eventos a los botones de servicio
    const serviceButtons = document.querySelectorAll('.btn-group-vertical button');
    serviceButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const service = button.dataset.service;
            selectService(companyName, industry, phoneNumber, contactDateTime, service);
        });
    });
}

function selectService(companyName, industry, phoneNumber, contactDateTime, service) {
    console.log("Servicio seleccionado:", service);

    // Enviar correo electrónico
    sendEmail(companyName, industry, phoneNumber, contactDateTime, service);

    // Mostrar mensaje de confirmación al usuario
    const confirmationHTML = `
        <h1>¡Perfecto!</h1>
        <p>Has seleccionado ${service} para tu empresa "${companyName}".</p>
        <p>Nuestro equipo se pondrá en contacto contigo pronto para discutir los detalles.</p>
    `;
    document.querySelector('.jumbotron').innerHTML = confirmationHTML;
}

function sendEmail(companyName, industry, phoneNumber, contactDateTime, service) {
    const subject = 'Nueva Solicitud de Reunión de Ventas';
    const body = 'Se ha recibido una nueva solicitud de reunión de ventas:\n\n' +
                 'Nombre de la empresa: ' + companyName + '\n' +
                 'Rubro de la empresa: ' + industry + '\n' +
                 'Número telefónico: ' + phoneNumber + '\n' +
                 'Fecha y hora de contacto: ' + contactDateTime + '\n' +
                 'Servicio seleccionado: ' + service;

    // Construir el correo electrónico usando la API de mailto
    const mailtoLink = 'mailto:digitalteampro10@gmail.com' +
                       '?subject=' + encodeURIComponent(subject) +
                       '&body=' + encodeURIComponent(body);

    // Abrir el cliente de correo predeterminado del usuario con el correo electrónico prellenado
    window.location.href = mailtoLink;
}

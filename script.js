document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("nextStepButton").addEventListener("click", nextStep);
});
function nextStep() {
  const companyName = document.getElementById("companyNameInput").value;
  const industry = document.getElementById("industryInput").value;
  const phoneNumber = document.getElementById("phoneNumberInput").value;
  const contactDateTime = document.getElementById("contactDateTimeInput").value;
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
  document.querySelector(".jumbotron").innerHTML = optionsHTML;
  // Asignar manejadores de eventos a los botones de servicio
  const serviceButtons = document.querySelectorAll(
    ".btn-group-vertical button"
  );
  serviceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const service = button.dataset.service;
      selectService(
        companyName,
        industry,
        phoneNumber,
        contactDateTime,
        service
      );
    });
  });
}
function selectService(
  companyName,
  industry,
  phoneNumber,
  contactDateTime,
  service
) {
  console.log("Servicio seleccionado:", service);
  // Enviar correo electrónico
  sendEmail(companyName, industry, phoneNumber, contactDateTime, service);
  // Mostrar mensaje de confirmación al usuario
  const confirmationHTML = `
    <style>
        .confirmation-container {
            background-color: #ffffff;
            color: #474e54;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .company-name {
            color: #dd5162;
            font-weight: bold;
        }
        .message {
            margin-top: 20px;
        }
    </style>
    <div class="confirmation-container">
        <h1>¡Confirmación de Servicio!</h1>
        <p>Estimado Cliente,</p>
        <p>Hemos recibido su solicitud de servicio para su empresa "<span class="company-name">${companyName}</span>".</p>
        <p>Nos complace informarle que el servicio <span class="company-name">${service}</span> ha sido seleccionado con éxito.</p>
        <p class="message">Nuestro equipo se pondrá en contacto con usted pronto para discutir los detalles.</p>
        <p>Atentamente,</p>
        <p>Su Equipo de Servicio</p>
    </div>
`;
  document.querySelector(".jumbotron").innerHTML = confirmationHTML;
}
function sendEmail(
  companyName,
  industry,
  phoneNumber,
  contactDateTime,
  service
) {
  const subject = "Nueva Solicitud de Reunión de Ventas";
  const body =
    "Se ha recibido una nueva solicitud de reunión de ventas:\n\n" +
    "Nombre de la empresa: " +
    companyName +
    "\n" +
    "Rubro de la empresa: " +
    industry +
    "\n" +
    "Número telefónico: " +
    phoneNumber +
    "\n" +
    "Fecha y hora de contacto: " +
    contactDateTime +
    "\n" +
    "Servicio seleccionado: " +
    service;
  // Construir el correo electrónico usando la API de mailto
  const mailtoLink =
    "mailto:digitalteampro10@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
  // Abrir el cliente de correo predeterminado del usuario con el correo electrónico prellenado
  window.location.href = mailtoLink;
}

  const hideView = require("./hideView.js")
  
  //Switch Views
  const toggleView = (idBoton, viewContainer) => {
    idBoton.addEventListener('click', () => {

    hideView(resumeView);
    hideView(techStackView);
    hideView(contactView);
  
    // Mostrar la vista correspondiente
    viewContainer.style.display = 'block';  
  });
}

module.exports = toggleView;
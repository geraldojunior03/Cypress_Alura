Cypress.Commands.add('login', (nome, senha) => {
  cy.get('input[formcontrolname="userName"]').type(nome);
  cy.get('input[formcontrolname="password"]').type(senha, {log: false});
  cy.get('button[type="submit"]').click();
})

Cypress.Commands.add('register', (email, nome, usuario, senha) => {
  cy.contains('a', 'Register now').click();
  cy.get('input[formcontrolname="email"]').type(email);
  cy.get('input[formcontrolname="fullName"]').type(nome);
  cy.get('input[formcontrolname="userName"]').type(usuario);
  cy.get('input[formcontrolname="password"]').type(senha);
  cy.contains('button', 'Register').click();
  cy.wait(1000)
  cy.contains('button', 'Register').click();
})
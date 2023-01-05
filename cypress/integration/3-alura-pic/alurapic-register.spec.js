describe('Registro de conta Alura PIC', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('POST', 'https://apialurapic.herokuapp.com/user/login', {
      statusCode: 400
    }).as('stubPost')
  })

  it('Verificar mensagens de validação', () => {
    // ENTRANDO NA ÁREA DE REGISTRO
    cy.contains('a', 'Register now').click();
    // CLICANDO EM REGISTRO
    cy.contains('button', 'Register').click();
    // VALIDANDO ERRO DE EMAIL
    cy.contains('ap-vmessage', 'Email is required').should('be.visible');
    // CLICANDO EM REGISTRO NOVAMENTE PARA APARECER OUTRAS MENSAGENS
    cy.contains('button', 'Register').click();
    // VALIDANDO TODAS MENSAGENS
    cy.contains('ap-vmessage', 'Full name is required').should('be.visible');
    cy.contains('ap-vmessage', 'User name is required').should('be.visible');
    cy.contains('ap-vmessage', 'Password is required').should('be.visible');
  });

  it('Verificar mensagem de erro do e-mail inválido', () => {
    // ENTRANDO NA ÁREA DE REGISTRO
    cy.contains('a', 'Register now').click();
    // INSERINDO UM EMAIL INVALIDO
    cy.get('input[formcontrolname="email"]').type('gjunior');
    // CLICANDO EM REGISTRO
    cy.contains('button', 'Register').click();
    // VALIDANDO ERRO DE EMAIL INVÁLIDO
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
  });

  it('Verificar mensagem de erro do nome inválido', () => {
     // ENTRANDO NA ÁREA DE REGISTRO
     cy.contains('a', 'Register now').click();
     // INSERINDO UM EMAIL INVALIDO
     cy.get('input[formcontrolname="email"]').type('gjunior@svlabs.com.br');
     // INSERINDO NOME INVÁLIDO
     cy.get('input[formcontrolname="fullName"]').type('A');
     // CLICANDO EM REGISTRO
     cy.contains('button', 'Register').click();
     // VALIDANDO ERRO DE NOME
     cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');     
  });

  it('Verificar mensagem de erro do username inválido', () => {
    // ENTRANDO NA ÁREA DE REGISTRO
    cy.contains('a', 'Register now').click();
    // INSERINDO UM EMAIL INVALIDO
    cy.get('input[formcontrolname="email"]').type('gjunior@svlabs.com.br');
    // INSERINDO NOME INVÁLIDO
    cy.get('input[formcontrolname="fullName"]').type('Geraldo');
    // INSERINDO USERNAME INVÁLIDO
    cy.get('input[formcontrolname="userName"]').type('A');
    // CLICANDO EM REGISTRO
    cy.contains('button', 'Register').click();
    // VALIDANDO ERRO DE NOME
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible');     
    cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');     
  });

  it('Verificar mensagem de erro da senha inválida', () => {
    // ENTRANDO NA ÁREA DE REGISTRO
    cy.contains('a', 'Register now').click();
    // INSERINDO UM EMAIL INVALIDO
    cy.get('input[formcontrolname="email"]').type('gjunior@svlabs.com.br');
    // INSERINDO NOME INVÁLIDO
    cy.get('input[formcontrolname="fullName"]').type('Geraldo');
    // INSERINDO USERNAME INVÁLIDO
    cy.get('input[formcontrolname="userName"]').type('gjunior');
    // INSERINDO UMA SENHA ÍNVALIDA
    cy.get('input[formcontrolname="password"]').type('1234567');
    // CLICANDO EM REGISTRO
    cy.contains('button', 'Register').click();
    // VALIDANDO ERRO SENHA
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');     
  });

  it('Verificar mensagem de erro de usuário existente', () => {
    // ENTRANDO NA ÁREA DE REGISTRO
    cy.contains('a', 'Register now').click();
    // INSERINDO UM EMAIL INVALIDO
    cy.get('input[formcontrolname="email"]').type('gjunior@svlabs.com.br');
    // INSERINDO NOME INVÁLIDO
    cy.get('input[formcontrolname="fullName"]').type('Geraldo');
    // INSERINDO USERNAME INVÁLIDO
    cy.get('input[formcontrolname="userName"]').type('flavio');
    // INSERINDO UMA SENHA ÍNVALIDA
    cy.get('input[formcontrolname="password"]').type('1234567');
    // CLICANDO EM REGISTRO
    cy.contains('button', 'Register').click();
    // VALIDANDO ERRO USUÁRIO
    cy.contains('ap-vmessage', 'Username already taken').should('be.visible');     
  });

  it.only('Login com comando personalizado', () => {
    cy.login(Cypress.env('userName'), Cypress.env('password'));
    cy.wait('@stubPost')
  })

  it('Login com usuário inválido', () => {
    cy.login('gjunior', '123');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Invalid user name or password')
    })
  })

  const usuarios = require('../../fixtures/usuarios.json')
  usuarios.forEach(usuario => {
    it(`Registrar novo usuário ${usuario.userName}`, () => {
      cy.register(usuario.email, usuario.fullname, usuario.userName, usuario.password)
      cy.contains('h4.text-center', 'Login')
    })
  })
})
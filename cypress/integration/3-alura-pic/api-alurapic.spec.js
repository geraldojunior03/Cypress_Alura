describe('Buscar dados por API', () => {
  
  // BUSCAR FOTOS LOGADO
  
  it.only('Buscar fotos do Flávio', () => {
    cy.request({
      url: "https://apialurapic.herokuapp.com/flavio/photos",
      method: "GET"
    }).then((resp) => {
      expect(resp.status).to.be.equal(200)
      expect(resp.body).is.not.empty
      expect(resp.body[0]).to.have.property('description')
      expect(resp.body[0].description).to.be.equal('Farol iluminado')
    })
  })

  // FAZER LOGIN

  it('Fazer login do flávio', () => {
    cy.request({
      url: "https://apialurapic.herokuapp.com/user/login",
      method: "POST",
      body: Cypress.env()
    })
    .then((resp) => {
      expect(resp.status).to.be.equal(200)
      expect(resp.body).is.not.empty
      expect(resp.body).to.have.property('id')
      expect(resp.body.id).to.be.equal(1)
    })
  })
})
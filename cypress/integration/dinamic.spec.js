/// <reference types="cypress" />






describe('Dinamic tests', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    
    it('Cadastro com comida variada', () => {

        cy.get('#formNome').type(this.usuario.nome)
        cy.get('#formSobrenome').type(this.usuario.sobrenome)        
        cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
        cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}`).click()
        cy.get('#formEscolaridade').select(this.usuario.escolaridade)
        cy.get('#formEsportes').select(this.usuario.esportes)
        
    })
})
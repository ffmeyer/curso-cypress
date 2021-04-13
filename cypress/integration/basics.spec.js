/// <reference types="cypress" />


describe('Cypress basic', () => {
    it.skip('Should visit page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        //cy.title().should('be.equal', 'Campo de Treinamento')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Treinamento')
            .and('contain', 'Campo')
    })

    it('Should interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

})
/// <reference types="cypress" />


describe('Cypress basic', () => {
    it('Should visit page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        //cy.title().should('be.equal', 'Campo de Treinamento')
        
        //cy.pause() interrompe o fluxo do teste e permite o usuario navegar passo a passo no script (next)
        //cy.debug() ve os dados do objeto procurado no console

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Treinamento')
            .and('contain', 'Campo')

        /*imprime no console do js*/
        cy.title().then(title => {
            console.log(title)
        })

    })

    it('Should interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

})
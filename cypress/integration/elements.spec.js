/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('Body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    
    })

    it('Links', () => {        
        //cy.get('a').click() //atualmente o campo de treinamento tem 2 links <a> entao essa abordagem nao funciona mais.
        cy.contains('Voltar').click() //ver se tem outro modo de fazer a mesma coisa ex.: buscar o metodo javascript do link
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        })       
})
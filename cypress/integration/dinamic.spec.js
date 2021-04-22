/// <reference types="cypress" />

describe('Dinamic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })  

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach(food => {

        it(`'Cadastro com comida ${food}'`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualqyer')        
            cy.get(`[name=formSexo][value='F']`).click()
            cy.xpath(`//label[contains(.,'${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!') 
        })
    })


})
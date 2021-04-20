/// <reference types="cypress" />


describe('Work with popups', () => {
    
    it('Deve Testar o popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')                
        }) 

    })

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')            
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen')
    })
})

describe('With links', () => {
    
    beforeEach (() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    /*verificou que a url destino eh a correta*/ 
    it('Check popup URL', () => {
        cy.contains('Popup2')
        /*should('have.prop','algo') <-retorna a propriedade buscada, nao sao todos os shoulds que retornam valor.*/
        .should('have.prop', 'href')
            .and('equal', 'https://wcaquino.me/cypress/frame.html')
    })
    /*verificou o link utilizando o target do link*/ 
    it('Should access popup dinamically', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('funciona')
        })           
    })
    /*removeu o atributo target, forcando que o popup abra no contexto principal*/ 
    it('Should force link on same page', () => {
        cy.contains('Popup2')
                .invoke('removeAttr','target')
                .click()      
        cy.get('#tfield').type('funciona')
    })           
})

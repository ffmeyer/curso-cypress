/// <reference types="cypress" />

describe('Work with date time', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })    

    it('Going back to the past', () => {   

        /*cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '22/04/2021')
        
        cy.clock()
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '31/12/1969')*/
        
        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Goes to the future', () => {        
        cy.get('#buttonTimePassed').click()
        /*valor da data em milisegundos na ocasiao do teste*/ 
        cy.get('#resultado > span').invoke('text').should("gt", '1334082230000')

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should("lte", '0')    

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should("gte", '5000')

        cy.tick(10000)
        cy.get('#resultado > span').invoke('text').should("gte", '15000')

    })

})


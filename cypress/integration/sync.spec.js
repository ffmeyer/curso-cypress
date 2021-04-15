/// <reference types="cypress" />

describe('Esperas', () => {

    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')

    })

    it('Deve fazer retries', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist') /*<-  pelo encadeamento das chamadas, o cypress retorna null 
                                                        (cy.get() retorna null, pq o objeto nao existe)*/
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')

    })

    it('Uso do find sem DOM', () => {
        cy.get('#buttonList').click()
        //funciona pq ele vai esperar exibir o item 1
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        /* nao funciona pq ele entende que o objeto #list li, ja foi encontrado e nesse momento nao tem item 2
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 2')*/

        cy.get('#lista li span') // <- cypress busca "outro" locator e seu Item 2 existente          
            .should('contain', 'Item 2')
            .should('contain', 'Item 1') 
            /*poderia ser feito desse jeito tb, 
            mas o importante eh que tem q esperar o sistema precisa esperar o item 2 aparecer*/
    })
    
    it('Uso do find com DOM', () => {
        cy.get('#buttonListDOM').click()
        //funciona pq ele vai esperar exibir o item 1
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span') // <- cypress busca "outro" locator e seu Item 2 existente          
            .should('contain', 'Item 2')
            .should('contain', 'Item 1') 
            /*poderia ser feito desse jeito tb, 
            mas o importante eh que tem q esperar o sistema precisa esperar o item 2 aparecer*/
    })

    it('Uso do find com DOM', () => {
        cy.get('#buttonListDOM').click()
        //funciona pq ele vai esperar exibir o item 1
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span') // <- cypress busca "outro" locator e seu Item 2 existente          
            .should('contain', 'Item 2')
            .should('contain', 'Item 1') 
            /*poderia ser feito desse jeito tb, 
            mas o importante eh que tem q esperar o sistema precisa esperar o item 2 aparecer*/
    })

    it('Uso do timeout', () => {
        //cy.get('#buttonDelay').click()
        //cy.get('#novoCampo', '{ timeout:1000 }').should('exist')  timeout local para o metodo
      

        cy.get('#buttonListDOM').click()
        //cy.wait(5000) possivel, mas indesejado
        cy.get('#lista li span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })


    it.only('Click retry', () => {        
        cy.get('#buttonCount')
            .click()
            .click()
            .click()
            .should('have.value', '111')
    })



})

/// <reference types="cypress" />


describe('Cypress basic', () => {
    it.only('Should visit page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        //cy.title().should('be.equal', 'Campo de Treinamento')
        
        //cy.pause() interrompe o fluxo do teste e permite o usuario navegar passo a passo no script (next)
        //cy.debug() ve os dados do objeto procurado no console

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Treinamento')
            .and('contain', 'Campo')

        /*para ser usado posteriormente*/
        let syncTitle 

        /*imprime no console do js*/
        cy.title().then(title => {  //<-momento onde eu preencho title (variavel) (TITLE => { "
            console.log(title)
            
        /*peguei o valor contido em title*/
        syncTitle = title
        //via cypress
        cy.get('#formNome').type(title)

    })
        /*via jquery
        nao gerenciado pelo cypress, logo nao aparece no teste 
        */
       cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })
        //empacotando o elemento jquery usando wrap para manter rastreabilidade no teste
        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })

    })

    it('Should interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })

})
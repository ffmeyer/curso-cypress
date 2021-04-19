/// <reference types="cypress" />


describe('Work with alerts', () => {

    it('Deve Preecher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            //pega conteudo do iframe
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('Funciona?')
                .should('have.value', 'Funciona?')
        })

    })
    /*cypress nao consegue validar alertas dentro de 1 iframe, solucao
        testar o iframe diretamente*/
    it('Deve Testar o frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')                
        }) 

    })

})

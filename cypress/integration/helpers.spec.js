/// <reference types="cypress" />


describe('Helpers...', () => {

    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('to.have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')

        /*
        cy.get('#formNome').then($el => {
            // funciona via jquery, mas desse jeito nao aparece na execucao do cypress
            //$el.val('funciona via jquery')
            //peguei um objeto da tela, e empacotei para ser usado no cypress
            cy.wrap($el).type('funciona via cypress')
        })*/



        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve (10)
            }, 500)
        }) 

        cy.get('#buttonSimple').then(() => console.log ('encontrei o primeiro botao'))
        //promise nao gerenciada pelo cypress, nao funciona corretamente, devemos wrapear a promise para usar
        promise.then(num => console.log('promise nao gerenciada pelo cypress ' + num))
        cy.wrap(promise).then(ret => console.log('gerenciada (wrapeada) pelo cypress ' + ret))
        cy.get('#buttonList').then(() => console.log ('encontrei o segundo botao'))

        /*then usa o valor de return setado pelo usuario*/ 
        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal',2)

        /*should ignora o retorno da funcao */ 
        cy.wrap(1).should(num => {
            return 2
        }).should('be.equal',1)

    })  

})
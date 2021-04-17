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

    it('Its..', () => {
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')
        
        const obj2 = { nome: 'User', idade: 20, endereco: {rua: 'dos bobos'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })
    
    it.only('Invoke', () => {
        const getValue = () => 1;
        const soma = (a, b) => a+b;
        /*por ser uma funcao normal em js, eh necessario o wrap para ser utilizada no cypress
            fn eh alias para getvalue. 
            a invocacao da mensagem ocorre realmente em invoke('fn')*/
        cy.wrap({fn: getValue}).invoke('fn').should('be.equal',1)
        cy.wrap({fn: soma}).invoke( 'fn', 2, 5 ).should('be.equal',7)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        /*usando metodo invoke para buscar objetos na pagina via jquery*/
        cy.get('#formNome').invoke('val', 'texto via invoke')
        cy.window().invoke('alert', 'da pra ver? ')
        cy.get('#resultado')
            .invoke('html', '<input type="button" value ="HACKED!">')

    })



})

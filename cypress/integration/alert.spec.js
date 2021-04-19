/// <reference types="cypress" />


describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    }) 

    it('Alert', () => {
        cy.get('#alert').click()
        /*
         cy.on pega eventos que ocorrem na tela, nesse caso buscando window:alert
         quando ocorrer um alert, chame essa msg
        */ 
        cy.on('window:alert', msg => {
            console.log(msg)            
            expect(msg).to.be.equal('Alert Simples')
            
        })        

    })

    it('Alert com mock e stub', () => {
        //nomeando uma operacao stub
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') 
        })

    })

    it('Confirm', () => {
        /*
        cy.on pega eventos que ocorrem na tela, nesse caso buscando window:alert
        quando ocorrer um alert, chame essa msg
        */ 
       cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')           
        })        
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')            
         })
        cy.get('#confirm').click()

    })

    it('Deny', () => {
       cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')           
            return false // return false = cancelar / negar mensagem no alert
        })        
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')            
         })
        cy.get('#confirm').click()

    })

    it('Prompt', () => {
        /*pega o objeto que gerencia toda pagina
        cy.window    
        */
        cy.window().then(win => {
        /*sobreescrevendo o comportamento do prompt, que esta na window
        "returns('42')"
        */
            cy.stub(win, 'prompt')
            .as('prompt')
            .returns('42')
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
        })        
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')            
         })
        cy.get('#prompt').click()

        })

    it('validando mensagens', () => {
        const stub = cy.stub().as('alerta')        

        /*o valor apontado em getCall, eh numerado pela qtd de vezes que o stub foi invocado */
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        
        cy.get('#formNome').type('Wagner')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Aquino')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

            cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

    })



})
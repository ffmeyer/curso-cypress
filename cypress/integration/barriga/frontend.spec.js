/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsConta'
import buildEnv from '../../support/buildEnv'

describe('Should be tested at funcional level', () => {

    after(() => {
        /*para resolver problemas relacionados com local storage (token valido na sessao, causando 
            exibicao da tela inicial, sem passar pela rota de login*/
        
        cy.clearLocalStorage()
    })

    before(() => {      
        //cy.login('ketifo1196@quossum.com','12345')
    })  

    beforeEach(() => {
        buildEnv()
        cy.login('whatever@quossum.com','senha errada')
        cy.get(loc.MENU.HOME).click()
        //cy.resetApp()  
    })

    it('Should create an account', () => {
        cy.route ({
            method: 'POST', 
            url: '/contas',
            response: [
                {id: '3', nome: 'Conta de teste', visivel: true,  usuario_id: 1 }              
            ]
        }).as('saveConta')

        cy.acessarMenuConta()
        
        cy.route ({
            method: 'GET', 
            url: '/contas',
            response: [                
                {conta_id: 1, conta: 'Carteira', visivel: true,  usuario_id: 1 }, 
                {conta_id: 2, conta: 'Banco', visivel: true,  usuario_id: 1 }
            ]
        }).as('contas')

        cy.inserirConta('Conta de Teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')        
    })

    it('Should update an account', () => {
        cy.route ({
            method: 'PUT', 
            url: '/contas/**',
            response: [
                { id: '1', nome: 'Conta Alterada', visivel: true,  usuario_id: 1 }               
            ]
        }).as('contas')

        cy.acessarMenuConta()
        //cy.pause()
        /*console.log(loc.FN_XP_BTN_ALTERAR) */
        cy.xpath(loc.CONTA.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTA.NOME)
            .clear()
            .type('Conta Alterada')
            cy.get(loc.CONTA.BTN_SALVAR).click()
            cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')        
    })
    
    it('Should not create an account with same name', () => {
        cy.route ({
            method: 'POST', 
            url: '/contas',
            response: 
                { error: 'Já existe uma conta com este nome!'},
                status: '400'             
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()
        
        cy.get(loc.CONTA.NOME).type('Conta mesmo nome')        
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')        
    })

    it('Should create a transaction', () => {
        cy.route ({
            method: 'POST', 
            url: '/transacoes',
            response: [
                {
                    "id": 519004,
                    "descricao": "a",
                    "envolvido": "a",
                    "observacao": null,
                    "tipo": "REC",
                    "data_transacao": "2021-04-29T03:00:00.000Z",
                    "data_pagamento": "2021-04-29T03:00:00.000Z",
                    "valor": "1.00",
                    "status": false,
                    "conta_id": 560954,
                    "usuario_id": 20839,
                    "transferencia_id": null,
                    "parcelamento_id": null
                }                
            ]
        }).as('contas')

        cy.route ({
            method: 'GET', 
            url: '/extrato/**',            
            response: [
                
                {"conta":"Conta para movimentacoes","id":519005,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":561763,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":519006,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":561764,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":519007,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":561765,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":519008,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":561765,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":519009,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":561765,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":519010,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":561766,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para extrato","id":519011,"descricao":"Desc","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-04-29T03:00:00.000Z","data_pagamento":"2021-04-29T03:00:00.000Z","valor":"123.00","status":true,"conta_id":561766,"usuario_id":20839,"transferencia_id":null,"parcelamento_id":null}
            ]

        })

        cy.acessarMenuConta()        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123.00') 
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')        

        cy.get('.animated > .toast-message').should('not.exist')
        cy.get(loc.EXTRATO.LINHAS).should('have.length',7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc','123')).should('exist')

    })

    it('Should get balance', () => {
        //cy.pause()
        cy.get(loc.MENU.HOME).click()        
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', 534.00)
        
        cy.get(loc.MENU.EXTRATO).click()  
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        /*forçando sincronismo entra tela de movimentacao e tela de descricao da movimentacao*/
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')

        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso')

        cy.get(loc.MENU.HOME).click() 
        console.log(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo'))
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Should remove transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()        
        cy.xpath(loc.EXTRATO.FN_XP_REMOVE_ELEMENTO('Movimentacao para exclusao')).click()
    })
})

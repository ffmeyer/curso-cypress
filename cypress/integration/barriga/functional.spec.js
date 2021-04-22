/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsConta'


describe('Should be tested at funcional level', () => {
    before(() => {
        cy.login('ketifo1196@quossum.com','12345')
        cy.resetApp()
        //cy.visit('https://barrigareact.wcaquino.me')
        //cy.get(loc.LOGIN.USER).type('ketifo1196@quossum.com')
        //cy.get(loc.LOGIN.PASSWORD).type('12345')
        //cy.get(loc.LOGIN.BTN_LOGIN).click()
        //cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de Teste')
        //cy.get(loc.MENU.SETTINGS).click()   
        //cy.get(loc.MENU.CONTAS).click()        
        //cy.get(loc.CONTAS.NOME).type('Conta de Teste')
        //cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')        
    })

    it('Should update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta Alterada')
            cy.get(loc.CONTAS.BTN_SALVAR).click()
            cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')        
    })
    
    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()
        
        cy.get(loc.CONTAS.NOME).type('Conta Alterada')        
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')        
    })

    it('Should create a transaction', () => {
        cy.acessarMenuConta()
        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')        
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')        
    })

})
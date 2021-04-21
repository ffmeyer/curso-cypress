/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr td:nth-child(3) > input')
        cy.get('[onclick*=\'Francisco\']') //usando caracter da escape
        cy.get("[onclick*='Francisco']")   //forcando uso de aspas duplas externamente, usando as simples no meio da expressao
        cy.get('table#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input')
        cy.get('table#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6) > input')
    })

    it('Xpath selector', () => {
        cy.xpath("//input[contains(@onclick,'Francisco')]")
        /*o francisco nao esta em nenhuma propriedade "(.,'Francisco')" "." <- qualquer elemento*/
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]/following-sibling::td/input")
        /*deve ter sofrido alteracao, nao funciona*/
        //cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]/../input[@type='text']") 
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(.,'Francisco')]/../td[6]/input[@type='text']")
        //tambem nao funciona
        cy.xpath("//td[contains(.,Usuario A)]/following-sibling::td[contains(.,'Mestrado')]/..//input[@type='text']").type('funciona')

    })

})
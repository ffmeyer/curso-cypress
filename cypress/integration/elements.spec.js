/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        
        cy.get('Body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    
    })

    it('Links', () => {        
        //cy.get('a').click() //atualmente o campo de treinamento tem 2 links <a> entao essa abordagem nao funciona mais.
        cy.contains('Voltar').click() //ver se tem outro modo de fazer a mesma coisa ex.: buscar o metodo javascript do link
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        })

        
    it('TextFields', () => {    
        cy.get('#formNome')
            .type('Cypress Test')
            //.should('have.text', 'Cypress Test')  input usa value ao no lugar de 'have.text'
            .should('have.value', 'Cypress Test')
            
        cy.get('#elementosForm\\:sugestoes')
            .type('textArea')
            //.should('have.text', 'Cypress Test')  input usa value ao no lugar de 'have.text'
            .should('have.value', 'textArea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')
            //.should('have.text', 'Cypress Test')  input usa value ao no lugar de 'have.text'
            .should('have.value', '???')

            //backspace no formulario
        cy.get('[data-cy=dataSobrenome]')
            .type('teste12345{backspace}{backspace}')
            .should('have.value', 'teste123')
            
            //selecionar tudo no formulario e substituir por acerto 
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('erro{selectall}acerto')
            .should('have.value', 'acerto')

        //selecionar tudo no formulario e substituir por acerto com delay 100ms
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('erro{selectall}acerto', { delay:100 })
            .should('have.value', 'acerto')
    })

    it.only('RadioButton', () => {

        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get("[name='formSexo']")
        //cy.get('[name=formSexo]') -> soh precisa de aspas se o name tivesse espaco ex. "formSexo condicao1"
            .should('have.length', 2)

    })

})
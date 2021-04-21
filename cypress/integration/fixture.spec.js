/// <reference types="cypress" />

describe('Fixtures Tests', () => {

    it('get data from fixture file', function (){
            cy.visit('https://wcaquino.me/cypress/componentes.html')

            cy.fixture('userData').as('usuario').then(function() {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            //javascript interpolation
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
        })  
        /*devido ao fato que todas as funcoes do it estao usando funcoes do cypress, por isso ele sincroniza 
        os dados entao tanto faz deixar o submit / validation dentro ou fora IT
        */
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

    })
})

const locators = {
    LOGIN:{
        USER: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU:{
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: "[href='/contas']",
        RESET: "[href='/reset']",
        MOVIMENTACAO: "[data-test=menu-movimentacao]",
        EXTRATO: "[data-test=menu-extrato]"
    },

    CONTA:{                
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: conta => `//table//td[contains(., '${conta}')]/..//i[@class='far fa-edit']`
    },

    MOVIMENTACAO:{
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        STATUS: '[data-test=status]',
        INTERESSADO: '[data-test=envolvido]', 
        CONTA: '[data-test=conta]',
        BTN_SALVAR: '.btn-primary'        
    },

    EXTRATO:{
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(.,${value})]`,
        FN_XP_REMOVE_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`
    },
    
    SALDO:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    },

    MESSAGE: '.toast-message', 
}
export default locators;
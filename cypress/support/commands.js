// -- This is a parent command --

//fucntion
Cypress.Commands.add('inputLogin', (username, password) => { 
    if (username == null) {
        cy.get('#txt-username').should('be.visible').clear()
    } else {
        cy.get('#txt-username').should('be.visible').clear().type(username)
    }

    if (password == null) {
        cy.get('#txt-password').should('be.visible').clear()
    } else {
        cy.get('#txt-password').should('be.visible').clear().type(password)
    }
    
    cy.get('#btn-login')
    .should('be.visible')
    .click()
})

//action
Cypress.Commands.add('klik', (locator) => { 
    cy.get(locator)
    .should('be.visible')
    .click()
})


//verify
Cypress.Commands.add('verifyContains', (wording) => { 
    cy.contains(wording)
    .should('be.visible')
})

Cypress.Commands.add('verifyContainsByLocator', (locator, wording) => { 
    cy.get(locator)
    .should('be.visible')
    .should('have.text', wording)
})

Cypress.Commands.add('verifyUrlContains', (url) => { 
    cy.url()
    .should('include', url)
})

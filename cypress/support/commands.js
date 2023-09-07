// -- This is a parent command --

//action
Cypress.Commands.add('klik', (locator) => { 
    cy.get(locator)
    .should('be.visible')
    .click()
})
Cypress.Commands.add('centang', (locator, data) => { 
    if (data == true) {
        cy.get(locator)
        .should('be.visible')
        .check()
    } else {
        cy.get(locator)
        .should('be.visible')
        .uncheck()
    } 
})
Cypress.Commands.add('typeFiled', (locator, data) => { 
    if (data == null) {
        cy.get(locator)
        .should('be.visible')
        .focus()
        .clear()
    } else {
        cy.get(locator)
        .should('be.visible')
        .focus()
        .clear()
        .type(data)
    } 
})

Cypress.Commands.add('goToPage', (menu) => {
    cy.get('#menu-toggle').click()
    cy.contains(menu).click()
})

Cypress.Commands.add('selectDropdownByValue', (locator, data) => {
    cy.get(locator)
    .should('be.visible')
    .select(data)
})

Cypress.Commands.add('selectRadioByValue', (locator, data) => {
    cy.get(locator)
    .check(data)
})

//verify
Cypress.Commands.add('verifyContains', (wording) => { 
    cy.contains(wording)
    .should('be.visible')
})

Cypress.Commands.add('verifyContainsNotVisible', (wording) => { 
    cy.contains(wording)
    .should('not.exist')
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

Cypress.Commands.add('verifyUrlNotContains', (url) => { 
    cy.url()
    .should('not.contain', url)
})

//fucntion
Cypress.Commands.add('inputLogin', (username, password) => {
    cy.typeFiled('#txt-username',username)
    cy.typeFiled('#txt-password',password)  
    cy.get('#btn-login')
    .should('be.visible')
    .click()
})

Cypress.Commands.add('inputAppoiment', (data) => {
    cy.selectDropdownByValue('#combo_facility', data.facility)
    cy.centang('#chk_hospotal_readmission', data.apply)
    cy.selectRadioByValue('[type="radio"]', data.healthcareProgram)
    cy.typeFiled('#txt_visit_date',data.visitDate)
    cy.typeFiled('#txt_comment',data.comment)
    cy.klik('#btn-book-appointment')
    cy.verifyUrlContains('/appointment.php#summary')
    cy.verifyContains('Appointment Confirmation')
    cy.verifyContainsByLocator('#facility',data.facility)
    if (data.apply == true) {
        cy.verifyContainsByLocator('#hospital_readmission','Yes')
    } else {
        cy.verifyContainsByLocator('#hospital_readmission','No')
    }
    cy.verifyContainsByLocator('#program',data.healthcareProgram)
    cy.verifyContainsByLocator('#visit_date',data.visitDate)
    cy.verifyContainsByLocator('#comment',data.comment)
})

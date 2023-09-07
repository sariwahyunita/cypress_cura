const users = require('../fixtures/users.json')
const appoiments = require('../fixtures/appointment.json')

describe('page appoinment', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('prod'))
    cy.verifyContains('CURA Healthcare Service')
    cy.get("#btn-make-appointment").should('be.visible').should('have.text', 'Make Appointment')
    cy.klik('#menu-toggle')
    cy.verifyContains("Login").click()
    cy.verifyUrlContains('/profile.php#login')
    cy.inputLogin(users[0].username, users[0].password)
    cy.verifyUrlContains('/#appointment')
  })

  it.only('user success make appoiment', () => {
    for(let appoiment = 0; appoiment <= 2; appoiment++){
      cy.get('#combo_facility').should('be.visible').select(appoiments[appoiment].facility).should('have.value', appoiments[appoiment].facility)
      if (appoiments[appoiment].apply == true) {
        cy.get('#chk_hospotal_readmission').should('be.visible').check()
      } else {
        cy.get('#chk_hospotal_readmission').should('be.visible').uncheck()
      }
      cy.get('[type="radio"]').check(appoiments[appoiment].healthcareProgram)
      cy.get('#txt_visit_date').should('be.visible').clear().type(appoiments[appoiment].visitDate)
      cy.get('#txt_comment').should('be.visible').focus().type(appoiments[appoiment].comment)
      cy.get('#btn-book-appointment').should('be.visible').click()
      cy.verifyUrlContains('/appointment.php#summary')
      cy.verifyContains('Appointment Confirmation')
      cy.verifyContainsByLocator('#facility',appoiments[appoiment].facility)
      if (appoiments[appoiment].apply == true) {
        cy.verifyContainsByLocator('#hospital_readmission','Yes')
      } else {
        cy.verifyContainsByLocator('#hospital_readmission','No')
      }
      cy.verifyContainsByLocator('#program',appoiments[appoiment].healthcareProgram)
      cy.verifyContainsByLocator('#visit_date',appoiments[appoiment].visitDate)
      cy.verifyContainsByLocator('#comment',appoiments[appoiment].comment)
      cy.klik('#menu-toggle')
      cy.verifyContains("Home").click()
    }
  })

  it.skip('user failed make appoiment without fill required field', () => {
    cy.get('#btn-book-appointment').should('be.visible').click()

  })

  afterEach(() => {
    cy.klik('#menu-toggle')
    cy.verifyContains("Logout").click()
    cy.verifyUrlContains('/')
  })

})
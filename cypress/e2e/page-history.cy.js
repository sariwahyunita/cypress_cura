const users = require('../fixtures/users.json')
const appoiments = require('../fixtures/appointment.json')

describe('page hitory', () => {
  beforeEach(() => {
    //go to landing page
    cy.visit(Cypress.env('prod'))
    cy.get("#btn-make-appointment").should('be.visible').should('have.text', 'Make Appointment')
    //login
    cy.goToPage('Login')
    cy.verifyUrlContains('/profile.php#login')
    cy.inputLogin(users[0].username, users[0].password)
    cy.verifyUrlContains('/#appointment')
  })

  it('user success view history with empty data', () => {
    cy.goToPage('History')
    cy.verifyContains("No appointment.")
  })

  it('user success view history with any data', () => {
    let data = {
      "facility": appoiments[0].facility,
      "apply": appoiments[0].apply,
      "healthcareProgram": appoiments[0].healthcareProgram,
      "visitDate": appoiments[0].visitDate,
      "comment": appoiments[0].comment
    }
    cy.inputAppoiment(data)
    cy.goToPage('Home')
    cy.goToPage('History')
    cy.verifyContainsNotVisible("No appointment.")
  })

  afterEach(() => {
    //logout
    cy.goToPage('Logout')
    cy.verifyUrlContains('/')
  })

})
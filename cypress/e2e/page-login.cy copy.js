const users = require('../fixtures/users.json')

describe('page login', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('prod'))
    cy.verifyContains('CURA Healthcare Service')
    cy.get("#btn-make-appointment").should('be.visible').should('have.text', 'Make Appointment')
    cy.klik('#menu-toggle')
    cy.verifyContains("Login").click()
    cy.verifyUrlContains('/profile.php#login')
  })

  it('user login', () => {
    cy.inputLogin(users[0].username, users[0].password)
    cy.verifyUrlContains('/#appointment')
  })

  it('user login without fill username and password', () => {
    cy.inputLogin(users[3].username, users[3].password)
    cy.verifyContains('Login failed! Please ensure the username and password are valid.')
  })

  it('user login with fill unvalid username', () => {
    cy.inputLogin(users[1].username, users[1].password)
    cy.verifyContains('Login failed! Please ensure the username and password are valid.')
  })

  it('user login with fill unvalid password', () => {
    cy.inputLogin(users[2].username, users[2].password)
    cy.verifyContains('Login failed! Please ensure the username and password are valid.')
  })

})
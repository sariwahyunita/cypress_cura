const users = require('../fixtures/users.json')
const appoiments = require('../fixtures/appointment.json')

describe('page appoinment', () => {
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

  it.only('user success make appoiment', () => {
    for(let appoiment = 0; appoiment <= 2; appoiment++){
      let data = {
        "facility": appoiments[appoiment].facility,
        "apply": appoiments[appoiment].apply,
        "healthcareProgram": appoiments[appoiment].healthcareProgram,
        "visitDate": appoiments[appoiment].visitDate,
        "comment": appoiments[appoiment].comment
      }
      cy.inputAppoiment(data)
      cy.goToPage('Home')
    
    }
  })

  it('user failed make appoiment without fill required field', () => {
    cy.klik('#btn-book-appointment')
    cy.verifyUrlNotContains('/appointment.php#summary')
  })

  afterEach(() => {
    //logout
    cy.goToPage('Logout')
    cy.verifyUrlContains('/')
  })

})
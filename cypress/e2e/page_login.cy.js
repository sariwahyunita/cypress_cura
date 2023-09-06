describe('page login', () => {
  it('user login', () => {
    cy.visit('https://katalon-demo-cura.herokuapp.com')
    cy.contains("CURA Healthcare Service")
    cy.contains("Make Appointment").click()
    cy.contains("Login")
    cy.url().should('include', '/profile.php#login')
    cy.get('#txt-username').type("John Doe")
    cy.get('#txt-password').type("ThisIsNotAPassword")
    cy.get('#btn-login').click()
    cy.url().should('include', '/#appointment')
  })
})
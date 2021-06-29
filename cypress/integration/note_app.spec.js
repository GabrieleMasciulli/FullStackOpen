describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'masciu',
      name: 'Gabriele Masciulli',
      password: 'notgonnatellyou',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page opens correctly', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2021'
    )
  })

  it('user can open the login form', function () {
    cy.contains('log in').click()
  })

  it('user should be able to login', function () {
    cy.contains('log in').click()
    cy.get('#username').type('masciu')
    cy.get('#password').type('notgonnatellyou')
    cy.get('#login-button').click()

    cy.contains('Gabriele Masciulli')
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('masciu')
    cy.get('#password').type('wrongPawword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Gabriele Masciulli')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'masciu', password: 'notgonnatellyou' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.get('#save-note-button').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})

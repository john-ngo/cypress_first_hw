/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

describe('Sign up', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Sign up', () => {
        cy.visit('/login');

        cy.intercept('POST', 'https://api.realworld.io/api/users/login').as('sign-in');

        cy.get('[placeholder="Email"]').type('Edna.Ratke_8576@mail.com');
        cy.get('[placeholder="Password"]').type('12345Qwert!');
        cy.contains('.btn', 'Sign in').click();

        cy.wait('@sign-in');

        cy.get('[href="#@Edna.Ratke_8576"]').should('contain.text', 'Edna.Ratke_8576');
    });
});
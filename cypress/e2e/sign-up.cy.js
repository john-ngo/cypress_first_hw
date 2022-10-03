/// <reference types="cypress" />

const { generateUser } = require("../support/generate");

describe('Sign up', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Sign up', () => {
        cy.visit('/register');

        const user = generateUser();

        cy.intercept('POST', ' https://api.realworld.io/api/users').as('sign-up');

        cy.get('[placeholder="Username"]').type(user.username);
        cy.get('[placeholder="Email"]').type(user.email);
        cy.get('[placeholder="Password"]').type(user.password);
        cy.contains('.btn', 'Sign in').click();

        cy.wait('@sign-up');

        cy.get(`[href="#@${user.username}"]`).should('contain.text', user.username);
    });
});
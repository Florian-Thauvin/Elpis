/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */

/// <reference types="cypress" />

import specTitle from "cypress-sonarqube-reporter/specTitle";
import { addEnd, addPresentation } from "./presentation";

describe(specTitle("Offlines Access"), () => {
  it("Settings", () => {
    cy.visit("/");

    addPresentation("Settings");

    cy.visit("/");
    // all parameters are optional

    addEnd();
  });
});

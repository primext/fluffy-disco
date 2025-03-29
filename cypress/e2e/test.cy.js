describe('Example Test', () => {
    
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://127.0.0.1:5500/src/index.html');
      })
    
    it('should visit the homepage', () => {
        cy.contains('Image Resizer Tool'); // Verify the title is visible
    });
});
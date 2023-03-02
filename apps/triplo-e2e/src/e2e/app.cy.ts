describe('triplo', () => {
  beforeEach(() => cy.visit('/'));

  describe('non logged in user', () => {

      it("should show a the welcome page", () => {
        cy.get("h2").contains("The Open Source Community Needs People Like You!")
        cy.get("h5").contains("Build Experience and Knowledge by Contributing to Open Source projects")
        cy.get("button").contains("Learn more")
      });

      it("should redirect to the about page", () => {
        cy.get("button").contains("Learn more").click()
        cy.url().should("include", "About")
      })

      it("should be able to access the projects page", () => {
        cy.get("button").contains("Project").click()
        cy.url().should("include", "Projects")
        cy.get("h3").contains("Projects")
      })

      it("should be able to access the projects page and navigate to the detail view", () => {
        cy.get("button").contains("Project").click()
        cy.url().should("include", "Projects")
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Triplo").click()
        cy.url().should("include", "Projects/63aee8a426393c2cf59ae613")
        cy.get("h4").contains("Triplo")
      })

      it("should be able to access the projects page and navigate to the members view", () => {
        cy.get("button").contains("Project").click()
        cy.url().should("include", "Projects")
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Triplo").click()
        cy.url().should("include", "Projects/63aee8a426393c2cf59ae613")
        cy.get("h4").contains("Triplo")
        cy.get("Button").contains("Members").click()
        cy.get("a").contains("test")
      })

      it("should be able to access the login page", () => {
        cy.get("button").contains("Login").click()
        cy.get("h3").contains("Login")
        cy.url().should("include", "Login")
      })

      it("should be able to access the register page from the login page", () => {
        cy.get("button").contains("Login").click()
        cy.get("h3").contains("Login")
        cy.url().should("include", "Login")
        cy.get("a").contains("Register").click()
        cy.url().should("include", "Register")
      })
    });

    describe('logged in user', () => {
      it("should be able to login", () => {
        cy.get("button").contains("Login").click()
        cy.get("tui-input").click().type("dummy@gmail.com")
        cy.get("tui-input-password").click().type("secret")
        cy.get("button").contains("login").click()
        cy.url().should("include", "/")
        cy.get("button").contains("Sign Out")
      });

      describe('personal profile', () => {
        beforeEach(() => {
          cy.get("button").contains("Login").click()
          cy.get("tui-input").click().type("dummy@gmail.com")
          cy.get("tui-input-password").click().type("secret")
          cy.get("button").contains("login").click()
        })

        it("should be able to access profile", () => {
          cy.get("button").contains("Profile").click()
          cy.get("h4").contains("@dummy")
        })

        it("should be able to access users projects", () => {
          cy.get("button").contains("Profile").click()
          cy.get("button.tui-space_right-6").contains("Projects").click()
          cy.get("h5").contains("Projects")
        })

        it("should be able to access users likes", () => {
          cy.get("button").contains("Profile").click()
          cy.get("button").contains("Liked").click()
          cy.get("h5").contains("Liked")
        })

        it("should be able to access users invites", () => {
          cy.get("button").contains("Profile").click()
          cy.get("button").contains("Invites").click()
          cy.get("h5").contains("Invites")
        })

        it("should have a settings page", () => {
          cy.get("button").contains("Profile").click();
          cy.get('.tui-island__figure > .tui-space_right-3 > .t-wrapper > .t-content > .t-left > .t-icon > .t-svg').click();
          cy.get("h3").contains("Edit Profile")
        })
      });

    describe("project member", () => {
      beforeEach(() => {
        cy.get("button").contains("Login").click()
        cy.get("tui-input").click().type("dummy@gmail.com")
        cy.get("tui-input-password").click().type("secret")
        cy.get("button").contains("login").click()
        cy.url().should("include", "/")
        cy.get("button").contains("Sign Out")
      })

      it("should have task page", () => {
        cy.get("button").contains("Projects").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get("h5").contains("Tasks")
      });

      it("should have a create task page", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.url().should("include", "Tasks")
        cy.get("a").contains("Create Task").click()
        cy.get("h3").contains("Create task")
        cy.get("input").first().click().clear();
        cy.get("input").first().click().type('cypress');
        cy.get("tui-text-area").first().click().type('cypress description');
        cy.get('[type="submit"]').click();
      });

      it("should have page to view task details", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get(".tui-island").contains("cypress").click()
        cy.get("h5").contains("cypress")
      });

      it("should be able to update task", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get(".tui-island").contains("cypress").click()
        cy.get('.tui-space_right-2 > .t-wrapper > .t-content > .t-left > .t-icon > .t-svg').click();
        cy.get("input").first().click().clear();
        cy.get("input").first().click().type('cypress (updated)');
        cy.get('[type="submit"]').click();
        cy.get("h5").contains("cypress (updated)")
      });

      it("should be able to create a subtask", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get(".tui-island").contains("cypress").click()
        cy.get("a").contains("Create Subtask").click();
        cy.get("h3").contains("Create subtask")
        cy.get("tui-input").first().type('subtask');
        cy.get("tui-text-area").click().type('{selectAll}{del}');
        cy.get("tui-text-area").click().type('subtask description');
        cy.get('[type="submit"]').click();
      });

      it("should be able to edit a subtask", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get(".tui-island").contains("cypress").click()
        cy.get("a").contains("subtask").click();
        cy.get("h3").contains("Edit subtask")
        cy.get("tui-input").clear();
        cy.get("tui-input").first().type('subtask (updated)');
        cy.get('[type="submit"]').click();
        cy.get("a").contains("subtask (updated)")
      });

      it("should be able to delete subtask", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get(".tui-island").contains("cypress").click()
        cy.get("a").contains("subtask").click();
        cy.get('.tui-space_vertical-4 > .tui-space_right-3 > .t-wrapper > .t-content > .t-left > .t-icon > .t-svg').click();
      });

      it("should be able to delete task", () => {
        cy.get("button").contains("Project").click()
        cy.get("h3").contains("Projects")
        cy.get("triplo-project-card-list").contains("Nx monorepo").click();
        cy.get("button").contains("Tasks").click();
        cy.get(".tui-island").contains("cypress").click()
        cy.get('.tui-space_right-2 > .t-wrapper > .t-content > .t-left > .t-icon > .t-svg').click();
        cy.get('.tui-space_vertical-4 > .tui-space_right-3 > .t-wrapper > .t-content > .t-left > .t-icon > .t-svg').click();
      });
    });
  });
});

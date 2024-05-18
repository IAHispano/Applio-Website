# Applio Websites (Monorepo)

Welcome to the Applio websites official monorepo! This README outlines the rules and guidelines for contributing to the monorepo, which is managed using Turborepo. Please read through this document carefully to ensure a smooth and efficient development process.

## General Rules

1. **Monorepo Structure**
   - The monorepo contains multiple projects. Each project is located in its respective directory under the `apps` directory.

2. **Code Review**
   - All changes must go through a code review process. Open a Pull Request (PR) to the `main` branch when your feature or bugfix is complete.
   - PR titles should follow the format: `[Project] Short description of the change`.
   - Provide a detailed description of the changes in the PR, including the problem being solved and any relevant context.

## Commit Message Guidelines

1. **Format**
   - Use the following format for commit messages:
     ```
     [project] Short description of the change

     Detailed explanation (if necessary)
     ```
   - Example: 
     ```
     [docs] Add new section to documentation

     The new section includes detailed instructions on setting up the development environment. Adjusted the formatting to ensure consistency.
     ```

2. **Scope**
   - Clearly specify the project you are contributing to by using the project identifier (e.g., `applio-docs`, `applio-org`, `applio-tv`).
   - If the change affects multiple projects, list all relevant project identifiers.

3. **Message Content**
   - The short description should be concise yet descriptive.
   - The detailed explanation should provide additional context, if necessary, including the reasoning behind the change and any potential impacts.

## Turborepo Usage

1. **Running Tasks**
   - Use Turborepo to run tasks across projects efficiently.
   - Common tasks include:
     - `turbo run build` to build all projects.
     - `turbo run lint` to lint all projects.
     - `turbo run test` to test all projects.

2. **Project-specific Commands**
   - You can run tasks for specific projects by using the project identifier:
     - `turbo run build --filter=applio-docs`
     - `turbo run test --filter=applio-org`

## Contribution Workflow

1. **Cloning the Repository**
   - Clone the monorepo to your local machine:
     ```sh
     git clone https://github.com/IAHispano/Applio-Website
     cd Applio-Website
     ```

2. **Setting Up the Environment**
   - Install dependencies using pnpm:
     ```sh
     pnpm install
     ```

3. **Creating a New Branch**
   - Create a new branch for your feature or bugfix:
     ```sh
     git checkout -b feature/applio-docs-new-section
     ```

4. **Making Changes**
   - Make your changes in the appropriate project directory (`apps/applio-docs`, `apps/applio-org`, `apps/applio-tv`).
   - Commit your changes following the commit message guidelines.

5. **Pushing Changes and Creating a PR**
   - Push your branch to the remote repository:
     ```sh
     git push origin feature/applio-docs-new-section
     ```
   - Create a PR on GitHub and request a review from your team members.

6. **Merging**
   - Once your PR is approved and all checks pass, you can merge it into the `main` branch.

## Running Project-specific Commands

- To run specific commands for a project (e.g., `applio-docs`), use the following:
  ```sh
  pnpm i --filter=applio-docs
  pnpm run dev --filter=applio-docs
  ```

## Best Practices

- Write clean, maintainable, and well-documented code.
- Follow the coding standards and guidelines specific to each project.
- Ensure all tests pass before submitting a PR.
- Regularly pull the latest changes from the `main` branch to keep your branch up-to-date.
- Participate in code reviews by providing constructive feedback to your peers.

## Example Project Commands

To set up and run the documentation project (`applio-docs`):
1. **Clone the repository:**
   ```sh
   git clone https://github.com/IAHispano/Applio-Website
   cd Applio-Website
   ```

2. **Install dependencies for `applio-docs`:**
   ```sh
   pnpm i --filter=applio-docs
   ```

3. **Run the development server for `applio-docs`:**
   ```sh
   pnpm run dev --filter=applio-docs
   ```

## Contact

If you have any questions or need further assistance, feel free to reach out to the repository maintainers or open an issue on GitHub.

Thank you for contributing to the Applio websites monorepo! Your efforts help us build amazing products.

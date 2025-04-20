# Contributing to Lilaq Documentation

Thank you for your interest in contributing to the Lilaq documentation! This repository hosts the documentation for the [Lilaq](https://github.com/lilaq-project/lilaq) project, including tutorials, examples, and technical references.   

Your contributions help make Lilaq more accessible and useful for everyone.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
    - [Reporting Issues](#reporting-issues)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Submitting Pull Requests](#submitting-pull-requests)
3. [Development Workflow](#development-workflow)
4. [Testing](#testing)
5. [Documentation Guidelines](#documentation-guidelines)
6. [Code Style](#code-style)
7. [License](#license)

---

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the repository maintainers.

---

## How to Contribute

*Note that documentation for individual functions and parameters is part of the [Lilaq source code](https://github.com/lilaq-project/lilaq) in the form of doc-comments and contributions can be made there.*

### Reporting Issues

If you encounter a bug, typo, or missing information in the documentation, please [open an issue](https://github.com/lilaq-project/lilaq-project.github.io/issues). When reporting an issue, include:
- A clear and descriptive title.
- A link to the affected page or section.
- A description of the problem (e.g., incorrect information, unclear explanation, etc.).
- Suggestions for improvement, if applicable.

### Suggesting Enhancements

We welcome suggestions for improving the documentation! To suggest an enhancement:
1. Check the [issues page](https://github.com/lilaq-project/lilaq-project.github.io/issues) to ensure your idea hasn’t already been proposed.
2. Open a new issue and include:
   - A clear and descriptive title.
   - A detailed explanation of your suggestion.
   - Any relevant examples, use cases, or benefits of the proposed change.

### Submitting Pull Requests

We welcome contributions in the form of pull requests (PRs). To ensure a smooth process, please follow these best practices:
1. **Discuss First**: Before starting work on a significant change, open an issue to discuss your idea with the maintainers and community.
2. **Fork the Repository**: Create a fork of the repository in your GitHub account.
3. **Create a Branch**: Create a new branch for your changes:
   ```sh
   git checkout -b docs/your-branch-name
   ```
4. **Write Clear Commits**: Commit your changes with clear and concise messages.
5. **Test Your Changes**: Preview your changes locally to ensure they render correctly.
6. **Push Your Branch**: Push your branch to your fork:
   ```sh
   git push origin docs/your-branch-name
   ```
7. **Open a Pull Request**: Open a PR to the `main` branch of this repository. Include a clear description of your changes and link to any related issues.

---

## Development Workflow

### Setting Up the Repository

1. Clone the repository recursively:
   ```sh
   git clone https://github.com/lilaq-project/lilaq-project.github.io.git --recursive
   cd lilaq-project.github.io
   ```
2. Ensure you have the following dependencies installed:
   - Node.js
   - Python (version 3.8 or higher)
   - Typst (latest version)

3. Install the required Node.js dependencies:
   ```sh
   npm install
   ```

### Previewing Changes Locally

To preview your changes locally, follow these steps:

1. Generate a set of Typst images by calling:
   ```sh
   npm run generate-images
   ```

2. Generate the documentation reference from the Tyst source files:
   ```sh
   npm run generate-docs
   ```

3. Start the local development server:
   ```sh
   npm run start
   ```

4. Open your browser and navigate to the local server URL (usually `http://localhost:3000`) to view the documentation.

Make sure to verify that your changes render correctly and do not introduce any errors.

---

## Testing

Before submitting a PR, ensure your changes render correctly and do not introduce errors. 

All contributions must pass the test deployment before being merged. This is automatically checked when submitting a PR. You can check locally whether the build passes by running `npm run build`. 


## Documentation Guidelines

When contributing to the documentation, please follow these guidelines:
- **Clarity**: Write clear and concise explanations. Avoid jargon unless necessary, and provide definitions for technical terms.
- **Structure**: Organize content logically. Use headings, lists, and tables where appropriate.
- **Examples**: Include examples to illustrate concepts. Ensure examples are accurate and relevant. Automatically evaluated Typst examples can be created through code blocks with the language `example`. 
- **Consistency**: Use consistent terminology, formatting, and tone throughout the documentation.
- **Links**: Use relative links for internal references and ensure all links are functional.

---

## Code Style

To maintain consistency across the documentation:
- **Formatting**: Use Markdown syntax correctly and consistently.
- **Line Length**: Keep lines under 80 characters where possible to improve readability.
- **Headings**: Use proper heading levels (`##`, `###`, etc.) to structure content.
- **Lists**: Use `-` for unordered lists and numbers for ordered lists.
- **Code Blocks**: Use fenced code blocks (```` ``` ````) with the appropriate language identifier for syntax highlighting.

---

## License

By contributing to this repository, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to the Lilaq documentation! Your efforts make this project better for everyone.

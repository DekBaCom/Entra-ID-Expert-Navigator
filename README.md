# Entra ID Expert Navigator

A modern, responsive Single Page Application (SPA) for managing Microsoft Entra ID implementation, audit, and roadmap planning.

## Features

- **Entra Learn**: A knowledge base of architecture scenarios.
- **Audit Checklist**: Track Entra ID best practices implementation status.
- **Assessment Report**: Visual breakdown of your maturity score with PDF export.
- **Project Roadmap**: Drag-and-drop planner for your implementation phases.
- **Local Storage**: All data is persisted locally in your browser. No backend required.

## Tech Stack
- React + Vite
- Tailwind CSS
- Lucide React
- Recharts
- jsPDF
- Hello Pangea DnD

## Setup & Deployment

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run Locally**:
    ```bash
    npm run dev
    ```

3. **Deploy to GitHub Pages**:
    
    This project is pre-configured for GitHub Pages.

    **Step 1:** Build the project.
    ```bash
    npm run build
    ```

    **Step 2:** Push to GitHub.
    Ensure your repository is connected.

    **Step 3:** Deploy using the `gh-pages` package (optional helper) OR manually commit the `dist` folder.
    
    *Recommended way (automatic workflow):*
    Push your code to the `main` branch. GitHub Actions (if configured) or manually enable Pages settings to serve from `gh-pages` branch or `/docs` if you move the build there.

    *Manual way:*
    You can use the `gh-pages` package to publish easily.
    
    1. Install gh-pages:
       ```bash
       npm install gh-pages --save-dev
       ```
    
    2. Add this script to `package.json`:
       ```json
       "scripts": {
         "predeploy": "npm run build",
         "deploy": "gh-pages -d dist"
       }
       ```
    
    3. Run deploy:
       ```bash
       npm run deploy
       ```

    **Important**: Ensure your repository name matches the `base` in `vite.config.js`. Currently set to `/Entra-ID-Expert-Navigator/`.

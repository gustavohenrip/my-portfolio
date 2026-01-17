# Gustavo H. Puhlmann - Portfolio Project

This project is structured based on the comprehensive analysis of high-end automotive design aesthetics (Charles Leclerc) translated into a "Creative Developer" portfolio.

## 🏁 Creative Direction: "The Telemetry of Code"

### Design Pillars
1.  **Precision**: Grid systems, monospace data typography, aligned layouts.
2.  **Performance**: High-speed transitions, optimized assets, smooth scrolling (Lenis).
3.  **Depth**: Parallax effects, WebGL background elements, layering.

## 🛠 Tech Stack (Pre-configured in `package.json`)
*   **Next.js 14**: The V12 engine of the web.
*   **GSAP + ScrollTrigger**: For the cinematic "Scroll to Explore" feel.
*   **R3F (Three.js)**: For the "Cockpit" 3D elements.
*   **Tailwind CSS**: For rapid, systemic styling.

## 📂 Project Structure
*   `PORTFOLIO_CONCEPT_PLAN.md`: Full design analysis and strategy.
*   `src/data/portfolio.json`: The data layer (Profile, Projects, Skills) - *Edit this file to populate your real info.*

## 🚀 Getting Started
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000)

## 📝 Next Steps
- Update `src/data/portfolio.json` with actual LinkedIn data manually.
- Implement the "Hero" section using `react-three-fiber` for the background.
- Build the "Chapters" component to read from the JSON data.

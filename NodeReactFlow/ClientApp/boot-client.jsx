import './css/site.css';
import { renderApp } from "./publicApp";

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept(`./publicApp.jsx`, () => {
        renderApp();
    });
}
renderApp();

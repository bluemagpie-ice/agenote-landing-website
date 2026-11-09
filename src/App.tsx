import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import RevealRoot from "./components/feature/RevealRoot";
import ScrollProgress from "./components/feature/ScrollProgress";
import ScrollToTop from "./components/feature/ScrollToTop";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <ScrollToTop />
        <ScrollProgress />
        <RevealRoot />
        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
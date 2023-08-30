// Import necessary styles and components
import "./App.css";
import Container from "./components/container";
import Footer from "./components/footer";
import Header from "./components/header";
import ConfigProviderWrapper from "./components/configProvider/configProvider";
import Navigation from "./navigation";

// Import localization configuration
import "./localization/i18n.config";

// Import Redux Provider to connect Redux with the React app
import { Provider } from "react-redux"; //binding redux withreact app
import { store } from "./redux/store/store";

function App() {
  return (
    // Wrap the app with Redux Provider, and ConfigProviderWrapper for configuration
    <Provider store={store}>
      <ConfigProviderWrapper>
        <div>
          <Header />
          <Container>
            <Navigation />
          </Container>
        </div>
        <Footer />
      </ConfigProviderWrapper>
    </Provider>
  );
}

export default App;

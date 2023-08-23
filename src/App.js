import "./App.css";
import Container from "./components/container";
import Footer from "./components/footer";
import Header from "./components/header";
import "./localization/i18n.config";
import { Provider } from "react-redux"; //binding redux withreact app
import { store } from "./redux/store/store";
import ConfigProviderWrapper from "./components/configProvider/configProvider";
import Navigation from "./navigation";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
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

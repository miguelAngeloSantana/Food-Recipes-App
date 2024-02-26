import AppNavegator from "./src/navegation/AppNavegator";
import Provider from "./src/context/Provider";

export default function App() {
  return (
    <Provider>
      <AppNavegator />
    </Provider>
  );
}
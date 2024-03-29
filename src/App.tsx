import RoutesDefinition from "RoutesDefinition/RoutesDefinition";
import AuthContextProvider from "Context/Context";
import GlobalCSS from "Styles/GlobalStyle";
 
function App() {
  return (
<AuthContextProvider>
<GlobalCSS />
<RoutesDefinition></RoutesDefinition>
</AuthContextProvider>
  );
}
 
export default App;

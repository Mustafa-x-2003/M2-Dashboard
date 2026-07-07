
import AppRoutes from "../routes/AppRoutes";
import Providers from "./providers/Providers";
import { SkeletonTheme } from "react-loading-skeleton";
function App() {
  return (
    <Providers>
       <SkeletonTheme baseColor="#444" highlightColor="#202020">
      <AppRoutes />
      </SkeletonTheme>
    </Providers>
   
  );
}

export default App;

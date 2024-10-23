import Login from "./components/Login/Login"
import { LocalHostLoginProvider } from './components/Login/LocalHostLoginProvider';

function App() {

  return (
    <>
     <LocalHostLoginProvider>
       <Login/>
     </LocalHostLoginProvider>
    </>
  )
}

export default App

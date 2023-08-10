import React from 'react';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import ForgetPass from './components/auth/ForgetPassword/ForgetPassword';
import {Route, Routes} from 'react-router-dom';


 function App() {
  return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forget" element={<ForgetPass />} />
        </Routes>
  );
}

export default App;

































































































// const App = () => {
//   return (
//     <div>
//       <Login />
//       <Register />
//     </div>
//   );
// };

// export default App;
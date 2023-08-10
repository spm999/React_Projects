import React from 'react';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import ForgetPass from './components/auth/ForgetPassword/ForgetPass';
import {Route, Routes} from 'react-router-dom';


 function App() {
  return (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgetPass" element={<ForgetPass />} />
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
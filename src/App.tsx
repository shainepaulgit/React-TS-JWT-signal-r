
import {ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { AuthenticationProvider } from './providers/authentication/authenticationProvider';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/account/login/loginPage';
import AccessDeniedPage from './pages/account/accessDeniedPage';
import TwoFactorPage from './pages/account/twoFactorPage';
import ProtectedRoute from './auth/ProtectedRoute';
import { useThemeContext } from './providers/theme/theme-context';
import { ThemeProvider } from './providers/theme/themeProvider';
import { AppRoutes } from './appRoutes';
import './App.css'

const ThemedApp = () => {
  const { muiTheme } = useThemeContext();
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthenticationProvider>
        <Routes>
          <Route index element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/two-factor" element={<TwoFactorPage />} />
          { AppRoutes.map(({path, element, roles}, index) => (
            <Route key={index} path={path} element={<ProtectedRoute roles={roles}>{element}</ProtectedRoute>}/>
          )) }
        </Routes>
      </AuthenticationProvider>
    </MuiThemeProvider>
  );
}
function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  )
}

export default App
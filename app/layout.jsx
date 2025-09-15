(
echo import './globals.css';
echo.
echo export default function RootLayout({ children }) {
echo   return (
echo     ^<html lang="es"^>
echo       ^<body^>{children}^</body^>
echo     ^</html^>
echo   );
echo }
) > app\layout.jsx
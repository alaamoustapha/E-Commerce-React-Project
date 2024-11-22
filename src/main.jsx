
import { createRoot } from 'react-dom/client'
import  'bootstrap/dist/css/bootstrap.min.css'
import  'bootstrap/dist/js/bootstrap.bundle.min.js'
import  '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import './index.css'
import TokenContextProvider from './context/TokenContext.jsx';
import {QueryClient,QueryClientProvider} from 'react-query';



import App from './App.jsx'
import CartContextProvider from './context/CartContext.jsx';
  let query =new QueryClient()
createRoot(document.getElementById('root')).render(
<CartContextProvider>
    <QueryClientProvider client={query}>
        
    <TokenContextProvider>
        <App />
    </TokenContextProvider>
    
    </QueryClientProvider>
    </CartContextProvider>
)

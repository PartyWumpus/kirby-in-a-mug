import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@talkjs/web-components@0.0.27/default.css"
/>
<script
  src="https://cdn.jsdelivr.net/npm/@talkjs/web-components@0.0.27"
  async
></script>
    <App />
  </StrictMode>,
)

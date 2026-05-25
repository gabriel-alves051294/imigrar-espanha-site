
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import { Toaster } from 'sonner';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsPage from './pages/TermsPage.jsx';
import KitAfiliadosPage from './pages/KitAfiliadosPage.jsx';
import Afiliados from './pages/Afiliados.jsx';

// Community & Blog Pages
import CommunityPage from './pages/CommunityPage.jsx';
import ForumPage from './pages/ForumPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ThreadPage from './pages/ThreadPage.jsx';
import ChatRoom from './pages/ChatRoom.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import BlogEditorPage from './pages/BlogEditorPage.jsx';
import CommunityRulesPage from './pages/CommunityRulesPage.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import RequireAuth from './components/RequireAuth.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/kit-afiliados" element={<KitAfiliadosPage />} />
            <Route path="/afiliados" element={<Afiliados />} />
            
            {/* Community Routes — públicas para leitura, escrita requer login (hook server-side) */}
            <Route path="/comunidade" element={<CommunityPage />} />
            <Route path="/comunidade/c/todas" element={<ForumPage />} />
            <Route path="/comunidade/c/:slug" element={<CategoryPage />} />
            <Route path="/comunidade/t/:id" element={<ThreadPage />} />
            <Route path="/regras-comunidade" element={<CommunityRulesPage />} />

            {/* Rotas privadas — exigem sessão ativa */}
            <Route element={<RequireAuth />}>
              <Route path="/comunidade/chat/:slug?" element={<ChatRoom />} />
              <Route path="/blog/novo" element={<BlogEditorPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
            </Route>

            {/* Blog Routes — públicas para leitura */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            {/* Auth Callback */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background text-foreground text-center px-4">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  A página que você está procurando pode ter sido removida, teve seu nome alterado ou está temporariamente indisponível.
                </p>
                <a 
                  href="/" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Voltar para o início
                </a>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
        <CookieBanner />
        <Toaster position="bottom-center" />
      </div>
    </Router>
  );
}

export default App;

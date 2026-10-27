import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase, isBackofficeConfigured } from '../supabase';
import { ContentContext } from './ContentContext';
import { readPublishedContent } from './contentRepository';
const STORAGE_KEY = 'sibiri-content-updated';

// ─── Provider ───────────────────────────────────────────────────────────────
// Charge tout le contenu du back-office en un seul appel au démarrage de l'app,
// et le rend disponible à tous les composants via useContentValue(key, fallback).
// Si Supabase n'est pas configuré (pas de .env.local), le site continue de
// fonctionner normalement avec les valeurs codées en dur (fallback).
export const ContentProvider = ({
  children
}) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(isBackofficeConfigured());
  const [error, setError] = useState('');
  const requestId = useRef(0);
  const refresh = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const request = ++requestId.current;
    try {
      const {
        data,
        error: readError
      } = await readPublishedContent(supabase);
      if (request !== requestId.current) return;
      if (readError) throw readError;
      setContent(Object.fromEntries((data || []).map(row => [row.key, row.value])));
      setError('');
    } catch {
      if (request === requestId.current) setError('Les contenus publiés ne sont pas disponibles pour le moment.');
    } finally {
      if (request === requestId.current) setLoading(false);
    }
  }, []);
  const update = useCallback((key, value) => {
    ++requestId.current;
    setContent(current => {
      const next = {
        ...current
      };
      if (value === undefined) delete next[key];else next[key] = value;
      return next;
    });
    setLoading(false);
    try {
      localStorage.setItem(STORAGE_KEY, `${Date.now()}-${Math.random()}`);
    } catch {/* Storage can be disabled. */}
  }, []);
  useEffect(() => {
    Promise.resolve().then(refresh);
    const onStorage = event => {
      if (event.key === STORAGE_KEY) refresh();
    };
    const onFocus = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    const poll = window.setInterval(onFocus, 60000);
    return () => {
      // This is a request generation counter, not a captured DOM reference.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ++requestId.current;
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
      window.clearInterval(poll);
    };
  }, [refresh]);
  return <ContentContext.Provider value={{
    content,
    loading,
    error,
    refresh,
    update
  }}>
      {children}
    </ContentContext.Provider>;
};

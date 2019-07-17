// couldn't find esm version so loaded in index.html 
// <script src="https://cdnjs.cloudflare.com/ajax/libs/polyglot.js/2.2.2/polyglot.min.js"></script>
import en from './en.json'
import es from './es.json'

const translations = {
  en,
  es,
}

const polyglot = new Polyglot(buildLangConfig())
export default polyglot

function buildLangConfig() {
  const langOnlyNoVariant = navigator.language.substring(0,2)
  const locale = translations[langOnlyNoVariant] ? langOnlyNoVariant : 'en'

  return {
    locale,
    phrases: translations[locale],
  }
}


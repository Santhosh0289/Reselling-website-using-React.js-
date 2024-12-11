import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language translations
const resources = {
  en: {
    translation: {
      welcome: "Welcome to our website",
      sell: "Sell",
      login: "Login",
      searchPlaceholder: "Find Cars, Mobiles, and More",
      selectLocation: "Select Location",
      english: "English",
      tamil: "Tamil",
      hindi: "Hindi",
    }
  },
  ta: {
    translation: {
      welcome: "எங்கள் இணையதளத்திற்கு வரவேற்கிறோம்",
      sell: "விற்க",
      login: "உள்நுழைய",
      searchPlaceholder: "கார்கள், கைபேசிகள் மற்றும் மேலும் கண்டறியுங்கள்",
      selectLocation: "இடத்தைத் தேர்ந்தெடுக்கவும்",
      english: "ஆங்கிலம்",
      tamil: "தமிழ்",
      hindi: "இந்தி",
    }
  },
  hi: {
    translation: {
      welcome: "हमारी वेबसाइट पर आपका स्वागत है",
      sell: "बेचना",
      login: "लॉगिन",
      searchPlaceholder: "कारें, मोबाइल फोन और अधिक खोजें",
      selectLocation: "स्थान चुनें",
      english: "अंग्रेजी",
      tamil: "तमिल",
      hindi: "हिंदी",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

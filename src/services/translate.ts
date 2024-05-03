import { FromLanguage, Language } from "../type.d";

const API_KEY = import.meta.env.VITE_API_KEY;

const baseUrl: string =
  "https://deep-translate1.p.rapidapi.com/language/translate/v2";
const options: RequestInit = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
  },
  body: JSON.stringify({
    q: "Hello World!",
    source: "en",
    target: "es",
  }),
};

async function detectLanguage(url: string) {
  const response = await fetch(url, options);
  const result = await response.text();
  const { data } = await JSON.parse(result);
  const detectedLanguage = data.detections[0].language;
  return detectedLanguage;
}

export async function translate({
  fromLanguage,
  toLanguage,
  textToTranslate,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  textToTranslate: string;
}) {
  try {
    if (fromLanguage === toLanguage) return textToTranslate;
    options.body = JSON.stringify({
      q: textToTranslate,
      source: fromLanguage,
      target: toLanguage,
    });
    if (fromLanguage === "auto") {
      const url = baseUrl + "/detect";
      const detectedLanguage = await detectLanguage(url);
      if (detectedLanguage === toLanguage) {
        return textToTranslate;
      }
      options.body = JSON.stringify({
        q: textToTranslate,
        source: detectedLanguage,
        target: toLanguage,
      });
    }
    const response = await fetch(baseUrl, options);
    const result = await response.text();
    const { data } = await JSON.parse(result);
    console.log(data.translations.translatedText);
    return data.translations.translatedText;
  } catch (error) {
    console.error(error);
  }
}

# Emare — Landing Page

Çöp atma ihlallerini kanıta dönüştürüp yetkili kurumlara ileten, kitle kaynaklı
çevre denetim platformu **Emare**'nin tanıtım sayfası.

## Demo

Sayfa GitHub Pages üzerinde yayında: **https://eumennn.github.io/Emare/**

## Yerelde çalıştırma

Sunucuya gerek yok — `index.html` dosyasını tarayıcıda açmak yeterli.

## Dosyalar

| Dosya | İçerik |
|---|---|
| `index.html` | Tüm sayfa yapısı |
| `styles.css` | Tasarım: palet, tipografi, bölüm düzenleri, animasyonlar |
| `script.js` | Yumuşak kaydırma, özel kaydırma çubuğu, reveal animasyonları, sekmeler |
| `i18n.js` | Türkçe / İngilizce sözlük ve dil değiştirme |
| `Emare *.png` | Bölüm görselleri (hero, kart destesi, bant, alt görsel) |

## Dil

Sayfa Türkçe açılır; navbardaki bayrak düğmesi İngilizceye çevirir ve seçim tarayıcıda
saklanır. Türkçe metinler doğrudan `index.html` içinde durur, İngilizceleri `i18n.js`
içindeki sözlüktedir. Yeni bir metin eklerken öğeye `data-i18n="anahtar"` verip aynı
anahtarı sözlüğe eklemek yeterli.

## Notlar

- Başlık fontu [Amatic SC](https://fonts.google.com/specimen/Amatic+SC), gövde fontu
  [Manrope](https://fonts.google.com/specimen/Manrope) — Google Fonts üzerinden yükleniyor.
- Yumuşak kaydırmayı kapatmak için `script.js` içindeki `SMOOTH_SCROLL` değerini `false` yapın.
- Sayfadaki plan fiyatları temsilidir.

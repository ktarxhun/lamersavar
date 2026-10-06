# lamersavar 👻⚡

> Web uygulamaları için sahte kurumsal yönetim paneli ve tam ekran sesli jumpscare bal tuzağı.

[🇬🇧 English Documentation](README.md) &bull; [🇹🇷 Türkçe Dokümantasyon](README.tr.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ktarxhun/lamersavar)
[![Platform](https://img.shields.io/badge/platform-Vanilla%20%7C%20React%20%7C%20Next.js-orange.svg)](#şablonlar)

Sitelerinizde sürekli `/admin`, `/wp-admin`, `/administrator` veya `/phpmyadmin` yollarını tarayan otomatik botlardan, port tarayıcılarından ve meraklı lamerlardan bıktınız mı?

**lamersavar**, bu rotaları saldırganın karşı koyamayacağı kadar gerçekçi ve inandırıcı bir sahte kurumsal geçide dönüştürür. Ziyaretçi ekranda herhangi bir yere tıkladığı, sahte formdan şifre denediği veya butona bastığı anda kaçışı olmayan, son ses ve tam ekran bir video jumpscare patlatır.

---

## 🎯 Özellikler

* **Gerçekçi Sahte Geçit Arayüzü**: SSL göstergeleri, 5651/siber güvenlik uyarıları ve resmi kurumsal görünümüyle dışarıdan bakıldığında %100 gerçek bir admin paneli gibi görünür.
* **Her Türlü Etkileşimde Anında Tetiklenme**: Buton tıklaması, form gönderimi veya boş tıklamalarda anında devreye girer.
* **Agresif Tam Ekran Kilidi**: Standart ve tarayıcıya özel `requestFullscreen` API çağrılarıyla ekranın tamamını anında kaplar.
* **Otomatik Oynatma ve Ses Engeli Aşımı**: Sesi maksimuma çeker; tarayıcının katı ses politikası varsa kullanıcının sonraki ilk tıklama, tuş veya fare hareketinde (`click`, `keydown`, `mousemove`) sesi anında açar.
* **Sekme Kapatma Engeli (`beforeunload`)**: Sayfadan hemen çıkılmasını veya sekmenin panikle kapatılmasını zorlaştırmak için tarayıcı onay uyarısını devreye sokar.
* **Sıfır Bağımlılık (Vanilla HTML)**: HTML/JS şablonu tamamen bağımsızdır, sunucuya tek dosya olarak kopyalanıp çalıştırılabilir.
* **React ve Next.js Bileşenleri**: Modern web projeleri için TypeScript destekli `Jumpscare.tsx` bileşeni ve `useJumpscare` kancası hazırdır.
* **Sunucu Yönlendirme Parçacıkları**: Next.js middleware, Nginx konfigürasyonu ve Express.js için hazır yönlendirme kodları içerir.

---

## 📁 Dizin Yapısı

```
lamersavar/
├── media/
│   └── jumpscare.mp4           # Optimize, hafif screamer video dosyası
├── templates/
│   ├── vanilla/
│   │   ├── index.html          # Bağımsız sahte admin geçidi
│   │   └── jumpscare.mp4       # Yerel test için video kopyası
│   └── react/
│       ├── Jumpscare.tsx       # Yeniden kullanılabilir React/Next.js bileşeni
│       ├── useJumpscare.ts     # Tetikleyici React kancası
│       └── DecoyAdminPage.tsx  # Kullanıma hazır sahte admin sayfası
├── snippets/
│   ├── next-middleware.ts      # Next.js sessiz URL maskeleme middleware'i
│   ├── nginx.conf              # Nginx location bloğu ayarı
│   └── express-middleware.js   # Express.js rota tuzağı
├── LICENSE                     # MIT Lisansı
├── AGENTS.md                   # Proje rehberi
├── README.md                   # İngilizce dokümantasyon
└── README.tr.md                # Türkçe dokümantasyon
```

---

## 🚀 Hızlı Başlangıç

### 1. Yerelde Deneyin (Vanilla HTML)

Depoyu klonlayıp saf HTML şablonunu Python ile hemen ayağa kaldırabilirsiniz:

```bash
cd templates/vanilla
python3 -m http.server 8080
```

Tarayıcınızda `http://localhost:8080` adresini açın, formu doldurup "Authenticate Operator" butonuna basın. (Kulaklık takıyorsanız sesi biraz kısmanız önerilir).

---

### 2. React / Next.js ile Kullanım

1. `media/jumpscare.mp4` dosyasını projenizin `public/media/` dizinine kopyalayın.
2. `templates/react/Jumpscare.tsx` bileşenini bileşen klasörünüze ekleyin.
3. Sahte admin rotanızda bileşeni çağırın:

```tsx
"use client";

import { useState } from "react";
import Jumpscare from "@/components/Jumpscare";

export default function FakeAdminRoute() {
  const [triggered, setTriggered] = useState(false);

  return (
    <div>
      <Jumpscare active={triggered} videoSrc="/media/jumpscare.mp4" />
      
      {/* Sahte formunuz */}
      <form onSubmit={(e) => { e.preventDefault(); setTriggered(true); }}>
        <input placeholder="Kullanıcı Adı" />
        <input type="password" placeholder="Parola" />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}
```

---

### 3. Sunucu Düzeyinde Yönlendirme

#### Next.js (Sessiz URL Maskeleme / Rewrite)
`snippets/next-middleware.ts` dosyasını Next.js proje kökünüze `middleware.ts` olarak koyun. Saldırgan `/admin` adresine girdiğinde adres çubuğunda hâlâ `/admin` görür ama arka planda tuzak sayfası render edilir.

#### Nginx
Sunucu bloğunuza (`server { ... }`) şu parçacığı ekleyin:

```nginx
location ~* ^/(admin|administrator|wp-admin|wp-login\.php|phpmyadmin) {
    root /var/www/lamersavar/templates/vanilla;
    try_files /index.html =404;
}
```

---

## ⚠️ Sağlık Uyarısı ve Yasal Sorumluluk Reddi

> [!WARNING]
> Bu yazılım ani ışık patlamaları, hızlı görsel geçişleri ve yüksek şiddette ses içerir.
> Işığa duyarlı epilepsisi, kalp rahatsızlığı veya ani yüksek ses hassasiyeti bulunan kişiler üzerinde kesinlikle KULLANILMAMALIDIR.
> Yalnızca siber güvenlik bal tuzağı (honeypot), eğitim ve davetsiz bot/tarayıcı caydırıcılığı amacıyla hazırlanmıştır.

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında sunulmaktadır.

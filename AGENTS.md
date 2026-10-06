# lamersavar: Proje Rehberi (AGENTS.md)

**ÖNEMLİ: Herhangi bir işlem yapmadan önce `/home/kuzey/RULES.md` dosyasını oku ve oradaki kurallara uy.**

Bu dosya Claude Code, Codex CLI ve Antigravity için ortak kılavuzdur. Projeye dair kalıcı teknik kararlar ve durum güncellemeleri buraya işlenir.

## Proje Tanımı
Yetkisiz bot taramaları, port ve URL tarayıcıları (`/admin`, `/wp-admin` vb.) ile meraklı davetsiz misafirleri caydırmak amacıyla tasarlanmış açık kaynak sahte yönetim geçidi (decoy honeypot) ve sesli jumpscare tuzağı.

## Bileşenler ve Mimari
* `media/jumpscare.mp4`: Hafif, optimize screamer video varlığı.
* `templates/vanilla/`: Bağımsız, sıfır bağımlılıklı saf HTML/JS sahte kurumsal arayüz.
* `templates/react/`: TypeScript destekli `Jumpscare.tsx` bileşeni, `useJumpscare` kancası ve örnek `DecoyAdminPage.tsx` sayfası.
* `snippets/`: Next.js middleware, Nginx reverse proxy ve Express.js tuzak yönlendirme kod parçacıkları.

## Canlı ve Yayın Durumu
* GitHub Reposu: `ktarxhun/lamersavar` (Public, https://github.com/ktarxhun/lamersavar)
* Lisans: MIT

## Güncellemeler ([Araç, TARİH] İmzalı)
* **[Antigravity, 2026-10-06]** Proje oluşturuldu. Best of BLG, BLGMUN ve Makerından projelerinde başarıyla uygulanan bal tuzağı mekanizması açık kaynak şablon paketi olarak derlendi. Standalone Vanilla ve React/Next.js şablonları, video medya varlıkları, sunucu yönlendirme kodları ve MIT lisansı hazırlandı. GitHub üzerinde `ktarxhun/lamersavar` adıyla public olarak yayınlandı.

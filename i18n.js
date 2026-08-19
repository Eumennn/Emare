/* =========================================================
   Emare — dil değiştirme (TR / EN)

   Türkçe metinler HTML'in içinde duruyor; sayfa açılırken
   hafızaya alınıyor. Aşağıdaki sözlük yalnızca İngilizcesini
   tutuyor. Yeni bir metin eklemek için:
     1) HTML'de öğeye  data-i18n="anahtar"  ver
     2) Buraya  'anahtar': 'English text'  satırını ekle
   ========================================================= */
(function () {
  'use strict';

  var EN = {
    /* --- menü --- */
    'nav.why': 'Why Emare',
    'nav.how': 'How It Works',
    'nav.who': 'Who Uses It',
    'nav.field': 'From the Field',
    'nav.orgs': 'For Institutions',
    'cta.contact': 'Get in Touch',

    /* --- hero --- */
    'hero.l1': "LITTER CAN'T HIDE",
    'hero.l2': 'FROM THE CAMERA',
    'hero.l3': 'ANYMORE',
    'hero.sub': 'The dashcam in your car, the camera on your helmet or the phone in your pocket. ' +
                'Record it, trim it to 10 seconds, send it. Your evidence reaches the authorities ' +
                'through a closed channel — and you earn EcoPoints.',
    'hero.cta': 'Upload Your Evidence',

    /* --- sorun + deste --- */
    'prob.title': 'THE CAMERAS ARE ALREADY ROLLING,<br>THE PROOF JUST DISAPPEARS.',
    'prob.lead': 'Thousands of cars carry dashcams and couriers wear helmet cameras. But that footage is ' +
                 'only ever used after a crash; the bottle thrown from a window and the rubble dumped on ' +
                 'the street are overwritten before anyone ever sees them.',
    'prob.cta': 'How does it work?',
    'deck1.t': 'Evidence stays on a closed channel',
    'deck1.s': 'No public shaming, no social media',
    'deck2.t': 'Every submission is reviewed',
    'deck2.s': 'Blurry, unreadable or merely suspicious clips are filtered out in moderation, so officers never waste time.',
    'deck3.t': 'Pin illegal dumps on the map',
    'deck3.s': 'The pin turns green once it is cleared',
    'stat1': 'Trimmed evidence length',
    'stat2': 'Upload flow',
    'stat3': 'Per violation processed',
    'stat4': 'Cost to the citizen',

    /* --- akış + yöntem --- */
    'flow.title': 'What happens to a report, step by step',
    'flow.note': 'No AI detection. The system runs on a citizen making a deliberate report and the state acting on it quickly.',
    'flow.s1': '<b>Upload</b> — Pick the clip from your dashcam or helmet camera in the gallery.',
    'flow.s2': '<b>Trim</b> — Keep only the 10 seconds where the act and the plate are clearly visible.',
    'flow.s3': '<b>Moderation</b> — The Emare team reviews it; if it falls short, you hear back with the reason.',
    'flow.s4': '<b>Enforcement</b> — The officer issues the fine, marks it in the panel, and your points land instantly.',
    'method.title': 'THE METHOD<br>BEHIND THE<br>EVIDENCE',
    'method.lead': 'Uploads run in the background, EXIF and GPS data are cross-checked against the location, ' +
                   'and moderators are alerted when the metadata does not add up. Institution panels are ' +
                   'IP-restricted and 2FA-protected. A reporter’s identity is <b>never</b> shared with the offender.',
    'method.cta': 'See the method',
    'chip1': 'SMS (OTP) verification',
    'chip2': 'EXIF &amp; GPS checks',
    'chip3': 'GDPR-compliant storage',
    'chip4': 'Closed channel, no shaming',
    'chip5': 'Background upload',
    'chip6': 'Heat-map analytics',

    /* --- bant --- */
    'band.kicker': 'The Emare loop',
    'band.title': 'RECORD. REPORT.<br>CLEAN UP. EARN.',

    /* --- kitle --- */
    'people.title': 'THE PEOPLE WHO<br>KEEP IT RUNNING',
    'people.lead': 'The platform runs on people who are already recording all day long. They share a single ' +
                   'goal: polluters should not get away with it, and the street should get clean.',
    'people.cta': 'See field examples',
    'tab0': 'Courier',
    'tab1': 'Taxi',
    'tab2': 'Walker',
    'tab3': 'NGO',
    'tab4': 'Agency',
    'p0.badge': 'Core audience',
    'p0.h': 'Motorcycle couriers &amp; motovloggers',
    'p0.p': 'On the road all day with a helmet camera. The group most exposed to litter thrown from windows — and the one that captures the clearest footage.',
    'p0.s1b': '8-10 hrs', 'p0.s1l': 'Recorded daily',
    'p0.s2b': '10 sec',   'p0.s2l': 'Trimmed moment',
    'p0.s3b': 'Leader',   'p0.s3l': 'Weekly board',
    'p1.badge': 'Dashcam',
    'p1.h': 'Taxi &amp; long-haul drivers',
    'p1.p': 'The camera is already there and already rolling. Clips pulled over Wi-Fi at the end of the day turn into evidence in a few taps.',
    'p1.s1b': '3-5 min',   'p1.s1l': 'Camera blocks',
    'p1.s2b': 'Automatic', 'p1.s2l': 'Location read',
    'p1.s3b': 'Points',    'p1.s3l': 'Earn while driving',
    'p2.badge': 'Instant capture',
    'p2.h': 'Pedestrians &amp; residents',
    'p2.p': 'A huge "Record Now" button the moment the app opens. The camera is live within seconds, before the moment is gone.',
    'p2.s1b': '1 tap',  'p2.s1l': 'To open camera',
    'p2.s2b': 'Map',    'p2.s2l': 'Dump reporting',
    'p2.s3b': 'Reward', 'p2.s3l': 'Points store',
    'p3.badge': 'Volunteer',
    'p3.h': 'Environmental volunteers &amp; NGOs',
    'p3.p': 'Groups that visit a red pin and clean it up upload before / after proof and earn far more EcoPoints than usual.',
    'p3.s1b': 'Before', 'p3.s1l': '+ after proof',
    'p3.s2b': 'Higher', 'p3.s2l': 'Points multiplier',
    'p3.s3b': 'Team',   'p3.s3l': 'Group badges',
    'p4.badge': 'B2G panel',
    'p4.h': 'Municipal police, city &amp; environment units',
    'p4.p': 'Moderated, geotagged, unambiguous evidence in a single panel. The officer issues the fine in their own system and marks the status here.',
    'p4.s1b': '2FA + IP',  'p4.s1l': 'Access security',
    'p4.s2b': 'Heat map',  'p4.s2l': 'Junction analysis',
    'p4.s3b': 'Lower',     'p4.s3l': 'Patrol cost',

    /* --- pano --- */
    'chalk.points': 'EcoPoints +500',
    'chalk.pin': 'pin ⚑',
    'chalk.sec': '10 sec',
    'pol1': 'Selin, 24<br>Volunteer — İzmir',
    'pol2': 'Storm drain<br>Reported',
    'pol3': 'Park path<br>Cleaned up',
    'pol4': 'Evidence clip<br>10-sec trim',
    'pol5': 'Agency panel<br>Action taken',
    'pol6': 'Coastal strip<br>Pilot area',
    'board.title': 'EVIDENCE FROM<br>THE FIELD',
    'board.p': 'Nobody is exposed, nobody is put on display. The footage goes only to the authorities; ' +
               'what is left behind is a cleaner street and points in your wallet.',

    /* --- planlar --- */
    'price.title': 'FLEXIBLE PLANS FOR INSTITUTIONS',
    'price.lead': 'An enforcement network that pays back its own licence in the first month.',
    'plan1.b1': 'report', 'plan1.b2': 'moderation', 'plan1.b3': 'agency', 'plan1.b4': 'one district · 3 months',
    'plan1.h': 'Pilot District',
    'plan1.for': 'For municipalities that want to measure deterrence in a single neighbourhood or district.',
    'plan1.price': '₺0<small>/ 3 months</small>',
    'plan1.f1': 'One district, up to 500 submissions a month',
    'plan1.f2': 'Citizen mobile app',
    'plan1.f3': 'Map module and dump pins',
    'plan1.f4': 'Manual moderation included',
    'plan1.f5': 'Monthly summary report',
    'plan1.f6': 'Launch PR support and neighbourhood information material',
    'plan1.foot': 'Free setup',
    'plan2.b1': 'evidence', 'plan2.b2': 'fine panel', 'plan2.b3': 'EcoPoints', 'plan2.b4': 'full B2G rollout',
    'plan2.h': 'Municipality',
    'plan2.for': 'The full version, embedded in the daily work of municipal and environmental police.',
    'plan2.price': '₺24,900<small>/ month</small>',
    'plan2.f1': 'Unlimited evidence uploads',
    'plan2.f2': 'Official B2G enforcement panel',
    'plan2.f3': '2FA, IP restriction, role-based access',
    'plan2.f4': 'EXIF / GPS cross-verification',
    'plan2.f5': 'Priority moderation (4 hours)',
    'plan2.f6': 'Heat maps and junction analytics',
    'plan2.f7': 'EcoPoints reward network',
    'plan2.f8': 'Growing the reward pool through brand sponsorships',
    'plan2.foot': '≈ ₺12 per processed item',
    'plan3.b1': 'province-wide', 'plan3.b3': 'DaaS reports', 'plan3.b4': 'multiple agencies',
    'plan3.h': 'Metropolitan &amp; Ministry',
    'plan3.for': 'For metropolitan and national bodies running many districts from a single place.',
    'plan3.price': '₺59,900<small>/ month</small>',
    'plan3.f1': 'Multi-district / province management',
    'plan3.f2': 'API integration with agency systems',
    'plan3.f3': 'Bulk upload portal (courier and taxi fleets)',
    'plan3.f4': 'Urban planning and DaaS reports',
    'plan3.f5': 'Dedicated SLA and 24/7 support',
    'plan3.f6': 'On-site staff training',
    'plan3.f7': 'ESG / carbon reporting groundwork',
    'plan3.f8': 'Legal counsel for national enforcement protocols',
    'plan3.foot': 'Quoted by scale',
    'price.note': 'Prices are indicative and set according to the size of the institution, the number of ' +
                  'districts and the expected volume. The platform is free for citizens under all conditions.',

    /* --- kapanış + footer --- */
    'cta.title': 'SEE REAL CHANGE<br>ON YOUR STREET',
    'cta.lead': 'The pilot consultation is free. Twenty minutes of demo is enough for your institution, and ' +
                'the first piece of evidence lands in the panel in under a week.',
    'footer.copy': '© 2026 Emare — Litter Detection &amp; Reward Platform',
    'footer.privacy': 'Privacy &amp; GDPR',

    /* --- görsel açıklamaları --- */
    'alt.hero': 'The Emare mascot picking up litter in a park, with a security camera and a keep-it-clean sign behind',
    'alt.cam': 'Surveillance camera in a park',
    'alt.record': 'The Emare mascot recording a violation with a phone',
    'alt.dump': 'Litter piled up around a storm drain',
    'alt.pick': 'The Emare mascot putting a plastic bottle into a recycling bag',
    'alt.band': 'The Emare mascot with a litter picker and a recycling bag',
    'alt.bottom': 'The Emare mascot sitting in a park next to a bird'
  };

  var META = {
    tr: {
      title: 'Emare — Kameran, temiz bir şehrin kanıtı olsun',
      desc: 'Emare, vatandaşların dashcam, kafa kamerası ve telefonlarıyla kaydettiği çöp atma ihlallerini kanıta dönüştürüp yetkili kurumlara ileten kitle kaynaklı çevre denetim platformudur.'
    },
    en: {
      title: 'Emare — Let your camera be the proof of a cleaner city',
      desc: 'Emare turns the dashcams, helmet cameras and phones citizens already carry into usable evidence and delivers it to the authorities.'
    }
  };

  /* Türkçe içerik sayfadan okunup saklanıyor */
  var TR = {};
  var TR_ALT = {};
  var nodes = document.querySelectorAll('[data-i18n]');
  var altNodes = document.querySelectorAll('[data-i18n-alt]');

  nodes.forEach(function (el) { TR[el.dataset.i18n] = el.innerHTML; });
  altNodes.forEach(function (el) { TR_ALT[el.dataset.i18nAlt] = el.getAttribute('alt'); });

  var api = { lang: 'tr', set: setLang };
  window.EMARE_I18N = api;

  function setLang(lang, save) {
    var en = lang === 'en';
    api.lang = en ? 'en' : 'tr';

    nodes.forEach(function (el) {
      var key = el.dataset.i18n;
      var val = en ? EN[key] : TR[key];
      if (val !== undefined && el.innerHTML !== val) el.innerHTML = val;
    });

    altNodes.forEach(function (el) {
      var key = el.dataset.i18nAlt;
      var val = en ? EN[key] : TR_ALT[key];
      if (val) el.setAttribute('alt', val);
    });

    /* sayaçlar: birim yazısı dile göre değişiyor */
    document.querySelectorAll('.count').forEach(function (el) {
      if (el.textContent === '0' && el.dataset.to !== '0') return;   /* henüz animasyon olmadı */
      var suffix = en ? (el.dataset.suffixEn || '') : (el.dataset.suffix || '');
      var to = parseFloat(el.dataset.to || '0');
      el.textContent = to.toLocaleString(en ? 'en-US' : 'tr-TR') + suffix;
    });

    document.documentElement.lang = api.lang;
    document.title = META[api.lang].title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', META[api.lang].desc);

    var btn = document.getElementById('lang');
    if (btn) {
      btn.classList.toggle('is-en', en);
      var label = btn.querySelector('.lang__label');
      if (label) label.textContent = en ? 'EN' : 'TR';
    }

    if (save) {
      try { localStorage.setItem('emare-lang', api.lang); } catch (err) { /* yok say */ }
    }
  }

  /* düğme + kayıtlı tercih */
  var btn = document.getElementById('lang');
  if (btn) {
    btn.addEventListener('click', function () {
      setLang(api.lang === 'en' ? 'tr' : 'en', true);
    });
  }

  /* varsayılan her zaman Türkçe; yalnızca kullanıcının seçimi hatırlanır */
  var saved = null;
  try { saved = localStorage.getItem('emare-lang'); } catch (err) { /* yok say */ }
  if (saved === 'en') setLang('en', false);
})();

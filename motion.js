/* =========================================================
   Emare — Motion (Framer Motion) katmani
   ---------------------------------------------------------
   Framer Motion'un vanilya JS surumu (npm: "motion") ESM
   olarak CDN'den yuklenir. Bu proje bir build araci
   kullanmadigi icin paket yerine dogrudan modul importu
   tercih edildi.

   Yuklenemezse (cevrimdisi / CDN engeli) script.js icindeki
   CSS tabanli reveal yedegi otomatik devreye girer.
   ========================================================= */

const MOTION_CDN = 'https://cdn.jsdelivr.net/npm/motion@12.43.0/+esm';

const state = window.EMARE_MOTION || (window.EMARE_MOTION = { pending: true });

/* Motion devreye giremezse eski davranisa don */
function bail(err) {
  if (err) console.warn('[Emare] Motion yuklenemedi, CSS yedegi kullaniliyor.', err);
  if (!state.pending) return;
  state.pending = false;
  state.ready = false;
  if (typeof state.fallback === 'function') state.fallback();
}

/* "--d:.35s" -> 0.35 */
function delayOf(el) {
  const raw = (el.style.getPropertyValue('--d') || '').trim();
  if (!raw) return 0;
  const n = parseFloat(raw);
  if (isNaN(n)) return 0;
  return raw.endsWith('ms') ? n / 1000 : n;
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduced) {
  /* hareket azaltma acikken hicbir sey animasyonlanmaz */
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  state.pending = false;
  state.ready = false;
} else {
  try {
    const { animate, inView } = await import(MOTION_CDN);

    if (!state.pending) throw new Error('gec kalindi');
    state.pending = false;
    state.ready = true;
    state.animate = animate;
    document.documentElement.classList.add('motion-on');

    const EASE = [0.16, 1, 0.3, 1];
    const seen = new WeakSet();

    /* ---------- reveal on enter ---------- */
    inView(
      '.reveal',
      (el) => {
        if (seen.has(el)) return;
        seen.add(el);

        /* .motion-on altinda CSS gecisi kapali; sinif yalnizca
           bitis durumunu sabitler, animasyonu Motion yurutur */
        el.classList.add('is-in');
        animate(
          el,
          { opacity: [0, 1], y: [30, 0] },
          { duration: 0.85, ease: EASE, delay: delayOf(el) }
        );
      },
      { amount: 0.12, margin: '0px 0px -8% 0px' }
    );

  } catch (err) {
    bail(err);
  }
}

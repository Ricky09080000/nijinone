'use strict';

(() => {
  document.documentElement.classList.add('js-enabled');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('main-nav');
  menuButton.hidden = false;
  function closeMenu(restoreFocus = false) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());

  const schedules = [
    { theme: 'たっぷりの安心のなかで、はじめてに出会う。', items: [['7:30','おはよう','順次登園・ゆったりあそび'],['9:30','みつけよう','お散歩・感触あそび'],['11:00','いただきます','月齢に合わせた給食'],['12:00','おやすみ','一人ひとりのリズムで午睡'],['15:00','またあした','おやつ・自由あそび・順次降園']] },
    { theme: '「じぶんで！」の気持ちを、あそびの力に。', items: [['7:30','おはよう','順次登園・好きなあそび'],['9:30','やってみよう','園庭あそび・お絵かき'],['11:30','いただきます','みんなと楽しむ給食'],['12:30','おやすみ','絵本を読んで、ひと休み'],['15:00','またあした','おやつ・リズムあそび・順次降園']] },
    { theme: '友だちと考える。一緒につくる。世界が広がる。', items: [['7:30','おはよう','順次登園・自由あそび'],['9:30','つくってみよう','自然観察・協力して制作'],['12:00','いただきます','食の発見を楽しむ給食'],['13:00','ひと休み','休息・絵本・静かな活動'],['15:00','またあした','おやつ・音楽あそび・順次降園']] }
  ];
  const tabs = [...document.querySelectorAll('[data-age]')];
  function setAge(index, moveFocus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    document.getElementById('day-panel').setAttribute('aria-labelledby', tabs[index].id);
    document.getElementById('day-theme').textContent = schedules[index].theme;
    document.getElementById('day-timeline').replaceChildren(...schedules[index].items.map((item) => {
      const li = document.createElement('li');
      ['time','strong','span'].forEach((tag, i) => {
        const element = document.createElement(tag);
        element.textContent = item[i];
        li.append(element);
      });
      return li;
    }));
    if (moveFocus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setAge(index));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); setAge(next, true); }
    });
  });

  const dialog = document.getElementById('visit-dialog');
  const form = document.getElementById('visit-form');
  const result = document.getElementById('visit-result');
  let visitTrigger;
  function resetVisit() {
    form.reset();
    form.hidden = false;
    result.hidden = true;
    document.querySelector('.dialog-intro').hidden = false;
  }
  function openVisit() {
    if (dialog.open) return;
    visitTrigger = document.activeElement;
    resetVisit();
    dialog.showModal();
  }
  document.querySelectorAll('[data-visit]').forEach((button) => button.addEventListener('click', openVisit));
  window.addEventListener('nijinone:visit', openVisit);
  document.querySelector('[data-close-visit]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    resetVisit();
    if (visitTrigger?.isConnected) visitTrigger.focus({ preventScroll: true });
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = [['お子さま', document.getElementById('visit-age').value], ['見学時間', document.getElementById('visit-time').value]];
    document.getElementById('visit-summary').replaceChildren(...values.map(([label, value]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = label; dd.textContent = value; row.append(dt, dd); return row;
    }));
    form.hidden = true;
    document.querySelector('.dialog-intro').hidden = true;
    result.hidden = false;
    result.tabIndex = -1;
    result.focus();
    dialog.scrollTop = 0;
  });
  document.getElementById('visit-restart').addEventListener('click', () => {
    resetVisit(); document.getElementById('visit-age').focus();
  });

  document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => window.NijinoneDemo?.openVisitor(button.dataset.question)));
  document.querySelector('[data-open-chat]').addEventListener('click', () => window.NijinoneDemo?.openVisitor());
  const floatingChat = document.querySelector('.floating-chat');
  const suppressedSections = new Set();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) suppressedSections.add(entry.target);
        else suppressedSections.delete(entry.target);
      });
      floatingChat.classList.toggle('is-away', suppressedSections.size > 0);
    }, { rootMargin: '-80px 0px -50px 0px', threshold: 0 });
    ['inquiry','staff','growvia'].forEach((id) => observer.observe(document.getElementById(id)));
    observer.observe(document.querySelector('.hero-chat-card'));
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();

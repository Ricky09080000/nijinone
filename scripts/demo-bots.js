(() => {
  'use strict';

  const icons = {
    sparkle: '<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z"/><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6L20 2Z"/>',
    send: '<path d="m5 12 7-7 7 7M12 5v14"/>',
    reset: '<path d="M3 10a9 9 0 1 1 2.6 8.4M3 4v6h6"/>',
    document: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    shield: '<path d="M12 3 4 6v6c0 4 8 9 8 9s8-5 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
    person: '<circle cx="12" cy="8" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  };

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function icon(name, className = '') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.65');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', `bot-icon ${className}`);
    svg.innerHTML = icons[name] || icons.sparkle;
    return svg;
  }

  const documents = {
    attendance: {
      number: '01', title: '出欠・保護者対応', category: '園運営マニュアル',
      introduction: '欠席や遅刻の連絡を受けたとき、職員間で同じ情報を共有するための架空の手順書です。',
      sections: [
        ['連絡内容を確認する', '園児名・クラス・連絡者・欠席／遅刻の別・対象日を確認します。体調の聞き取りは園の方針に従い、必要な範囲に留めます。'],
        ['出欠記録に反映する', '出欠一覧に内容と受付時刻、受付担当者を記録します。給食数への影響があれば、調理担当にも共有します。'],
        ['担任へ引き継ぐ', '担任へ連絡内容を引き継ぎます。対応に迷う内容は主任に確認し、ボットだけで判断しません。'],
      ],
      note: '保護者や園児の個人情報を、この体験用チャットに入力しないでください。実際の連絡・出欠登録は行われません。',
    },
    visit: {
      number: '02', title: '見学受付', category: '保護者対応ガイド',
      introduction: '見学のお問い合わせから当日の案内までをまとめた、体験用の架空の受付ガイドです。',
      sections: [
        ['希望を伺う', '希望日・お子さまの年齢・参加人数を確認します。サンプルの見学時間は平日10:00／15:00、所要時間は約30分です。'],
        ['担当者が日程を確認する', '園の予定と担当者の対応可否を確認し、保護者へ連絡します。担当者の確認と連絡が終わるまでは予約確定にしません。'],
        ['案内と当日の準備をする', '集合場所と持ち物、当日の連絡方法をお伝えします。見学担当へ引き継ぎ、当日は保育環境・一日の流れ・質疑応答の順でご案内します。'],
      ],
      note: 'ここに掲載している見学時間・手順はデモ用の仮設定です。実際の予約を受け付けるものではありません。',
    },
    onboarding: {
      number: '03', title: '新人オンボーディング', category: '入職時チェックリスト',
      introduction: '新しく入職した職員が、確認する資料と相談先を見つけるための架空のチェックリストです。',
      sections: [
        ['初日に基本ルールを確認する', '担当の先輩職員と、勤務時間・連絡方法・園内の動線・個人情報の取り扱いを確認します。'],
        ['最初の週に業務を見学する', '出欠確認・保護者対応・保育記録などの手順を資料と照合しながら見学します。安全に関する業務は必ず担当職員の指導を受けます。'],
        ['担当者と振り返る', 'チェックリストで確認済みの項目と不明点を整理します。担当者との振り返りで次の目標とフォロー日を決めます。'],
      ],
      note: '架空の研修資料です。職員の個人情報、評価、勤務実績は登録されていません。',
    },
    supplies: {
      number: '04', title: '備品申請', category: '事務手続きガイド',
      introduction: '必要な備品の確認から申請、受け取りまでをまとめた架空のガイドです。',
      sections: [
        ['在庫と必要数を確認する', '保管場所を確認し、品名・数量・使用目的・希望日を整理します。購入前に既存在庫の利用や共有が可能か確認します。'],
        ['担当者へ申請する', '園指定の申請方法で必要事項を提出し、主任または事務担当の確認を待ちます。承認前の購入や発注は行いません。'],
        ['受け取りを記録する', '承認後は担当者が発注します。納品時に品名と数量を確認し、受け取り記録と保管場所を更新します。'],
      ],
      note: 'このデモでは備品の申請・承認・購入・発注は行われません。',
    },
  };

  let documentDialog;
  let documentReturnFocus;

  function openDocument(key, trigger) {
    const source = documents[key];
    if (!source) return;
    if (!documentDialog) {
      documentDialog = element('dialog', 'doc-dialog');
      documentDialog.setAttribute('aria-labelledby', 'demo-document-title');
      documentDialog.addEventListener('click', (event) => {
        if (event.target !== documentDialog) return;
        const rect = documentDialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) documentDialog.close();
      });
      documentDialog.addEventListener('close', () => {
        if (documentReturnFocus?.isConnected) documentReturnFocus.focus({ preventScroll: true });
      });
      document.body.append(documentDialog);
    }

    documentReturnFocus = trigger || document.activeElement;
    documentDialog.replaceChildren();
    const close = element('button', 'doc-close');
    close.type = 'button';
    close.setAttribute('aria-label', '資料を閉じる');
    close.append(icon('close'));
    close.addEventListener('click', () => documentDialog.close());
    const overline = element('p', 'doc-overline', `SAMPLE DOCUMENT ${source.number}`);
    const title = element('h2', 'doc-title', source.title);
    title.id = 'demo-document-title';
    const category = element('p', 'doc-category', `${source.category} · 架空のサンプル資料`);
    const introduction = element('p', 'doc-introduction', source.introduction);
    const list = element('ol', 'doc-sections');
    source.sections.forEach(([heading, content]) => {
      const row = element('li', 'doc-section');
      row.append(element('h3', '', heading), element('p', '', content));
      list.append(row);
    });
    const note = element('p', 'doc-note', source.note);
    const footer = element('p', 'doc-footer', 'NIJINONE / INTERNAL KNOWLEDGE DEMO');
    documentDialog.append(close, overline, title, category, introduction, list, note, footer);
    documentDialog.showModal();
    close.focus();
  }

  const normalize = (value) => value.normalize('NFKC').replace(/\s+/g, '').toLowerCase();

  function visitorAnswer(question) {
    const value = normalize(question);
    if (/アレルギー|アレルギ|除去|食物|給食|離乳|卵|小麦|牛乳/.test(value)) {
      return {
        title: '食事・アレルギーは、職員が個別に確認します。',
        paragraphs: ['お子さまの状態や必要な配慮によって対応が異なるため、このチャットでは受け入れや除去食対応の可否を判断しません。', '見学時などに担当職員へご相談ください。必要な確認事項やお手続きは、職員からご案内します。'],
        source: '園の基本情報を見る', href: '#nursery-info', visit: true,
      };
    }
    if (/見学|予約|訪問|雰囲気/.test(value)) {
      return {
        title: 'はい。園の見学を体験できます。',
        paragraphs: ['見学は平日 10:00 または 15:00、約30分を想定しています。保育室の様子や一日の流れを見ながら、気になることをご相談いただけます。', '下のボタンから、希望時間を選ぶデモをご体験ください。実際の予約や送信は行われません。'],
        source: '見学のご案内を見る', href: '#visit', visit: true,
      };
    }
    if (/時間|何時|開園|閉園|延長|土曜|日曜|祝日|休み/.test(value)) {
      return {
        title: '月〜土曜日、7:30〜18:30に開園しています。',
        paragraphs: ['延長保育は 18:30〜19:30、日曜日・祝日はお休みです。', '勤務の時間やお迎えについて気になることがあれば、見学時にお聞かせください。'],
        source: '開園時間・園の基本情報', href: '#nursery-info',
      };
    }
    if (/何歳|何才|年齢|何か月|何ヶ月|何カ月|月齢|0歳|1歳|2歳|3歳|4歳|5歳|6か月|対象|定員|人数|入園/.test(value)) {
      return {
        title: '生後6か月〜5歳のお子さまが対象です。',
        paragraphs: ['定員は30名です。一人ひとりの育ちに寄り添う、小さな園という設定でご紹介しています。', '空き状況や入園の条件は、実際の運用では担当職員が個別に確認してご案内します。'],
        source: '対象年齢・園の基本情報', href: '#nursery-info', visit: true,
      };
    }
    if (/持ち物|持物|持参|何を持|準備|服装/.test(value)) {
      return {
        title: '見学時は、普段のお出かけの準備でどうぞ。',
        paragraphs: ['お子さまと一緒の場合は、飲み物・おむつ・着替えなど、必要なものをご用意ください。気になる点をメモしておくと、見学時に確認しやすくなります。', 'これはデモ用のご案内例です。実際の持ち物は、日程の確認時に担当職員からお伝えします。'],
        source: '見学のご案内を見る', href: '#visit',
      };
    }
    if (/ありがとう|有難う/.test(value)) return { paragraphs: ['こちらこそ、ありがとうございます。ほかにも見学・開園時間・対象年齢・持ち物について、お気軽にお試しください。'] };
    return {
      title: 'この内容は、担当職員への確認が必要です。',
      paragraphs: ['この体験では「見学」「開園時間」「対象年齢」「持ち物」「アレルギー」に関する回答例をご覧いただけます。', '回答例にないご相談は、実際の運用では担当職員へおつなぎします。ここでは実際の問い合わせ送信は行いません。'],
      source: '園の基本情報を見る', href: '#nursery-info', visit: true,
    };
  }

  function staffAnswer(question) {
    const value = normalize(question);
    let key;
    if (/欠席|出欠|遅刻|休み|保護者|連絡/.test(value)) key = 'attendance';
    if (/見学|受付|予約/.test(value)) key = 'visit';
    if (/新人|入職|研修|オンボーディング|教育/.test(value)) key = 'onboarding';
    if (/備品|申請|発注|購入|在庫/.test(value)) key = 'supplies';
    if (!key) return {
      title: '登録済みの資料では、回答を確認できませんでした。',
      paragraphs: ['このデモでは、出欠・保護者対応、見学受付、新人オンボーディング、備品申請の4つの資料を参照できます。', '該当する資料を開くか、質問例をお試しください。判断が必要な内容は、主任や担当者に確認する想定です。'],
    };
    const source = documents[key];
    return {
      title: `${source.title}の資料から、3つの手順をご案内します。`,
      steps: source.sections.map(([heading, content]) => ({ heading, content })),
      document: key,
    };
  }

  const config = {
    visitor: {
      title: 'にじのね ご案内チャット', subtitle: '園のこと、気軽に聞いてみてください。',
      greeting: { title: 'こんにちは。にじのね保育園です。', paragraphs: ['園の見学や保育時間など、気になることをお答えします。下の質問から、まずはお試しください。'] },
      suggestions: ['見学できますか？', '開園時間は？', '何歳から通えますか？', '見学の持ち物は？', 'アレルギー対応は？'],
      placeholder: '例：土曜日は何時まで開いていますか？',
      answer: visitorAnswer,
    },
    staff: {
      title: 'にじのね 職員アシスタント', subtitle: '「あの手順どこだっけ？」を、すぐに解決。',
      greeting: { title: 'おつかれさまです。何を調べますか？', paragraphs: ['園内の手順を、登録済みのサンプル資料からご案内します。回答の参照元を開いて、元の資料も確認できます。'] },
      suggestions: ['欠席連絡の手順は？', '見学対応の流れは？', '新人研修の資料は？', '備品の申請方法は？'],
      placeholder: '例：備品の申請方法を教えて',
      answer: staffAnswer,
    },
  };

  function makeSidebar() {
    const sidebar = element('aside', 'staff-sidebar');
    sidebar.setAttribute('aria-label', '職員向けサンプル資料');
    const brand = element('div', 'staff-brand');
    brand.append(icon('sparkle'), element('span', '', 'nijinone'));
    const caption = element('p', 'staff-sidebar-caption', 'STAFF WORKSPACE');
    const heading = element('h3', 'staff-library-title', '資料ライブラリ');
    const library = element('div', 'staff-library');
    Object.entries(documents).forEach(([key, source]) => {
      const button = element('button', 'staff-document-button');
      button.type = 'button';
      button.setAttribute('aria-haspopup', 'dialog');
      button.append(icon('document'), element('span', '', source.title));
      button.addEventListener('click', () => openDocument(key, button));
      library.append(button);
    });
    const note = element('div', 'staff-library-note');
    note.append(icon('shield'), element('p', '', '4件の架空の資料を収録。クリックして中身を確認できます。'));
    sidebar.append(brand, caption, heading, library, note);
    return sidebar;
  }

  function createChat(mount, type) {
    const options = config[type];
    const panel = element('div', `bot-panel bot-panel--${type}`);
    if (type === 'staff') panel.append(makeSidebar());
    const main = element('div', 'bot-main');
    const header = element('header', 'bot-header');
    const emblem = element('div', 'bot-emblem');
    emblem.append(icon('sparkle'));
    const headingGroup = element('div', 'bot-heading-group');
    const title = element('h3', 'bot-title', options.title);
    const subtitle = element('p', 'bot-subtitle', options.subtitle);
    headingGroup.append(title, subtitle);
    const reset = element('button', 'bot-reset');
    reset.type = 'button';
    reset.setAttribute('aria-label', `${options.title}の会話をリセット`);
    reset.title = '会話をリセット';
    reset.append(icon('reset'));
    header.append(emblem, headingGroup, reset);
    const sample = element('p', 'bot-sample-label', '体験用サンプル・登録済みの回答例');
    const thread = element('div', 'bot-thread');
    thread.setAttribute('role', 'log');
    thread.setAttribute('aria-label', `${options.title}の会話`);
    thread.setAttribute('aria-live', 'off');
    thread.tabIndex = 0;
    const announcement = element('div', 'bot-visually-hidden');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    const suggestions = element('div', 'bot-suggestions');
    suggestions.setAttribute('aria-label', '質問例');
    const suggestionLabel = element('p', 'bot-suggestion-label', 'こんなことを聞いてみる');
    suggestions.append(suggestionLabel);
    const chips = element('div', 'bot-chips');
    const form = element('form', 'bot-form');
    form.setAttribute('aria-label', `${options.title}に質問する`);
    const inputRow = element('div', 'bot-input-row');
    const input = element('input', 'bot-input');
    input.type = 'text';
    input.id = `${type}-question`;
    input.name = 'question';
    input.maxLength = 300;
    input.autocomplete = 'off';
    input.placeholder = options.placeholder;
    input.setAttribute('aria-label', type === 'staff' ? '職員向けの質問' : '園についての質問');
    input.setAttribute('aria-describedby', `${type}-privacy`);
    const send = element('button', 'bot-send');
    send.type = 'submit';
    send.setAttribute('aria-label', '質問を送信');
    send.disabled = true;
    send.append(icon('send'));
    inputRow.append(input, send);
    const privacy = element('p', 'bot-privacy', '入力はこのページ内のみで処理。個人情報は入力しないでください。');
    privacy.id = `${type}-privacy`;
    form.append(inputRow, privacy);

    function addMessage(role, answer) {
      const row = element('div', `bot-message bot-message--${role}`);
      const avatar = element('span', 'bot-avatar');
      avatar.append(icon(role === 'user' ? 'person' : 'sparkle'));
      const content = element('div', 'bot-message-content');
      const label = element('span', 'bot-message-label', role === 'user' ? 'あなた' : type === 'staff' ? '職員アシスタント' : 'にじのね');
      const bubble = element('div', 'bot-bubble');
      if (role === 'user') {
        bubble.append(element('p', '', answer));
      } else {
        if (answer.title) bubble.append(element('p', 'bot-answer-title', answer.title));
        (answer.paragraphs || []).forEach((text) => bubble.append(element('p', '', text)));
        if (answer.steps) {
          const list = element('ol', 'bot-answer-steps');
          answer.steps.forEach(({ heading, content: body }) => {
            const item = element('li', 'bot-answer-step');
            item.append(element('strong', '', heading), element('p', '', body));
            list.append(item);
          });
          bubble.append(list);
        }
        if (answer.source) {
          const link = element('a', 'bot-source', answer.source);
          link.href = answer.href;
          link.prepend(icon('document'));
          link.append(icon('arrow'));
          bubble.append(link);
        }
        if (answer.document) {
          const source = documents[answer.document];
          const button = element('button', 'bot-source bot-source--document');
          button.type = 'button';
          button.setAttribute('aria-haspopup', 'dialog');
          button.append(icon('document'), element('span', '', `参照元：${source.title}`), icon('arrow'));
          button.addEventListener('click', () => openDocument(answer.document, button));
          bubble.append(button);
        }
        if (answer.visit) {
          const button = element('button', 'bot-visit-button', '見学予約を体験する');
          button.type = 'button';
          button.append(icon('arrow'));
          button.addEventListener('click', () => window.dispatchEvent(new CustomEvent('nijinone:visit')));
          bubble.append(button);
        }
      }
      content.append(label, bubble);
      row.append(avatar, content);
      thread.append(row);
      return row;
    }

    function announce(message) {
      announcement.replaceChildren(element('span', '', message));
    }

    function ask(question) {
      const clean = question.trim().slice(0, 300);
      if (!clean) return;
      addMessage('user', clean);
      const answer = options.answer(clean);
      const answerRow = addMessage('assistant', answer);
      announce([answer.title || '', ...(answer.paragraphs || []), ...(answer.steps || []).map((step, index) => `${index + 1}、${step.heading}。${step.content}`)].join(' '));
      input.value = '';
      send.disabled = true;
      if (window.matchMedia('(min-width: 701px)').matches) {
        thread.scrollTop = answerRow.offsetTop - thread.offsetTop - 12;
      } else {
        // The mobile conversation grows in the page. Keep its new answer visible.
        requestAnimationFrame(() => {
          if (!answerRow.isConnected) return;
          answerRow.tabIndex = -1;
          answerRow.focus({ preventScroll: true });
          answerRow.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        });
      }
    }

    options.suggestions.forEach((question) => {
      const button = element('button', 'bot-chip', question);
      button.type = 'button';
      button.append(icon('arrow'));
      button.addEventListener('click', () => {
        ask(question);
        if (window.matchMedia('(min-width: 701px)').matches) input.focus({ preventScroll: true });
      });
      chips.append(button);
    });
    suggestions.append(chips);
    let composing = false;
    input.addEventListener('compositionstart', () => { composing = true; });
    input.addEventListener('compositionend', () => { composing = false; send.disabled = !input.value.trim(); });
    input.addEventListener('input', () => { send.disabled = !input.value.trim(); });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && (composing || event.isComposing || event.keyCode === 229)) event.preventDefault();
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (composing) return;
      ask(input.value);
      if (window.matchMedia('(min-width: 701px)').matches) input.focus({ preventScroll: true });
    });
    reset.addEventListener('click', () => {
      thread.replaceChildren();
      input.value = '';
      send.disabled = true;
      addMessage('assistant', options.greeting);
      announce('会話をリセットしました。質問例から、もう一度お試しいただけます。');
      if (window.matchMedia('(min-width: 701px)').matches) input.focus({ preventScroll: true });
      else mount.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    });

    addMessage('assistant', options.greeting);
    main.append(header, sample, thread, suggestions, form, announcement);
    panel.append(main);
    mount.replaceChildren(panel);
    return { ask, input };
  }

  const visitorMount = document.getElementById('visitor-chat');
  const staffMount = document.getElementById('staff-chat');
  const visitorChat = visitorMount ? createChat(visitorMount, 'visitor') : null;
  if (staffMount) createChat(staffMount, 'staff');

  window.NijinoneDemo = Object.assign(window.NijinoneDemo || {}, {
    openVisitor(question) {
      if (!visitorChat) return;
      const desktop = window.matchMedia('(min-width: 701px)').matches;
      const hasQuestion = typeof question === 'string' && question.trim();
      if (hasQuestion) visitorChat.ask(question);
      if (desktop || !hasQuestion) visitorMount.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      if (desktop) visitorChat.input.focus({ preventScroll: true });
    },
  });
})();

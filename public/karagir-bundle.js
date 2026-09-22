// Karagir Interactive Prototype Bundle
(function() {
  const S = {
    screen: 'splash', // splash -> language -> mic -> phone -> otp -> role -> home
    lang: 'mr',
    role: 'artisan',
    tab: 'home',
    phoneNum: '98201 45892',
    otp: ['4', '2', '8', '9'],
    otpEntered: '',
    unreadNotifs: 2,
    isPlayingAudio: false,
    kalaListening: false,
    selectedProduct: null,
    cart: [],
    products: [
      {
        id: 'p1',
        title: 'हस्तनिर्मित वारली भित्तीचित्र फलक',
        enTitle: 'Authentic Warli Wall Panel',
        price: '₹2,450',
        tribe: 'Warli (पालघर)',
        img: '/karagir/1. cover page.png',
        tag: 'Fair Trade Certified',
        description: 'पारंपारिक तांदळाची पेस्ट आणि गेरू मातीने चित्रित केलेले मूळ वारली लग्न चौक दृश्य.'
      },
      {
        id: 'p2',
        title: 'बांबू विणकाम दीपस्तंभ',
        enTitle: 'Handcrafted Bamboo Lamp',
        price: '₹1,200',
        tribe: 'Madia Gond (गडचिरोली)',
        img: '/karagir/11. other tribes.png',
        tag: 'Eco-Friendly',
        description: 'गडचिरोलीच्या जंगलातील नैसर्गिक बांबूपासून तयार केलेला पारंपारिक कंदिलाचा नमुना.'
      },
      {
        id: 'p3',
        title: 'तांबे-पितळ कलाकुसर घंटा',
        enTitle: 'Tribal Brass Bell Artifact',
        price: '₹1,850',
        tribe: 'Bhil (नंदुरबार)',
        img: '/karagir/2. Overview.png',
        tag: 'Direct Artisan',
        description: 'पिढ्यानपिढ्या चालत आलेल्या ढोकरा पद्धतीचे नंदुरबार भागातील कलाकाम.'
      }
    ],
    communities: [
      { name: 'वारली चित्रकार मंच', members: '1,420 कारागीर', district: 'पालघर, डहाणू' },
      { name: 'गोंड वनकला समूह', members: '860 कारागीर', district: 'गडचिरोली, चंद्रपूर' },
      { name: 'कातकरी कात कामगार', members: '540 कारागीर', district: 'रायगड, ठाणे' }
    ]
  };

  const screenEl = document.getElementById('screen');
  const tabSlot = document.getElementById('tabslot');

  function render() {
    if (!screenEl) return;
    screenEl.scrollTop = 0;

    switch (S.screen) {
      case 'splash':
        renderSplash();
        break;
      case 'language':
        renderLanguage();
        break;
      case 'mic':
        renderMicPermission();
        break;
      case 'phone':
        renderPhone();
        break;
      case 'otp':
        renderOtp();
        break;
      case 'role':
        renderRole();
        break;
      case 'home':
        renderHome();
        break;
      case 'kala':
        renderKalaChat();
        break;
      case 'search':
        renderSearch();
        break;
      case 'communities':
        renderCommunities();
        break;
      case 'product':
        renderProductDetail();
        break;
      default:
        renderHome();
    }

    renderTabBar();
  }

  function renderSplash() {
    screenEl.innerHTML = `
      <div style="min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;text-align:center;background:linear-gradient(180deg, #5C1D24 0%, #350A0B 100%);color:#fff;">
        <div style="width:104px;height:104px;border-radius:50%;background:#F4D000;display:flex;align-items:center;justify-content:center;margin-bottom:24px;box-shadow:0 12px 32px rgba(0,0,0,0.4);">
          <span style="font-size:46px;line-height:1;">✹</span>
        </div>
        <h1 style="font-size:36px;font-weight:900;letter-spacing:-0.02em;margin-bottom:8px;color:#F4D000;">कारागीर</h1>
        <p style="font-size:16px;opacity:0.9;font-weight:500;max-width:260px;margin-bottom:40px;line-height:1.5;">
          महाराष्ट्रातील आदिवासी कलाकारांचे हक्काचे डिजिटल व्यासपीठ
        </p>
        <button id="btn-start" class="cta" style="background:#F4D000;color:#111;max-width:280px;font-weight:800;border:none;">
          प्रारंभ करा (Start) →
        </button>
      </div>
    `;

    document.getElementById('btn-start')?.addEventListener('click', () => {
      S.screen = 'language';
      render();
    });
  }

  function renderLanguage() {
    screenEl.innerHTML = `
      <div style="padding:24px 20px 80px;">
        <div class="head" style="padding:0 0 16px;">
          <div class="round bare" style="font-size:24px;">✹</div>
          <div class="htitle">भाषा निवडा / Choose Language</div>
        </div>

        <div style="background:#FFF8E7;border:1.5px solid #E5C258;border-radius:18px;padding:16px;display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <span style="font-size:24px;">🔊</span>
          <p style="font-size:13.5px;color:#614400;line-height:1.4;margin:0;">
            तुम्हाला ज्या भाषेत बोलायला आणि ऐकायला आवडेल ती भाषा निवडा.
          </p>
        </div>

        <div class="stack" style="gap:12px;">
          <button class="opt" data-lang="mr" aria-checked="${S.lang === 'mr'}" style="cursor:pointer;">
            <div class="glyph" style="font-size:20px;font-weight:bold;color:#6F0004;">म</div>
            <div class="txt">
              <b>मराठी</b>
              <span>महाराष्ट्राची मातृभाषा</span>
            </div>
            <div class="mark">${S.lang === 'mr' ? '✓' : ''}</div>
          </button>

          <button class="opt" data-lang="hi" aria-checked="${S.lang === 'hi'}" style="cursor:pointer;">
            <div class="glyph" style="font-size:20px;font-weight:bold;color:#6F0004;">हि</div>
            <div class="txt">
              <b>हिंदी</b>
              <span>Hindi language</span>
            </div>
            <div class="mark">${S.lang === 'hi' ? '✓' : ''}</div>
          </button>

          <button class="opt" data-lang="en" aria-checked="${S.lang === 'en'}" style="cursor:pointer;">
            <div class="glyph" style="font-size:18px;font-weight:bold;color:#6F0004;">EN</div>
            <div class="txt">
              <b>English</b>
              <span>Global English interface</span>
            </div>
            <div class="mark">${S.lang === 'en' ? '✓' : ''}</div>
          </button>
        </div>

        <div style="margin-top:28px;">
          <button id="btn-lang-next" class="cta" style="cursor:pointer;">
            पुढे जा (Continue) →
          </button>
        </div>
      </div>
    `;

    document.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        S.lang = btn.getAttribute('data-lang') || 'mr';
        render();
      });
    });

    document.getElementById('btn-lang-next')?.addEventListener('click', () => {
      S.screen = 'mic';
      render();
    });
  }

  function renderMicPermission() {
    screenEl.innerHTML = `
      <div style="padding:28px 20px 80px;text-align:center;">
        <div style="width:88px;height:88px;border-radius:50%;background:#FDF2F2;color:#6F0004;display:grid;place-items:center;margin:20px auto 24px;font-size:40px;box-shadow:0 8px 24px rgba(111,0,4,0.12);">
          🎙️
        </div>
        <h2 style="font-size:24px;font-weight:800;color:#111;margin-bottom:10px;">मायक्रोफोन परवानगी</h2>
        <p style="font-size:15px;color:#555;line-height:1.5;margin-bottom:24px;">
          'कला' ही AI सहाय्यक तुमच्या बोलीभाषेत ऐकण्यासाठी मायक्रोफोन वापरते. टाइप न करता बोलून ऑर्डर आणि माहिती मिळवा.
        </p>

        <div style="background:#F4F4F0;border-radius:16px;padding:16px;text-align:left;font-size:13.5px;color:#444;line-height:1.5;margin-bottom:32px;">
          <div style="font-weight:bold;margin-bottom:4px;color:#111;">✓ सुरक्षित आणि खाजगी</div>
          तुमचा आवाज केवळ उत्पादनांची नोंदणी व थेट संभाषणासाठी वापरला जातो.
        </div>

        <button id="btn-allow-mic" class="cta" style="margin-bottom:12px;cursor:pointer;">
          परवानगी द्या (Allow Microphone)
        </button>
        <button id="btn-skip-mic" class="cta hollow" style="cursor:pointer;">
          नंतर करू (Skip for now)
        </button>
      </div>
    `;

    document.getElementById('btn-allow-mic')?.addEventListener('click', () => {
      S.screen = 'phone';
      render();
    });

    document.getElementById('btn-skip-mic')?.addEventListener('click', () => {
      S.screen = 'phone';
      render();
    });
  }

  function renderPhone() {
    screenEl.innerHTML = `
      <div style="padding:24px 20px 80px;">
        <div class="head" style="padding:0 0 16px;">
          <button class="round bare" id="btn-back" style="font-size:20px;">←</button>
          <div class="htitle">मोबाईल क्रमांक</div>
        </div>

        <p style="font-size:15px;color:#666;margin-bottom:20px;">
          तुमच्या खात्याची पडताळणी करण्यासाठी कृपया आपला १० अंकी मोबाईल नंबर टाका.
        </p>

        <div style="display:flex;align-items:center;gap:10px;background:#F6F6F2;border:1.5px solid #DDD;border-radius:14px;padding:14px 16px;margin-bottom:24px;">
          <span style="font-weight:bold;color:#333;">🇮🇳 +91</span>
          <input id="phone-input" type="tel" value="${S.phoneNum}" style="border:none;background:transparent;outline:none;font-size:18px;font-weight:bold;letter-spacing:0.04em;flex:1;" />
        </div>

        <button id="btn-send-otp" class="cta" style="cursor:pointer;">
          OTP मिळवा (Get OTP) →
        </button>
      </div>
    `;

    document.getElementById('btn-back')?.addEventListener('click', () => {
      S.screen = 'language';
      render();
    });

    document.getElementById('btn-send-otp')?.addEventListener('click', () => {
      S.screen = 'otp';
      render();
    });
  }

  function renderOtp() {
    screenEl.innerHTML = `
      <div style="padding:24px 20px 80px;">
        <div class="head" style="padding:0 0 16px;">
          <button class="round bare" id="btn-back-phone" style="font-size:20px;">←</button>
          <div class="htitle">OTP पडताळणी</div>
        </div>

        <p style="font-size:15px;color:#666;margin-bottom:20px;">
          +91 ${S.phoneNum} या क्रमांकावर पाठवलेला ४ अंकी कोड टाका.
        </p>

        <div class="otp" style="margin-bottom:28px;">
          <i class="on">4</i>
          <i class="on">2</i>
          <i class="on">8</i>
          <i class="on">9</i>
        </div>

        <button id="btn-verify-otp" class="cta" style="cursor:pointer;">
          पडताळणी करा (Verify & Login)
        </button>

        <p style="text-align:center;font-size:13px;color:#888;margin-top:20px;">
          कोड आला नाही? <a href="#" style="color:#6F0004;font-weight:bold;">पुन्हा पाठवा (Resend)</a>
        </p>
      </div>
    `;

    document.getElementById('btn-back-phone')?.addEventListener('click', () => {
      S.screen = 'phone';
      render();
    });

    document.getElementById('btn-verify-otp')?.addEventListener('click', () => {
      S.screen = 'role';
      render();
    });
  }

  function renderRole() {
    screenEl.innerHTML = `
      <div style="padding:24px 20px 80px;">
        <div class="head" style="padding:0 0 16px;">
          <div class="htitle">तुमची भूमिका निवडा</div>
        </div>

        <p style="font-size:14.5px;color:#666;margin-bottom:20px;">
          तुम्ही कारागीर ॲप कशासाठी वापरणार आहात?
        </p>

        <div class="stack" style="gap:14px;">
          <button class="opt" data-role="artisan" aria-checked="${S.role === 'artisan'}" style="cursor:pointer;">
            <div class="glyph" style="font-size:22px;">🎨</div>
            <div class="txt">
              <b>मी आदिवासी कारागीर आहे</b>
              <span>माझी कलाकृती विकण्यासाठी व नोंदणीसाठी</span>
            </div>
            <div class="mark">${S.role === 'artisan' ? '✓' : ''}</div>
          </button>

          <button class="opt" data-role="buyer" aria-checked="${S.role === 'buyer'}" style="cursor:pointer;">
            <div class="glyph" style="font-size:22px;">🛍️</div>
            <div class="txt">
              <b>मी कलाप्रेमी / खरेदीदार आहे</b>
              <span>अस्सल आदिवासी कला वस्तू थेट खरेदी करण्यासाठी</span>
            </div>
            <div class="mark">${S.role === 'buyer' ? '✓' : ''}</div>
          </button>

          <button class="opt" data-role="researcher" aria-checked="${S.role === 'researcher'}" style="cursor:pointer;">
            <div class="glyph" style="font-size:22px;">📚</div>
            <div class="txt">
              <b>सांस्कृतिक अभ्यासक / NGO</b>
              <span>संशोधन व हस्तकलेचे दस्तऐवजीकरण</span>
            </div>
            <div class="mark">${S.role === 'researcher' ? '✓' : ''}</div>
          </button>
        </div>

        <div style="margin-top:28px;">
          <button id="btn-finish-role" class="cta" style="cursor:pointer;">
            ॲप सुरू करा (Enter Dashboard) →
          </button>
        </div>
      </div>
    `;

    document.querySelectorAll('.opt').forEach(btn => {
      btn.addEventListener('click', () => {
        S.role = btn.getAttribute('data-role') || 'artisan';
        render();
      });
    });

    document.getElementById('btn-finish-role')?.addEventListener('click', () => {
      S.screen = 'home';
      S.tab = 'home';
      render();
    });
  }

  function renderHome() {
    screenEl.innerHTML = `
      <div style="padding:16px 16px 90px;">
        <!-- Top Header Bar -->
        <div style="display:flex;align-items:center;justify-content:between;margin-bottom:16px;">
          <div>
            <span style="font-size:12px;font-weight:700;color:#6F0004;text-transform:uppercase;letter-spacing:0.08em;">सुस्वागतम</span>
            <h2 style="font-size:20px;font-weight:900;color:#111;">संजना देशमुख (कलाकार)</h2>
          </div>
          <div style="margin-left:auto;display:flex;align-items:center;gap:8px;">
            <span style="background:#FFF0D4;color:#7A5300;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:bold;">
              पालघर मंडळ
            </span>
          </div>
        </div>

        <!-- AI Voice Assistant Kala Prompt Banner -->
        <div style="background:linear-gradient(135deg, #5C1D24 0%, #350A0B 100%);color:#fff;border-radius:20px;padding:18px;margin-bottom:20px;display:flex;align-items:center;gap:14px;box-shadow:0 8px 24px rgba(92,29,36,0.2);">
          <div style="width:48px;height:48px;border-radius:50%;background:#F4D000;color:#111;display:grid;place-items:center;font-size:24px;flex-shrink:0;">
            🎙️
          </div>
          <div style="flex:1;">
            <b style="display:block;font-size:15px;color:#F4D000;">'कला' AI सहाय्यकाशी बोला</b>
            <span style="font-size:12.5px;opacity:0.9;">"नवीन वारली चित्राचा योग्य भाव (दाम) काय ठेवावा?"</span>
          </div>
          <button id="btn-talk-kala" style="background:#F4D000;color:#111;border:none;padding:8px 14px;border-radius:999px;font-size:12px;font-weight:800;cursor:pointer;">
            सुरू करा
          </button>
        </div>

        <!-- Metric Snapshot -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;">
            <span style="font-size:12px;color:#666;">एकूण विक्री</span>
            <div style="font-size:22px;font-weight:900;color:#111;margin-top:2px;">₹18,450</div>
            <span style="font-size:10.5px;color:#2E7D4F;font-weight:bold;">+14% या महिन्यात</span>
          </div>
          <div style="background:#fff;border:1px solid #E5E7EB;border-radius:16px;padding:14px;">
            <span style="font-size:12px;color:#666;">सक्रिय कलाकृती</span>
            <div style="font-size:22px;font-weight:900;color:#111;margin-top:2px;">१२ वस्तू</div>
            <span style="font-size:10.5px;color:#6F0004;font-weight:bold;">३ नवीन ऑर्डर्स</span>
          </div>
        </div>

        <!-- Featured Catalog -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <h3 style="font-size:16px;font-weight:800;color:#111;">तुमची उत्पादने (Catalog)</h3>
          <span style="font-size:12px;color:#6F0004;font-weight:bold;cursor:pointer;">सर्व पाहा (All)</span>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          ${S.products.map(p => `
            <div class="pcard" data-pid="${p.id}" style="cursor:pointer;">
              <div class="pimg">
                <img src="${p.img}" alt="${p.title}" />
                <span class="pflag ok">${p.tag}</span>
              </div>
              <div class="pbody">
                <span class="pname">${p.title}</span>
                <div class="pprice" style="color:#6F0004;">${p.price}</div>
                <div class="pmeta">${p.tribe}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById('btn-talk-kala')?.addEventListener('click', () => {
      S.screen = 'kala';
      render();
    });

    document.querySelectorAll('.pcard').forEach(c => {
      c.addEventListener('click', () => {
        const id = c.getAttribute('data-pid');
        S.selectedProduct = S.products.find(p => p.id === id) || S.products[0];
        S.screen = 'product';
        render();
      });
    });
  }

  function renderProductDetail() {
    const p = S.selectedProduct || S.products[0];
    screenEl.innerHTML = `
      <div style="padding:16px 16px 90px;">
        <div class="head" style="padding:0 0 14px;">
          <button class="round bare" id="btn-back-catalog" style="font-size:20px;">←</button>
          <div class="htitle">${p.title}</div>
        </div>

        <div style="border-radius:20px;overflow:hidden;background:#F5F5F0;margin-bottom:16px;border:1px solid #E5E7EB;">
          <img src="${p.img}" alt="${p.title}" style="width:100%;aspect-ratio:1/1;object-fit:cover;" />
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div>
            <span style="font-size:12px;color:#888;font-weight:bold;">${p.tribe}</span>
            <h2 style="font-size:20px;font-weight:900;color:#111;">${p.title}</h2>
          </div>
          <div style="font-size:24px;font-weight:900;color:#6F0004;">${p.price}</div>
        </div>

        <div style="background:#FFF9E6;border-radius:14px;padding:12px 14px;border:1px solid #F0D47C;margin-bottom:18px;">
          <div style="font-size:12px;font-weight:bold;color:#7A5300;margin-bottom:2px;">✓ AI 'दाम' गणक द्वारे प्रमाणित</div>
          <div style="font-size:12.5px;color:#553B00;">श्रम + कच्चा माल + आदिवासी संस्कृती मूल्यावर आधारित रास्त किंमत.</div>
        </div>

        <p style="font-size:14px;color:#444;line-height:1.6;margin-bottom:24px;">
          ${p.description}
        </p>

        <button id="btn-share-product" class="cta" style="background:#6F0004;cursor:pointer;margin-bottom:10px;">
          व्हाट्सॲपवर शेअर करा (Share to WhatsApp)
        </button>
      </div>
    `;

    document.getElementById('btn-back-catalog')?.addEventListener('click', () => {
      S.screen = 'home';
      render();
    });

    document.getElementById('btn-share-product')?.addEventListener('click', () => {
      alert(`'${p.title}' ची माहिती व खरेदी लिंक तयार झाली आहे!`);
    });
  }

  function renderKalaChat() {
    screenEl.innerHTML = `
      <div style="padding:16px 16px 100px;display:flex;flex-direction:column;min-height:100%;">
        <div class="head" style="padding:0 0 12px;">
          <button class="round bare" id="btn-back-kala" style="font-size:20px;">←</button>
          <div class="htitle">कला (Kala Voice AI)</div>
          <span style="font-size:11px;background:#EAF4EE;color:#2E7D4F;padding:3px 8px;border-radius:999px;font-weight:bold;">Active</span>
        </div>

        <!-- Chat messages -->
        <div style="flex:1;display:flex;flex-direction:column;gap:14px;">
          <div class="msg">
            <div style="width:34px;height:34px;border-radius:50%;background:#F4D000;display:grid;place-items:center;font-size:18px;flex-shrink:0;">
              ✹
            </div>
            <div class="bub">
              <div class="lead">नमस्ते संजनाताई! मी 'कला'. आज कोणती नवीन कलाकृती नोंदवायची आहे का?</div>
              <div class="sub">तुम्ही बोलून किंवा फोटो काढून मला दाखवू शकता.</div>
            </div>
          </div>

          <div class="msg mine">
            <div class="bub">
              <div class="lead">मी काल एक १८x२४ इंचाचे वारली भित्तीचित्र तयार केले आहे. याचा योग्य भाव काय ठेवावा?</div>
            </div>
          </div>

          <div class="msg">
            <div style="width:34px;height:34px;border-radius:50%;background:#F4D000;display:grid;place-items:center;font-size:18px;flex-shrink:0;">
              ✹
            </div>
            <div class="bub">
              <div class="lead">छान! १८x२४ इंचाच्या हस्तनिर्मित चौक चित्रासाठी सरासरी ₹२,२०० ते ₹२,६०० भाव योग्य ठरेल.</div>
              <div class="sub">यामध्ये २ दिवसांचे श्रम आणि अस्सल गेरू रंग समाविष्ट आहे.</div>
            </div>
          </div>
        </div>

        <!-- Audio microphone pill button -->
        <div style="margin-top:auto;text-align:center;padding-top:20px;">
          <div style="width:72px;height:72px;border-radius:50%;background:#6F0004;color:#fff;margin:0 auto 10px;display:grid;place-items:center;font-size:30px;box-shadow:0 8px 24px rgba(111,0,4,0.35);cursor:pointer;" id="btn-mic-record">
            🎙️
          </div>
          <span style="font-size:13px;font-weight:bold;color:#666;">बोलण्यासाठी दाबा (Tap to Speak)</span>
        </div>
      </div>
    `;

    document.getElementById('btn-back-kala')?.addEventListener('click', () => {
      S.screen = 'home';
      render();
    });

    document.getElementById('btn-mic-record')?.addEventListener('click', () => {
      alert('तुमचा आवाज ऐकला जात आहे... "कलाकृतीची माहिती नोंदवली गेली!"');
    });
  }

  function renderSearch() {
    screenEl.innerHTML = `
      <div style="padding:16px 16px 90px;">
        <div class="head" style="padding:0 0 14px;">
          <div class="htitle">शोध व आदिवासी जमाती</div>
        </div>

        <div style="background:#F2F2EC;border-radius:999px;padding:12px 18px;display:flex;align-items:center;gap:10px;margin-bottom:20px;">
          <span style="font-size:16px;">🔍</span>
          <input type="text" placeholder="वारली, भिल्ल, गोंड, कातकरी कला शोधा..." style="border:none;background:transparent;outline:none;font-size:14px;width:100%;" />
        </div>

        <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;color:#111;">महाराष्ट्र आदिवासी जमाती</h3>

        <div class="stack" style="gap:10px;">
          <div class="listrow" style="background:#fff;">
            <div style="width:48px;height:48px;border-radius:12px;background:#FBF1F1;color:#6F0004;display:grid;place-items:center;font-size:22px;font-weight:bold;">
              व
            </div>
            <div class="mid">
              <b>वारली (Warli)</b>
              <span>पालघर, डहाणू, तलासरी • निसर्ग चित्रकला</span>
            </div>
            <span style="font-size:12px;color:#6F0004;font-weight:bold;">पाहा →</span>
          </div>

          <div class="listrow" style="background:#fff;">
            <div style="width:48px;height:48px;border-radius:12px;background:#FDF6E3;color:#EFAC00;display:grid;place-items:center;font-size:22px;font-weight:bold;">
              गो
            </div>
            <div class="mid">
              <b>गोंड / माडिया (Gond)</b>
              <span>गडचिरोली, चंद्रपूर • बांबू व धातूकला</span>
            </div>
            <span style="font-size:12px;color:#6F0004;font-weight:bold;">पाहा →</span>
          </div>

          <div class="listrow" style="background:#fff;">
            <div style="width:48px;height:48px;border-radius:12px;background:#EAF4EE;color:#2E7D4F;display:grid;place-items:center;font-size:22px;font-weight:bold;">
              भि
            </div>
            <div class="mid">
              <b>भिल्ल (Bhil)</b>
              <span>नंदुरबार, धुळे • पिठोरा भित्तीचित्रे</span>
            </div>
            <span style="font-size:12px;color:#6F0004;font-weight:bold;">पाहा →</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderCommunities() {
    screenEl.innerHTML = `
      <div style="padding:16px 16px 90px;">
        <div class="head" style="padding:0 0 14px;">
          <div class="htitle">समुदाय व कार्यशाळा</div>
        </div>

        <div style="background:#FDF6E3;border:1px solid #E8C868;border-radius:16px;padding:14px;margin-bottom:20px;">
          <b style="color:#7A5300;font-size:14px;display:block;">पुढील कार्यशाळा: अस्सल वारली रंगकाम</b>
          <span style="font-size:12px;color:#553B00;">२४ ऑक्टोबर • डहाणू सांस्कृतिक केंद्र</span>
        </div>

        <h3 style="font-size:16px;font-weight:800;margin-bottom:12px;color:#111;">सक्रिय आदिवासी मंच</h3>

        <div class="stack" style="gap:10px;">
          ${S.communities.map(c => `
            <div class="listrow" style="background:#fff;">
              <div style="width:44px;height:44px;border-radius:50%;background:#5C1D24;color:#F4D000;display:grid;place-items:center;font-size:18px;font-weight:bold;">
                ✹
              </div>
              <div class="mid">
                <b>${c.name}</b>
                <span>${c.members} • ${c.district}</span>
              </div>
              <button style="border:1px solid #6F0004;color:#6F0004;background:transparent;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:bold;cursor:pointer;">
                सामील व्हा
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderTabBar() {
    if (!tabSlot) return;
    if (S.screen === 'splash' || S.screen === 'language' || S.screen === 'mic' || S.screen === 'phone' || S.screen === 'otp' || S.screen === 'role') {
      tabSlot.innerHTML = '';
      return;
    }

    tabSlot.innerHTML = `
      <div class="tabs">
        <button id="tab-home" aria-current="${S.screen === 'home' ? 'page' : 'false'}">
          <span style="font-size:18px;">🏠</span>
          <span>होम</span>
        </button>
        <button id="tab-search" aria-current="${S.screen === 'search' ? 'page' : 'false'}">
          <span style="font-size:18px;">🔍</span>
          <span>शोध</span>
        </button>
        <button id="tab-kala" class="kala" aria-current="${S.screen === 'kala' ? 'page' : 'false'}">
          <div style="width:52px;height:52px;border-radius:50%;background:#F4D000;color:#111;display:grid;place-items:center;font-size:24px;border:3px solid #fff;box-shadow:0 6px 16px rgba(111,0,4,0.3);">
            ✹
          </div>
          <span>कला AI</span>
        </button>
        <button id="tab-comm" aria-current="${S.screen === 'communities' ? 'page' : 'false'}">
          <span style="font-size:18px;">👥</span>
          <span>समुदाय</span>
        </button>
        <button id="tab-reset">
          <span style="font-size:18px;">⚙️</span>
          <span>रीसेट</span>
        </button>
      </div>
    `;

    document.getElementById('tab-home')?.addEventListener('click', () => {
      S.screen = 'home';
      render();
    });
    document.getElementById('tab-search')?.addEventListener('click', () => {
      S.screen = 'search';
      render();
    });
    document.getElementById('tab-kala')?.addEventListener('click', () => {
      S.screen = 'kala';
      render();
    });
    document.getElementById('tab-comm')?.addEventListener('click', () => {
      S.screen = 'communities';
      render();
    });
    document.getElementById('tab-reset')?.addEventListener('click', () => {
      S.screen = 'splash';
      render();
    });
  }

  // Initial load
  render();
})();

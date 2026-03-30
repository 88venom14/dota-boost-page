(function () {
  'use strict';

  const AD_SELECTORS = [
    'ins.adsbygoogle',
    '[id*="google_ads"]',
    '[id*="google_ad"]',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googlesyndication"]',
    '[data-ad-slot]',
    '[data-google-query-id]',
    '.adsbygoogle',
    'google-ad',
    '.ad-slot',
    '.ad-unit',
    '.ad-container',
    '.ad-wrapper',
    '.ad-banner',
    '.ad-block',
    '.ad-content',
    '.ad-header',
    '.ad-footer',
    '.ad-sidebar',
    '.ad-right',
    '.ad-left',
    '.ad-top',
    '.ad-bottom',
    '.ad-middle',
    '#ad-header',
    '#ad-footer',
    '#ad-sidebar',
    '#ad-container',
    '#ad-wrapper',
    'ytd-ad-slot-renderer',
    'ytd-banner-promo-renderer',
    'ytd-video-masthead-ad-v3-renderer',
    'ytd-in-feed-ad-layout-renderer',
    'ytd-instream-ad-renderer',
    'ytd-compact-promoted-video-renderer',
    '.ytp-ad-module',
    '.ytp-ad-overlay-container',
    '.ytp-ad-player-overlay',
    '.ytp-ad-text-overlay',
    '[data-testid="placementTracking"]',
    '[data-promoted]',
    '[data-ad]',
    '.sponsored',
    '.promoted',
    '.promoted-post',
    '.sponsored-content',
    '[class*="sponsored"]',
    '[class*="ad-slot"]',
    '[class*="ad-placement"]',
    '[class*="ad-container"]',
    '[class*="ad-banner"]',
    '[class*="ad-wrapper"]',
    '[class*="ad-block"]',
    '[class*="ad-unit"]',
    '[class*="ads-"]',
    '[class*="ads_"]',
    '[class*="advertisement"]',
    '[class*="sponsor"]',
    '[id*="ad-slot"]',
    '[id*="ad-container"]',
    '[id*="ad-wrapper"]',
    '[id*="ad-banner"]',
    '[id*="ad-unit"]',
    '[id*="ads-"]',
    '[id*="ads_"]',
    '[aria-label="advertisement"]',
    '[aria-label="Advertisement"]',
    '[aria-label="Sponsored"]',
    '[aria-label="Ad"]',
    '.premium-ads',
    '.shimmer-ad',
    '.v-ad',
    'aside[aria-label="Ads"]',
    'aside[aria-label="ads"]',
    '[class^="ad-"]',
    '[id^="ad-"]',
    '[class^="ads-"]',
    '[id^="ads-"]',
    '[class*="taboola"]',
    '[class*="outbrain"]',
    '[class*="mgid"]',
    '[class*="revcontent"]',
    '.native-ad',
    '.recommended-story',
  ];

  const SELECTOR_STRING = AD_SELECTORS.join(', ');

  let healedCount = 0;
  const processedElements = new WeakSet();
  const processedIds = new Set();

  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['totalHealed'], function (result) {
      healedCount = result.totalHealed || 0;
    });
  }

  function saveCount() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ totalHealed: healedCount });
    }
  }

  function getBannerURL(width, height) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
      const ratio = width / height;
      let bannerName;
      let bannerURL;

      if (ratio < 0.8) {
        bannerName = 'banner-vert.png';
        bannerURL = chrome.runtime.getURL('assets/banner-vert.png');
      } else if (ratio > 1.5) {
        bannerName = 'banner-horiz.png';
        bannerURL = chrome.runtime.getURL('assets/banner-horiz.png');
      } else {
        bannerName = 'banner-main.png';
        bannerURL = chrome.runtime.getURL('assets/banner-main.png');
      }

      console.log(`[Semka] Banner selected: ${bannerName} (ratio: ${ratio.toFixed(2)}, ${width}x${height})`);
      return bannerURL;
    }
    return null;
  }

  function createBanner(width, height) {
    const bannerURL = getBannerURL(width, height);

    const wrapper = document.createElement('div');
    wrapper.className = 'semka-healed-ad';

    wrapper.style.cssText = `
      width: 100% !important;
      height: 100% !important;
      min-height: ${Math.max(height, 90)}px !important;
      min-width: 100% !important;
      background: url("${bannerURL}") center/contain no-repeat !important;
      background-color: #0A0A0A !important;
      border-radius: 12px !important;
      border: 1px solid rgba(255, 140, 0, 0.3) !important;
      cursor: pointer !important;
      transition: transform 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      position: relative !important;
      overflow: hidden !important;
      z-index: 1 !important;
    `;

    wrapper.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.02)';
      this.style.borderColor = 'rgba(255, 140, 0, 0.5)';
    });

    wrapper.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.borderColor = 'rgba(255, 140, 0, 0.3)';
    });

    wrapper.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.open('https://semka-boost.com', '_blank');
    });

    return wrapper;
  }

  function healAd(element) {
    if (!element) return;
    if (processedElements.has(element)) return;

    const elementId = element.id || element.className;
    if (elementId && processedIds.has(elementId)) return;

    if (!element.offsetParent) return;

    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return;
    }

    processedElements.add(element);
    if (elementId) processedIds.add(elementId);

    const rect = element.getBoundingClientRect();
    const width = element.offsetWidth || rect.width || 300;
    const height = element.offsetHeight || rect.height || 250;

    if (width === 0 || height === 0) return;

    const banner = createBanner(width, height);

    element.innerHTML = '';
    element.appendChild(banner);
    element.dataset.semkaHealed = "true";

    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.minHeight = height + 'px';

    healedCount++;
    saveCount();
  }

  function scanForAds(root) {
    if (!root || !root.querySelectorAll) return;
    try {
      const ads = root.querySelectorAll(SELECTOR_STRING);
      ads.forEach(healAd);
    } catch (e) {}
  }

  function aggressiveScan(root) {
    if (!root) return;

    try {
      const allElements = root.querySelectorAll('*');
      allElements.forEach(el => {
        if (processedElements.has(el)) return;

        const id = el.id.toLowerCase();
        const className = el.className.toLowerCase();

        if (id.includes('ad') || id.includes('sponsor') ||
            className.includes('ad') || className.includes('sponsor')) {
          const rect = el.getBoundingClientRect();
          if (rect.width >= 100 && rect.height >= 50) {
            healAd(el);
          }
        }
      });
    } catch (e) {}
  }

  let scanTimeout = null;

  const observer = new MutationObserver(function (mutations) {
    if (scanTimeout) {
      clearTimeout(scanTimeout);
    }

    scanTimeout = setTimeout(function () {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
              try {
                if (node.matches && node.matches(SELECTOR_STRING)) {
                  healAd(node);
                }
              } catch (e) {}
              scanForAds(node);
            }
          }
        }
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          if (target && target.matches && target.matches(SELECTOR_STRING)) {
            healAd(target);
          }
        }
      });
    }, 50);
  });

  function init() {
    scanForAds(document);

    setTimeout(function () {
      aggressiveScan(document);
    }, 100);

    const target = document.documentElement || document.body;
    if (target) {
      observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id', 'style', 'hidden']
      });
    }

    const periodicScan = setInterval(function () {
      scanForAds(document);
    }, 3000);

    setTimeout(function () {
      clearInterval(periodicScan);
    }, 30000);

    window.addEventListener('load', function () {
      setTimeout(function () { scanForAds(document); }, 500);
      setTimeout(function () { scanForAds(document); }, 2000);
      setTimeout(function () { scanForAds(document); }, 5000);
    });
  }

  if (document.documentElement) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

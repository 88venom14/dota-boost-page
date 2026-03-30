/**
 * Semka Ad Healer — Content Script v2.0
 * Aggressive ad replacement with fallback strategies.
 */

(function () {
  'use strict';

  // ── Ad Selectors (Extended database) ──────────────────────────
  const AD_SELECTORS = [
    // Google Ads
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
    // YouTube
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
    // Social Media
    '[data-testid="placementTracking"]',
    '[data-promoted]',
    '[data-ad]',
    '.sponsored',
    '.promoted',
    '.promoted-post',
    '.sponsored-content',
    // Generic patterns
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
    // Common ad networks
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

  // ── Load Counter from Storage ─────────────────────────────────
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['totalHealed'], function (result) {
      healedCount = result.totalHealed || 0;
    });
  }

  // ── Save Counter ──────────────────────────────────────────────
  function saveCount() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ totalHealed: healedCount });
    }
  }

  // ── Get Banner URL based on aspect ratio ──────────────────────
  function getBannerURL(width, height) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
      const ratio = width / height;
      let bannerName;
      let bannerURL;
      
      // Vertical: ratio < 0.8 (height significantly > width, like 300x600)
      if (ratio < 0.8) {
        bannerName = 'banner-vert.png';
        bannerURL = chrome.runtime.getURL('assets/banner-vert.png');
      }
      // Horizontal: ratio > 1.5 (width significantly > height, like 728x90 = ratio 8.0)
      else if (ratio > 1.5) {
        bannerName = 'banner-horiz.png';
        bannerURL = chrome.runtime.getURL('assets/banner-horiz.png');
      }
      // Default: 16:9, square, 4:3 (ratio between 0.8 and 1.5)
      else {
        bannerName = 'banner-main.png';
        bannerURL = chrome.runtime.getURL('assets/banner-main.png');
      }
      
      console.log(`[Semka] Banner selected: ${bannerName} (ratio: ${ratio.toFixed(2)}, ${width}x${height})`);
      return bannerURL;
    }
    return null;
  }

  // ── Create Banner Element ─────────────────────────────────────
  function createBanner(width, height) {
    const bannerURL = getBannerURL(width, height);
    
    const wrapper = document.createElement('div');
    wrapper.className = 'semka-healed-ad';
    
    // Calculate proper scaling to fit banner within container
    // Use contain to ensure full banner is visible without cropping
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

    // Hover effect
    wrapper.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.02)';
      this.style.borderColor = 'rgba(255, 140, 0, 0.5)';
    });

    wrapper.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.borderColor = 'rgba(255, 140, 0, 0.3)';
    });

    // Click handler
    wrapper.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      window.open('https://semka-boost.com', '_blank');
    });

    return wrapper;
  }

  // ── Process Single Ad Element ─────────────────────────────────
  function healAd(element) {
    if (!element) return;
    if (processedElements.has(element)) return;
    
    // Check if already processed by ID
    const elementId = element.id || element.className;
    if (elementId && processedIds.has(elementId)) return;
    
    // Skip if element is not visible
    if (!element.offsetParent) return;
    
    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return;
    }

    processedElements.add(element);
    if (elementId) processedIds.add(elementId);

    // 1. Measure original ad dimensions
    const rect = element.getBoundingClientRect();
    const width = element.offsetWidth || rect.width || 300;
    const height = element.offsetHeight || rect.height || 250;

    if (width === 0 || height === 0) return;

    // 2. Create banner
    const banner = createBanner(width, height);

    // 3. Replace content - multiple strategies
    // Strategy A: Clear and append
    element.innerHTML = '';
    element.appendChild(banner);
    element.dataset.semkaHealed = "true";
    
    // Force visibility
    element.style.display = 'block';
    element.style.visibility = 'visible';
    element.style.opacity = '1';
    element.style.minHeight = height + 'px';

    healedCount++;
    saveCount();
  }

  // ── Scan for Ads ──────────────────────────────────────────────
  function scanForAds(root) {
    if (!root || !root.querySelectorAll) return;
    try {
      const ads = root.querySelectorAll(SELECTOR_STRING);
      ads.forEach(healAd);
    } catch (e) {
      // Silently handle selector errors
    }
  }

  // ── Aggressive Scan (also check parent elements) ───────────────
  function aggressiveScan(root) {
    if (!root) return;
    
    try {
      // Also look for elements that contain ad-like classes/IDs
      const allElements = root.querySelectorAll('*');
      allElements.forEach(el => {
        if (processedElements.has(el)) return;
        
        const id = el.id.toLowerCase();
        const className = el.className.toLowerCase();
        
        if (id.includes('ad') || id.includes('sponsor') ||
            className.includes('ad') || className.includes('sponsor')) {
          // Additional check: does it look like an ad container?
          const rect = el.getBoundingClientRect();
          if (rect.width >= 100 && rect.height >= 50) {
            healAd(el);
          }
        }
      });
    } catch (e) {}
  }

  // ── MutationObserver for Dynamic Content ──────────────────────
  let scanTimeout = null;
  
  const observer = new MutationObserver(function (mutations) {
    // Debounce rapid mutations
    if (scanTimeout) {
      clearTimeout(scanTimeout);
    }
    
    scanTimeout = setTimeout(function () {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the added node itself is an ad
              try {
                if (node.matches && node.matches(SELECTOR_STRING)) {
                  healAd(node);
                }
              } catch (e) {}
              // Check children
              scanForAds(node);
            }
          }
        }
        // Also check if attributes changed (common with lazy-loaded ads)
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          if (target && target.matches && target.matches(SELECTOR_STRING)) {
            healAd(target);
          }
        }
      });
    }, 50); // 50ms debounce
  });

  // ── Initialize ────────────────────────────────────────────────
  function init() {
    // Initial scan
    scanForAds(document);
    
    // Aggressive scan after short delay
    setTimeout(function () {
      aggressiveScan(document);
    }, 100);

    // Start observing
    const target = document.documentElement || document.body;
    if (target) {
      observer.observe(target, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id', 'style', 'hidden']
      });
    }

    // Periodic re-scan for stubborn ads
    const periodicScan = setInterval(function () {
      scanForAds(document);
    }, 3000);
    
    // Stop periodic scan after 30 seconds
    setTimeout(function () {
      clearInterval(periodicScan);
    }, 30000);

    // Re-scan after load events (for lazy-loaded ads)
    window.addEventListener('load', function () {
      setTimeout(function () { scanForAds(document); }, 500);
      setTimeout(function () { scanForAds(document); }, 2000);
      setTimeout(function () { scanForAds(document); }, 5000);
    });
  }

  // Start as early as possible
  if (document.documentElement) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

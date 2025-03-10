// ==UserScript==
// @name         Reddit Redirector to Old New UI
// @namespace    https://github.com/CePur/Reddit-Redirector
// @version      0.3
// @description  Redirect to old new reddit
// @author       CePur, u/Skidadlius
// @contributor  bmndc
// @match        *://www.reddit.com/*
// @match        https://www.reddit.com/web/r/uichangerforreddit/submit
// @run-at       document-start
// @grant        none
// @require      https://raw.githubusercontent.com/CePur/Reddit-Redirector/refs/heads/main/redditRedirector.js
// ==/UserScript==

(function () {
    'use strict';

    try {
        // Step 1: Initialize the variables
        const hasRedirected = sessionStorage.getItem('hasRedirected') === 'true';

        // Step 2: Redirect to submit page if not already there
        if (!hasRedirected && window.location.hostname === 'www.reddit.com') {
            let currentPage = window.location.pathname + window.location.search;

            // Load certain moderator pages in Old New UI
            if (currentPage.match(/\/mod\/.+\/(queue|rules|log|banned|muted|moderators)\/?/)) {
                let arrURL = currentPage.split(/\//);
                if (arrURL[3] === 'queue') {
                    currentPage = `/r/${arrURL[2]}/about/modqueue/`;
                } else {
                    currentPage = `/r/${arrURL[2]}/about/${arrURL[3]}/`;
                }
            }

            sessionStorage.setItem('hasRedirected', 'true');
            window.location.replace(`https://www.reddit.com/web/r/uichangerforreddit/submit#${currentPage}`);
            return; // Skip the rest of the script until redirected
        }

        // Step 3: Perform actions only once on the submit page
        if (window.location.pathname === '/web/r/uichangerforreddit/submit') {
            let currentPage = window.location.hash.slice(1);
            document.documentElement.style.setProperty('visibility', 'hidden'); // Don't flash the submit page
            function onLoadEvent() {
                document.title = "Redirecting to Old New UI...";
                
                document.querySelector("#AppRouter-main-content button:nth-child(1)")?.click();
                document.querySelector("#SHORTCUT_FOCUSABLE_DIV header a")?.click();
                document.querySelector("#SHORTCUT_FOCUSABLE_DIV section footer button:nth-child(1)")?.click();

                window.history.pushState(null, '', currentPage);
                window.history.pushState(null, '', currentPage);
                window.history.back();
                window.history.go(1);

                document.documentElement.style.removeProperty('visibility');
                // Old New UI is a SPA, so 'beforeunload' events only occur when reloading the page
                window.addEventListener('beforeunload', sessionStorage.removeItem('hasRedirected'));
                window.removeEventListener('load', onLoadEvent);
            }
            window.addEventListener('load', onLoadEvent);
        }
    } catch (error) {
        alert('An error occurred when loading Reddit Redirector to Old New UI (Tampermonkey script): ' + error.message);
    }
})();

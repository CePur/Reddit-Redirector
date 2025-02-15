// ==UserScript==
// @name         Reddit Redirector to Old New UI
// @namespace    https://github.com/CePur/Reddit-Redirector
// @version      0.3
// @description  Redirect to old new reddit
// @author       CePur
// @match        *.reddit.com/*
// @run-at       document-start
// @grant        none
// @require      https://raw.githubusercontent.com/CePur/Reddit-Redirector/refs/heads/main/redditRedirector.js
// ==/UserScript==

(function () {
    'use strict';

    try {
        // Step 1: Initialize the variables
        const isRedirected = sessionStorage.getItem('isRedirected') === 'true';
        const isReddit = window.location.hostname.includes("reddit.com");
        const isSubmit = window.location.pathname === '/web/r/ReturnNewReddit/submit';

        // Step 2: Redirect to submit page if not already there
        if (isReddit && !isSubmit && !isRedirected) {
            sessionStorage.setItem('isRedirected', true);

            const originalPage = window.location.pathname + window.location.search;
            sessionStorage.setItem('originalPage', originalPage);

            window.location.replace('https://www.reddit.com/web/r/ReturnNewReddit/submit');
            return; // Skip the rest of the script until redirected
        }

        // Step 3: Perform actions only once on the submit page
        if (isReddit && isSubmit && isRedirected) {

            window.addEventListener('load', function () {

                // Step 5: Click Click Click
                document.title = "Redirecting To Cozy Place";

                document.querySelector("#AppRouter-main-content button:nth-child(1)")?.click();
                document.querySelector("#SHORTCUT_FOCUSABLE_DIV header a")?.click();
                document.querySelector("#SHORTCUT_FOCUSABLE_DIV section footer button:nth-child(1)")?.click();

                // Step 6: Go back to original page
                const originalPage = sessionStorage.getItem('originalPage')
                window.history.pushState(null, '', originalPage)
                window.history.pushState(null, '', originalPage)
                window.history.back()
                window.history.go(1)

            });
        }
    } catch (error) {
        alert('An error occurred at Reddit Redirector to Old New UI (Tampermonkey script): ' + error.message);
    }
})();

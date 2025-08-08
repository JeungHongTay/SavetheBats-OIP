// ===========================
// Font Awesome Fallback System with Lucide SVG Icons
// ===========================
(function() {
    // Icon mapping from Font Awesome classes to Lucide SVG icons
    const iconFallbacks = {
        'fa-moon': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        'fa-exclamation-triangle': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17 .01 0"></path></svg>`,
        'fa-database': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="m3 5v14c0 3 4.5 3 9 3s9 0 9-3V5"></path><path d="m3 12c0 3 4.5 3 9 3s9 0 9-3"></path></svg>`,
        'fa-chart-line': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>`,
        'fa-gavel': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="m17.5 10-1.5-1.5"></path><path d="m19 11 2-2"></path><path d="m20.5 9.5-1-1"></path><path d="m21.75 8.25-4.5-4.5"></path><path d="m7.5 16.5 1 1"></path></svg>`,
        'fa-tools': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
        'fa-map-marked-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        'fa-city': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"></path><path d="M4 20V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v16"></path><path d="M12 20V10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10"></path><path d="M18 20V6a2 2 0 0 1 2-2h2v16"></path></svg>`,
        'fa-chart-area': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M7 12v5h12V8l-5 5-4-4Z"></path></svg>`,
        'fa-lightbulb': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`,
        'fa-chart-pie': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="m22 12-10-10v10z"></path></svg>`,
        'fa-network-wired': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6"></path><path d="m15.5 3.5-1.5 1.5"></path><path d="m4.5 15.5 1.5-1.5"></path><path d="m8.5 8.5 1.5 1.5"></path><path d="m15.5 20.5-1.5-1.5"></path><path d="m20.5 15.5-1.5-1.5"></path><path d="m3.5 8.5 1.5 1.5"></path></svg>`,
        'fa-globe': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
        'fa-times-circle': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>`,
        'fa-clipboard-list': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>`,
        'fa-expand-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path><path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path><path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path></svg>`,
        'fa-file-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>`,
        'fa-users': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="m22 21-2-2.5"></path><circle cx="19" cy="12" r="3"></circle></svg>`,
        'fa-sync-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>`,
        'fa-balance-scale': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1ZM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>`,
        'fa-mobile-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>`,
        'fa-comments': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path></svg>`,
        'fa-puzzle-piece': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322-.059.648-.026.975.056.534.191 1.057.415 1.551.48.916.646 1.954.414 2.958-.232 1.004-.834 1.902-1.677 2.502-.843.6-1.913.928-2.994.928H14a1 1 0 0 1-1-1v-1.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V18a1 1 0 0 1-1 1H7.871c-1.081 0-2.151-.328-2.994-.928-.843-.6-1.445-1.498-1.677-2.502-.232-1.004-.066-2.042.414-2.958.224-.494.359-1.017.415-1.551.033-.327.023-.653-.026-.975-.163-.779-.065-1.592.28-2.325.345-.733.91-1.342 1.625-1.74.715-.398 1.548-.567 2.382-.482.834.085 1.629.39 2.278.875L12 9l2.432-1.586c.649-.485 1.444-.79 2.278-.875.834-.085 1.667.084 2.382.482.715.398 1.28 1.007 1.625 1.74.345.733.443 1.546.28 2.325z"></path></svg>`,
        'fa-trash-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c-1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>`,
        'fa-trophy': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="m8 22 4-11 4 11"></path><path d="M8 15h8"></path></svg>`,
        'fa-redo-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M21 21v-5h-5"></path></svg>`,
        'fa-clock': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>`,
        'fa-handshake': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"></path><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path><path d="m21 3 1 11h-2"></path><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path><path d="M3 4h8"></path></svg>`,
        'fa-palette': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>`,
        'fa-mouse-pointer': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path></svg>`,
        'fa-eye': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        'fa-chart-bar': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>`,
        'fa-search': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>`,
        'fa-brain': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg>`,
        'fa-search-location': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        'fa-code': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16,18 22,12 16,6"></polyline><polyline points="8,6 2,12 8,18"></polyline></svg>`,
        'fa-external-link-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="m10 14 11-11"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>`,
        'fa-desktop': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>`,
        'fa-microscope': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"></path><path d="M3 22h18"></path><path d="m14 22-3-3 3-3 3 3-3 3Z"></path><path d="M14 16V2a2 2 0 0 0-2-2 2 2 0 0 0-2 2v14"></path><path d="M10 16.5 9 19l-1.5-1.5"></path><path d="M16 16.5 17 19l1.5-1.5"></path></svg>`,
        'fa-cogs': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        'fa-user-tie': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        'fa-bullseye': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
        'fa-graduation-cap': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>`,
        'fa-expand-arrows-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15,3 21,3 21,9"></polyline><polyline points="9,21 3,21 3,15"></polyline><line x1="21" x2="14" y1="3" y2="10"></line><line x1="3" x2="10" y1="21" y2="14"></line></svg>`,
        'fa-heart': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"></path></svg>`,
        'fa-book-open': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,
        'fa-leaf': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
        'fa-pencil-ruler': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6 10 2.5l.5-.5a2.121 2.121 0 0 1 3 3l-.5.5Z"></path><path d="m13.5 6 4.5 4.5"></path><path d="M16 11 7 20H3v-4l9-9"></path><path d="m8 3-1.5 1.5"></path><path d="M11.5 6.5 16 11"></path><path d="M10.5 7.5 16 2"></path></svg>`,
        'fa-laptop-code': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="4" rx="2"></rect><path d="m6 8 2 2-2 2"></path><path d="m12 14 2 0"></path><path d="M2 19h20"></path></svg>`,
        'fa-calendar-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>`,
        'fa-map-marker-alt': `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    };

    function detectFontAwesome() {
        // Create a temporary element with Font Awesome icon
        const testElement = document.createElement('i');
        testElement.className = 'fas fa-Overview';
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        testElement.style.fontSize = '16px';
        
        document.body.appendChild(testElement);
        
        // Check if the icon has loaded by measuring its width
        const computedStyle = window.getComputedStyle(testElement, '::before');
        const fontFamily = computedStyle.getPropertyValue('font-family');
        
        document.body.removeChild(testElement);
        
        // Font Awesome loads with specific font family
        return fontFamily && (
            fontFamily.includes('Font Awesome') || 
            fontFamily.includes('FontAwesome') ||
            fontFamily.includes('fa-')
        );
    }

    function applyFallbacks() {
        // Check if Font Awesome is loaded
        const fontAwesomeLoaded = detectFontAwesome();
        
        if (fontAwesomeLoaded) {
            showIconStatus('Font Awesome Loaded', 'fontawesome-mode');
            return; // Font Awesome is working, no fallback needed
        }

        console.log('Font Awesome CDN unavailable - applying Lucide SVG fallbacks');
        showIconStatus('SVG Fallback Mode', 'svg-mode');

        // Find all Font Awesome icons and replace with SVG icons
        const icons = document.querySelectorAll('i[class*="fa-"]');
        let replacedCount = 0;
        
        icons.forEach(icon => {
            const classes = icon.className.split(' ');
            let svgFound = false;
            
            // Check each class for a matching fallback SVG
            for (const className of classes) {
                if (iconFallbacks[className]) {
                    // Replace with SVG fallback
                    icon.innerHTML = iconFallbacks[className];
                    icon.classList.add('svg-fallback');
                    icon.classList.remove(...classes.filter(c => c.startsWith('fa')));
                    icon.title = `Offline SVG fallback for ${className}`;
                    
                    // Style the container to display the SVG properly
                    icon.style.display = 'inline-flex';
                    icon.style.alignItems = 'center';
                    icon.style.justifyContent = 'center';
                    
                    // Ensure SVG inherits color and size
                    const svg = icon.querySelector('svg');
                    if (svg) {
                        svg.style.width = '1em';
                        svg.style.height = '1em';
                        svg.style.fill = 'none';
                        svg.style.stroke = 'currentColor';
                    }
                    
                    svgFound = true;
                    replacedCount++;
                    break;
                }
            }
            
            // If no specific SVG found, use a generic one
            if (!svgFound) {
                const genericSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle></svg>`;
                icon.innerHTML = genericSvg;
                icon.classList.add('svg-fallback', 'generic');
                icon.title = 'Generic SVG fallback';
                
                icon.style.display = 'inline-flex';
                icon.style.alignItems = 'center';
                icon.style.justifyContent = 'center';
                
                const svg = icon.querySelector('svg');
                if (svg) {
                    svg.style.width = '1em';
                    svg.style.height = '1em';
                }
                
                replacedCount++;
            }
        });
        
        console.log(`Font Awesome fallback applied to ${replacedCount} icons with Lucide SVGs`);
        return replacedCount;
    }

    function showIconStatus(message, className) {
        // Remove existing indicator
        const existing = document.querySelector('.icon-status-indicator');
        if (existing) {
            existing.remove();
        }

        // Create new indicator
        const indicator = document.createElement('div');
        indicator.className = `icon-status-indicator ${className}`;
        indicator.textContent = message;
        
        document.body.appendChild(indicator);
        
        // Show indicator
        setTimeout(() => {
            indicator.classList.add('show');
        }, 100);
        
        // Hide after 3 seconds
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.remove();
                }
            }, 300);
        }, 3000);
    }

    // Apply fallbacks after DOM is loaded and fonts have had time to load
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit for fonts to load, then check
        setTimeout(applyFallbacks, 1000);
        
        // Also check when window finishes loading
        window.addEventListener('load', function() {
            setTimeout(applyFallbacks, 500);
        });
    });

    // Enhanced testing functions
    window.iconFallbackUtils = {
        // Force apply SVG fallbacks for testing
        forceSvgMode: function() {
            console.log('🔧 Forcing SVG fallback mode for testing...');
            
            // Remove existing status indicator
            const existing = document.querySelector('.icon-status-indicator');
            if (existing) existing.remove();
            
            // Force fallback by temporarily overriding detection
            const originalDetect = detectFontAwesome;
            window.detectFontAwesome = () => false;
            
            const replacedCount = applyFallbacks();
            
            // Restore original function
            window.detectFontAwesome = originalDetect;
            
            console.log(`✅ SVG fallbacks applied to ${replacedCount} icons`);
        },
        
        // Check if Font Awesome is currently loaded
        checkFontAwesome: function() {
            const isLoaded = detectFontAwesome();
            console.log(`Font Awesome status: ${isLoaded ? '✅ Loaded' : '❌ Not loaded'}`);
            return isLoaded;
        },
        
        // List all current icons on the page
        listIcons: function() {
            const icons = document.querySelectorAll('i[class*="fa-"], .svg-fallback');
            console.log(`Found ${icons.length} icons on page:`);
            icons.forEach((icon, index) => {
                const isSvg = icon.classList.contains('svg-fallback');
                const hasContent = icon.innerHTML.includes('<svg');
                console.log(`${index + 1}. ${isSvg ? '🔄' : '📦'} ${icon.className} - ${hasContent ? '[SVG]' : '[Font Awesome]'}`);
            });
            return icons;
        },
        
        // Reload page to test with fresh Font Awesome load
        testReload: function() {
            console.log('🔄 Reloading page to test fresh Font Awesome load...');
            window.location.reload();
        }
    };

    // Expose main function globally
    window.applyIconFallbacks = applyFallbacks;
    
    // Console help message
    console.log(`
    🦇 EcoNoc Icon Fallback System with Lucide SVGs loaded!
    
    Test commands:
    • iconFallbackUtils.forceSvgMode() - Test SVG fallbacks
    • iconFallbackUtils.checkFontAwesome() - Check if Font Awesome loaded
    • iconFallbackUtils.listIcons() - See all icons on page
    • iconFallbackUtils.testReload() - Reload page for fresh test
    `);
})();

// ===========================
// Mobile Navigation Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ===========================
// Smooth Scrolling for Anchor Links
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===========================
// Navbar Background on Scroll
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// ===========================
// Animated Counter for Metrics
// ===========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// ===========================
// Intersection Observer for Animations
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For elements with animate-on-scroll class, add animate class
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animate');
                } else {
                    // For other elements, use direct style animation
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                // Animate metric values (only if not already animated)
                const metricValue = entry.target.querySelector('.metric-value');
                if (metricValue && !metricValue.dataset.animated) {
                    const target = parseInt(metricValue.textContent);
                    if (!isNaN(target)) {
                        metricValue.dataset.animated = 'true';
                        metricValue.textContent = '0';
                        setTimeout(() => animateCounter(metricValue, target), 300);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .metric-card, .feature-card, .solution-card, .member-card, .link-card');
    animatedElements.forEach(el => {
        // Only set styles for elements that don't have animate-on-scroll class
        if (!el.classList.contains('animate-on-scroll')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
});

// ===========================
// Form Validation (if forms exist)
// ===========================
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// ===========================
// Utility Functions
// ===========================

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Debounce function for search/input handlers
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================
// Dashboard Interactions
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Park selector change handler
    const parkSelect = document.getElementById('parkSelect');
    const timeRange = document.getElementById('timeRange');
    
    if (parkSelect) {
        parkSelect.addEventListener('change', function() {
            const selectedPark = this.value;
            updateDashboardData(selectedPark, timeRange ? timeRange.value : '24h');
        });
    }
    
    if (timeRange) {
        timeRange.addEventListener('change', function() {
            const selectedRange = this.value;
            updateDashboardData(parkSelect ? parkSelect.value : 'kelvingrove', selectedRange);
        });
    }
});

// Simulate dashboard data updates
function updateDashboardData(park, timeRange) {
    // This would normally fetch real data from an API
    console.log(`Updating dashboard for ${park} with time range ${timeRange}`);
    
    // Update metric cards with simulated data
    const metricCards = document.querySelectorAll('.metric-value');
    metricCards.forEach(card => {
        const currentValue = parseInt(card.textContent);
        const newValue = Math.floor(currentValue * (0.8 + Math.random() * 0.4));
        
        // Animate to new value
        card.style.opacity = '0.5';
        setTimeout(() => {
            animateCounter(card, newValue, 1000);
            card.style.opacity = '1';
        }, 200);
    });
    
    showNotification(`Dashboard updated for ${park}`);
}

// ===========================
// Video Placeholder Interactions
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            showNotification('Video placeholder clicked - replace with actual video embed', 'info');
        });
        
        placeholder.style.cursor = 'pointer';
    });
});

// ===========================
// Export/Print Functionality
// ===========================
function printPage() {
    window.print();
}

function exportToPDF() {
    showNotification('PDF export would be implemented here', 'info');
}

// ===========================
// Accessibility Improvements
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.feature-card, .link-card, .solution-card');
    
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Add aria-labels for icon-only buttons
    const iconButtons = document.querySelectorAll('button:not([aria-label]) i');
    iconButtons.forEach(icon => {
        const button = icon.closest('button');
        if (button && !button.hasAttribute('aria-label')) {
            button.setAttribute('aria-label', 'Button');
        }
    });
});

// ===========================
// Performance Optimization
// ===========================

// Lazy load images when they're implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when images are added
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===========================
// Analytics Placeholders
// ===========================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Analytics event:', { category, action, label });
}

// Track navigation clicks
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Navigation', 'Click', this.textContent.trim());
        });
    });
});

// ===========================
// Console Welcome Message
// ===========================
console.log(`
🦇 EcoNoc Glasgow Website
Built with HTML, CSS, and JavaScript
Singapore Institute of Technology - OIP Project 2025

For questions about this implementation, check the About Team page.
`);

// ===========================
// Development Helpers
// ===========================
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('🛠️ Development mode detected');
    
    // Add development helper styles
    const devStyles = document.createElement('style');
    devStyles.textContent = `
        .dev-info {
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            z-index: 10000;
        }
    `;
    document.head.appendChild(devStyles);
    
    // Show viewport info
    const devInfo = document.createElement('div');
    devInfo.className = 'dev-info';
    devInfo.textContent = `${window.innerWidth}x${window.innerHeight}`;
    document.body.appendChild(devInfo);
    
    window.addEventListener('resize', () => {
        devInfo.textContent = `${window.innerWidth}x${window.innerHeight}`;
    });
}

// ===========================
// Stage Detail Modals
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Get all phase markers with modal data attributes
    const phaseMarkers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.stage-modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Open modal when clicking phase marker
    phaseMarkers.forEach(marker => {
        marker.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                trackEvent('Design Journey', 'Modal Open', modalId);
                
                // Focus management for accessibility
                const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        });
    });

    // Close modal when clicking close button
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = this.closest('.stage-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                trackEvent('Design Journey', 'Modal Close', modal.id);
                
                // Return focus to the trigger element
                const triggerElement = document.querySelector(`[data-modal="${modal.id}"]`);
                if (triggerElement) {
                    triggerElement.focus();
                }
            }
        });
    });

    // Close modal when clicking backdrop
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
                trackEvent('Design Journey', 'Modal Close', this.id);
                
                // Return focus to the trigger element
                const triggerElement = document.querySelector(`[data-modal="${this.id}"]`);
                if (triggerElement) {
                    triggerElement.focus();
                }
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.stage-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = '';
                trackEvent('Design Journey', 'Modal Close', activeModal.id);
                
                // Return focus to the trigger element
                const triggerElement = document.querySelector(`[data-modal="${activeModal.id}"]`);
                if (triggerElement) {
                    triggerElement.focus();
                }
            }
        }
    });

    // Add hover effects to phase markers
    phaseMarkers.forEach(marker => {
        marker.style.cursor = 'pointer';
        marker.setAttribute('tabindex', '0');
        
        // Add keyboard navigation
        marker.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add ARIA labels for accessibility
        const modalId = marker.getAttribute('data-modal');
        if (modalId) {
            const stageNumber = modalId.replace('stage', '').replace('Modal', '');
            marker.setAttribute('aria-label', `View details for Stage ${stageNumber}`);
        }
    });
});

// ===========================
// Modal Content Enhancement
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to modal content
    const modalContents = document.querySelectorAll('.modal-content');
    modalContents.forEach(content => {
        content.style.scrollBehavior = 'smooth';
    });
    
    // Add copy functionality to code snippets in modals (if any)
    const codeBlocks = document.querySelectorAll('.stage-modal code');
    codeBlocks.forEach(code => {
        code.addEventListener('click', function() {
            copyToClipboard(this.textContent);
        });
        code.style.cursor = 'pointer';
        code.title = 'Click to copy';
    });
});

// ===========================
// Timeline Interaction Enhancements
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.design-timeline');
    
    if (timeline) {
        // Add progress indicator based on scroll position
        const updateTimelineProgress = debounce(() => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the timeline is visible
            let visibleRatio = 0;
            if (rect.top < windowHeight && rect.bottom > 0) {
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                visibleRatio = Math.max(0, Math.min(1, visibleHeight / rect.height));
            }
            
            // Update any progress indicators if they exist
            const progressIndicators = document.querySelectorAll('.timeline-progress');
            progressIndicators.forEach(indicator => {
                indicator.style.transform = `scaleY(${visibleRatio})`;
            });
        }, 10);
        
        window.addEventListener('scroll', updateTimelineProgress);
        updateTimelineProgress(); // Initial call
    }
});

// ===========================
// Image Modal Functionality
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalImageTitle = document.getElementById('modalImageTitle');
    const modalImageDescription = document.getElementById('modalImageDescription');
    const modalClose = document.querySelector('.image-modal-close');
    const modalBackdrop = document.querySelector('.image-modal-backdrop');
    const expandableImages = document.querySelectorAll('.expandable-image');

    // Image captions for different images
    const imageCaptions = {
        'lofi.jpg': {
            title: 'Initial Lo-fi Wireframe Sketches',
            description: 'Hand-drawn wireframes showing the initial dashboard layout concepts, navigation structure, and core user interface elements. These sketches explored different approaches to data visualization and user workflow patterns.'
        },
        'lofi2.jpg': {
            title: 'Detailed Mobile Interface Sketches',
            description: 'Continuation of the design process focusing on mobile-responsive layouts, detailed interaction flows, and stakeholder-specific interface adaptations. These sketches refined the user journey and information architecture.'
        },
        'brainstorming.jpg': {
            title: 'Collaborative Brainstorming Session',
            description: 'Whiteboard session capturing initial ideas, stakeholder needs mapping, and concept exploration for the bat conservation dashboard. This session helped identify key user needs and potential solution directions.'
        },
        'mindmap.jpg': {
            title: 'Mind Mapping & Brainstorming Session',
            description: 'Comprehensive mind mapping session exploring the central concept of "Bat Conservation Awareness Tool" with branches covering data collection, public engagement, volunteer usability, and council policy influence. This visual brainstorming helped identify connections between different stakeholder needs and solution approaches.'
        },
        'complexity-graph.jpg': {
            title: 'Technical Complexity vs Impact Analysis',
            description: 'Strategic decision framework plotting solution concepts based on technical complexity versus conservation impact. This analysis helped prioritize the real-time monitoring dashboard as our primary development focus, while identifying future enhancement opportunities.'
        },
        'complexity-value graph.jpg': {
            title: 'Technical Complexity vs Conservation Impact Matrix',
            description: 'Strategic evaluation matrix plotting various solution concepts based on their technical implementation complexity versus potential conservation impact. This framework guided our decision to prioritize the real-time monitoring dashboard while mapping out future development phases for more complex features like AR navigation and AI assistants.'
        }
    };

    function openImageModal(imageSrc, imageAlt) {
        const filename = imageSrc.split('/').pop();
        const caption = imageCaptions[filename];
        
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        
        if (caption) {
            modalImageTitle.textContent = caption.title;
            modalImageDescription.textContent = caption.description;
        } else {
            modalImageTitle.textContent = 'Lo-fi Wireframe Sketches';
            modalImageDescription.textContent = imageAlt;
        }
        
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        modalClose.focus();
    }

    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click handlers to expandable images
    expandableImages.forEach(imageFrame => {
        imageFrame.addEventListener('click', function() {
            const imageSrc = this.dataset.src;
            const imageAlt = this.dataset.alt;
            openImageModal(imageSrc, imageAlt);
        });

        // Add keyboard support
        imageFrame.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const imageSrc = this.dataset.src;
                const imageAlt = this.dataset.alt;
                openImageModal(imageSrc, imageAlt);
            }
        });

        // Make focusable for keyboard navigation
        imageFrame.setAttribute('tabindex', '0');
        imageFrame.setAttribute('role', 'button');
        imageFrame.setAttribute('aria-label', 'Click to enlarge image');
    });

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', closeImageModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeImageModal);
    }

    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        if (imageModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeImageModal();
            }
        }
    });

    // Prevent modal content clicks from closing the modal
    const modalContent = document.querySelector('.image-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

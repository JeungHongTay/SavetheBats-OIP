// ===========================
// Alternative Approaches Modal System
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalStatus = document.getElementById('modal-status');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    // Modal data
    const modalData = {
        'manual-surveys': {
            status: 'rejected',
            icon: 'fas fa-clipboard-list',
            title: 'Manual Bat Surveys',
            content: {
                approach: 'Traditional periodic bat counts conducted by researchers and volunteers using acoustic detectors during specific timeframes.',
                reasons: [
                    'Limited frequency of data collection (typically seasonal or annual)',
                    'High costs for specialized equipment and trained personnel',
                    'Subjective data quality dependent on researcher experience',
                    'No real-time insights for immediate conservation actions',
                    'Weather-dependent limitations affecting data consistency',
                    'Unable to capture 24/7 activity patterns throughout the year',
                    'Scalability issues for monitoring multiple park locations simultaneously'
                ]
            }
        },
        'lighting-guidelines': {
            status: 'rejected',
            icon: 'fas fa-file-alt',
            title: 'Static Lighting Guidelines',
            content: {
                approach: 'Fixed lighting regulations and policies without continuous monitoring or feedback mechanisms.',
                reasons: [
                    'No feedback loop to measure effectiveness of regulations',
                    'Cannot account for seasonal variations in bat behavior',
                    'Ignores local environmental conditions and microclimates',
                    'Lacks flexibility to adapt to changing urban development',
                    'No mechanism to assess compliance or enforcement',
                    'Unable to provide evidence-based policy adjustments',
                    'Missing data to justify lighting restrictions to stakeholders'
                ]
            }
        },
        'mobile-app': {
            status: 'rejected',
            icon: 'fas fa-mobile-alt',
            title: 'Mobile App Only',
            content: {
                approach: 'Smartphone application for data collection and dashboard viewing with community engagement features.',
                reasons: [
                    'Impractical to view complex dashboard data on small screens',
                    'Difficult to analyze comprehensive data trends and patterns on phones',
                    'Limited data export capabilities from mobile devices for reporting',
                    'Poor user experience for stakeholders reviewing detailed scientific reports',
                    'Inadequate for Glasgow City Council presentations and policy meetings',
                    'Community features would broaden scope beyond core monitoring objectives',
                    'Risk of diluting focus from essential bat conservation analytics',
                    'Professional stakeholders require desktop-class data visualization tools'
                ]
            }
        },
        'hybrid-approach': {
            status: 'accepted',
            icon: 'fas fa-cogs',
            title: 'Our Hybrid Approach',
            content: {
                approach: 'Comprehensive sensor network combined with web-based analytics dashboard and targeted community engagement features.',
                advantages: [
                    'Objective, continuous data collection through IoT sensors',
                    'Real-time monitoring and immediate alert capabilities',
                    'Professional stakeholder engagement through comprehensive dashboards',
                    'Scalable solution adaptable to multiple park locations',
                    'Evidence-based decision making for policy development',
                    'Cost-effective long-term monitoring infrastructure',
                    'Cross-platform accessibility for all stakeholder groups',
                    'Integration capabilities with existing Glasgow City Council systems'
                ]
            }
        }
    };

    // Add click listeners to alternative cards
    const alternativeCards = document.querySelectorAll('.alternative-card[data-modal]');
    alternativeCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = card.getAttribute('data-modal');
            openModal(modalId);
        });

        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const modalId = card.getAttribute('data-modal');
                openModal(modalId);
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to view detailed information');
    });

    // Open modal function
    function openModal(modalId) {
        const data = modalData[modalId];
        if (!data) return;

        // Update modal status
        modalStatus.className = `modal-status ${data.status}`;
        modalStatus.innerHTML = `
            <i class="fas fa-${data.status === 'rejected' ? 'times' : 'check'}-circle"></i>
            <span>${data.status === 'rejected' ? 'Rejected' : 'Selected'}</span>
        `;

        // Update modal icon
        modalIcon.innerHTML = `<i class="${data.icon}"></i>`;

        // Update modal title
        modalTitle.textContent = data.title;

        // Update modal content
        if (data.status === 'rejected') {
            modalContent.innerHTML = `
                <div class="modal-approach-detail">
                    <strong>Approach Considered:</strong>
                    <p>${data.content.approach}</p>
                </div>
                <div class="modal-reason">
                    <strong>Rejected because:</strong>
                    <ul>
                        ${data.content.reasons.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            modalContent.innerHTML = `
                <div class="modal-approach-detail">
                    <strong>Selected Approach:</strong>
                    <p>${data.content.approach}</p>
                </div>
                <div class="modal-advantages">
                    <strong>Key Advantages:</strong>
                    <ul>
                        ${data.content.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                    </ul>
                    <div class="advantage-tags-modal">
                        ${data.content.advantages.slice(0, 4).map(advantage => 
                            `<span class="advantage-tag-modal">✓ ${advantage.split(' ').slice(0, 2).join(' ')}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus trap
        modalClose.focus();
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modal event listeners
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard support for modal
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });
});

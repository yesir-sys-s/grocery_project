// Utility function to handle form submissions
function handleFormSubmission(formElement, event) {
    event.preventDefault();
    formElement.submit();
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Sortable for drag-and-drop
    if (document.querySelector('.list-group')) {
        new Sortable(document.querySelector('.list-group'), {
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: function() {
                // TODO: Add backend API call to save new order
                saveToLocalStorage();
            }
        });
    }

    // Initialize search functionality
    initSearch();

    // Form handling
    initFormValidation();
    initKeyboardShortcuts();
    initAutoSave();
    
    // Existing checkbox handling with error protection
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        if (!checkbox) return;
        
        checkbox.addEventListener('change', function() {
            const form = this.closest('form');
            if (!form) return;
            
            animateCompletion(this, () => form.submit());
        });
    });

    // Enhanced delete confirmation
    document.querySelectorAll('.btn-outline-danger').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
});

function initFormValidation() {
    const quickAddForm = document.querySelector('.quick-add-form');
    if (quickAddForm) {
        quickAddForm.addEventListener('submit', function(e) {
            const input = this.querySelector('input[name="name"]');
            if (!input.value.trim()) {
                e.preventDefault();
                input.classList.add('is-invalid');
                showToast('Please enter an item name', 'warning');
            }
        });

        // Auto-focus on quick add input
        const quickAddInput = quickAddForm.querySelector('input[name="name"]');
        quickAddInput?.focus();
    }
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            window.location.href = document.querySelector('a[href*="grocery-create"]').href;
        }
    });
}

function initAutoSave() {
    const forms = document.querySelectorAll('form:not(.quick-add-form)');
    forms.forEach(form => {
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', () => saveToLocalStorage());
        });
    });
}

function saveToLocalStorage() {
    const items = Array.from(document.querySelectorAll('.list-group-item')).map(item => ({
        id: item.dataset.id,
        name: item.querySelector('.form-check-label').textContent.trim(),
        completed: item.querySelector('.form-check-input').checked
    }));
    localStorage.setItem('groceryItems', JSON.stringify(items));
}

function animateCompletion(checkbox, callback) {
    if (!checkbox) return callback();
    
    const label = checkbox.closest('.list-group-item');
    if (!label) return callback();

    try {
        label.style.transition = 'opacity 0.3s ease';
        label.style.opacity = '0.5';
        
        setTimeout(() => {
            callback();
        }, 300);
    } catch (error) {
        console.warn('Animation failed:', error);
        callback();
    }
}

function handleDelete(e) {
    e.preventDefault();
    const item = this.closest('.list-group-item');
    const itemName = item.querySelector('.form-check-label').textContent.trim();

    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
        item.style.transition = 'all 0.3s ease';
        item.style.transform = 'translateX(100%)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = this.href;
        }, 300);
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast show position-fixed bottom-0 end-0 m-3 bg-${type}`;
    toast.innerHTML = `<div class="toast-body text-white">${message}</div>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchPreview = document.getElementById('searchPreview');
    const clearButton = document.getElementById('clearSearch');
    
    let selectedIndex = -1;
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const searchTerm = this.value.toLowerCase().trim();
            
            // Debounce search
            searchTimeout = setTimeout(() => {
                if (searchTerm.length >= 1) {
                    updateSearchPreview(searchTerm);
                    searchPreview.classList.remove('d-none');
                } else {
                    searchPreview.classList.add('d-none');
                }
                filterItems(searchTerm);
            }, 150);
        });

        // Clear search
        clearButton?.addEventListener('click', () => {
            searchInput.value = '';
            searchPreview.classList.add('d-none');
            filterItems('');
        });

        // Keyboard navigation
        searchInput.addEventListener('keydown', function(e) {
            const items = searchPreview.querySelectorAll('.search-preview-item');
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                    updateSelection(items);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    selectedIndex = Math.max(selectedIndex - 1, -1);
                    updateSelection(items);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (selectedIndex >= 0) {
                        items[selectedIndex].click();
                    }
                    break;
                case 'Escape':
                    searchPreview.classList.add('d-none');
                    selectedIndex = -1;
                    break;
            }
        });

        // Close search preview when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchPreview.contains(e.target)) {
                searchPreview.classList.add('d-none');
            }
        });
    }
}

function updateSearchPreview(searchTerm) {
    const searchPreview = document.getElementById('searchPreview');
    const items = Array.from(document.querySelectorAll('.list-group-item'));
    
    const matches = items
        .filter(item => {
            const itemName = item.querySelector('.form-check-label').textContent.toLowerCase();
            return itemName.includes(searchTerm);
        })
        .slice(0, 5); // Limit to 5 results

    const html = matches.map(item => {
        const name = item.querySelector('.form-check-label').textContent;
        
        return `
            <div class="search-preview-item" data-id="${item.dataset.id}">
                <div class="d-flex align-items-center">
                    <span class="me-2">${highlightText(name, searchTerm)}</span>
                </div>
            </div>
        `;
    }).join('');

    searchPreview.innerHTML = html || '<div class="p-3 text-muted text-center">No matches found</div>';
    
    // Add click handlers to preview items
    searchPreview.querySelectorAll('.search-preview-item').forEach(item => {
        item.addEventListener('click', () => {
            const targetItem = document.querySelector(`.list-group-item[data-id="${item.dataset.id}"]`);
            targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetItem.classList.add('highlight');
            setTimeout(() => targetItem.classList.remove('highlight'), 1500);
            searchPreview.classList.add('d-none');
        });
    });
}

function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function updateSelection(items) {
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

function filterItems(searchTerm) {
    const items = document.querySelectorAll('.list-group-item');
    let hasResults = false;

    items.forEach(item => {
        const itemName = item.querySelector('.form-check-label').textContent.toLowerCase();
        const matches = itemName.includes(searchTerm);
        
        if (matches) {
            item.style.display = '';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    updateNoResultsMessage(hasResults, searchTerm);
}

function updateNoResultsMessage(hasResults, searchTerm) {
    let noResults = document.querySelector('.no-results-message');
    if (!hasResults && searchTerm) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'alert alert-info no-results-message';
            noResults.innerHTML = '<i class="fas fa-search me-2"></i>No items found matching your search';
            document.querySelector('.list-group').appendChild(noResults);
        }
        noResults.style.display = '';
    } else if (noResults) {
        noResults.style.display = 'none';
    }
}

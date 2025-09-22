document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('contact-category');
    const contactForm = document.getElementById('contact-form');
    const customSubjectContainer = document.getElementById('custom-subject-container');
    const customSubjectInput = document.getElementById('custom-subject');

    if (!categorySelect || !customSubjectContainer || !customSubjectInput) {
        return;
    }

    // Load subjects from JSON
    fetch('data/subjects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(subjects => {
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.value;
                option.textContent = subject.text;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading contact subjects:', error);
        });

    // Show/hide custom subject field based on selection
    categorySelect.addEventListener('change', () => {
        const isOtherSelected = categorySelect.value === 'other';
        customSubjectContainer.style.display = isOtherSelected ? 'block' : 'none';
        customSubjectInput.required = isOtherSelected;
        if (!isOtherSelected) {
            customSubjectInput.value = ''; // Clear value when hidden
        }
    });

    // Handle form submission
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('.submit-button');
        const statusMessage = document.getElementById('form-status');

        // Show sending status
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        statusMessage.textContent = '';
        statusMessage.className = '';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // If category is not 'other', use the selected text as the subject
        if (data.category !== 'other') {
            const selectedOption = categorySelect.querySelector(`option[value="${data.category}"]`);
            data.subject = selectedOption ? selectedOption.textContent : '件名なし';
        }

        try {
            // Cloudflare Pages Functionsのエンドポイントを相対パスで指定
            const workerUrl = '/submit-contact';

            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`サーバーエラー: ${response.statusText}`);
            }

            // Workerからの応答を待つ必要がなければ、以下の行は不要です
            // const result = await response.json();

            statusMessage.textContent = 'お問い合わせありがとうございます。メッセージは正常に送信されました。';
            statusMessage.classList.add('status-success');
            contactForm.reset(); // Reset form fields
        } catch (error) {
            statusMessage.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
            statusMessage.classList.add('status-error');
            console.error('Form submission error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = '送信';
        }
    });
});
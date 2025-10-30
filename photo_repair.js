// DOM元素
const uploadArea = document.getElementById('upload-area');
const photoUpload = document.getElementById('photo-upload');
const uploadPreview = document.getElementById('upload-preview');
const previewImage = document.getElementById('preview-image');
const removePhotoBtn = document.getElementById('remove-photo');
const serviceSelection = document.getElementById('service-selection');
const submitRepairBtn = document.getElementById('submit-repair');
const paymentModal = document.getElementById('payment-modal');
const successModal = document.getElementById('success-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const paymentOptions = document.querySelectorAll('.payment-option');
const paymentQR = document.querySelector('.payment-qr');
const serviceType = document.getElementById('service-type');
const servicePrice = document.getElementById('service-price');
const closeSuccessBtn = document.getElementById('close-success');
const ctaButton = document.querySelector('.cta-button');

// 初始化
function init() {
    // 添加事件监听器
    uploadArea.addEventListener('click', () => photoUpload.click());
    photoUpload.addEventListener('change', handlePhotoUpload);
    removePhotoBtn.addEventListener('click', removePhoto);
    submitRepairBtn.addEventListener('click', showPaymentModal);
    ctaButton.addEventListener('click', scrollToUpload);
    
    // 关闭模态框
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentModal.style.display = 'none';
            successModal.style.display = 'none';
        });
    });
    
    // 支付选项
    paymentOptions.forEach(option => {
        option.addEventListener('click', handlePayment);
    });
    
    // 关闭成功提示
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        // 重置上传区域
        resetUploadArea();
    });
    
    // 服务选择变更
    const serviceRadios = document.querySelectorAll('input[name="service"]');
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', updateServiceSelection);
    });
    
    // 创建SVG图标
    createSVGIcons();
}

// 处理照片上传
function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        alert('请上传图片文件！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        previewImage.src = event.target.result;
        uploadPreview.style.display = 'block';
        uploadArea.style.display = 'none';
        serviceSelection.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// 移除照片
function removePhoto() {
    uploadPreview.style.display = 'none';
    uploadArea.style.display = 'block';
    serviceSelection.style.display = 'none';
    photoUpload.value = '';
}

// 更新服务选择
function updateServiceSelection() {
    const selectedService = document.querySelector('input[name="service"]:checked');
    const serviceName = selectedService.closest('.service-option').querySelector('.option-name').textContent;
    const serviceValue = selectedService.closest('.service-option').querySelector('.option-price').textContent;
    
    serviceType.textContent = serviceName;
    servicePrice.textContent = serviceValue;
}

// 显示支付模态框
function showPaymentModal() {
    updateServiceSelection();
    paymentModal.style.display = 'flex';
    paymentQR.style.display = 'none';
}

// 处理支付
function handlePayment(e) {
    const paymentType = e.currentTarget.getAttribute('data-type');
    
    // 显示支付二维码
    paymentQR.style.display = 'block';
    
    // 模拟支付成功
    setTimeout(() => {
        // 关闭支付弹窗
        paymentModal.style.display = 'none';
        
        // 显示成功提示
        successModal.style.display = 'flex';
    }, 3000);
}

// 滚动到上传区域
function scrollToUpload() {
    const uploadSection = document.getElementById('upload-section');
    uploadSection.scrollIntoView({ behavior: 'smooth' });
}

// 重置上传区域
function resetUploadArea() {
    uploadPreview.style.display = 'none';
    uploadArea.style.display = 'block';
    serviceSelection.style.display = 'none';
    photoUpload.value = '';
}

// 创建SVG图标
function createSVGIcons() {
    // 创建爪子图标SVG
    const pawIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="paw-icon" width="100%" height="100%">
        <path d="M256,224c-79.4,0-192,122.8-192,200.3C64,459.2,90.9,480,128,480s64-20.8,64-55.8c0-35.4,28.6-64.1,64-64.1s64,28.7,64,64.1c0,34.9,26.9,55.8,64,55.8s64-20.8,64-55.8C448,346.8,335.4,224,256,224z"/>
        <path d="M128,160c26.5,0,48-21.5,48-48c0-26.5-21.5-48-48-48S80,85.5,80,112C80,138.5,101.5,160,128,160z"/>
        <path d="M384,160c26.5,0,48-21.5,48-48c0-26.5-21.5-48-48-48s-48,21.5-48,48C336,138.5,357.5,160,384,160z"/>
        <path d="M176,96c26.5,0,48-21.5,48-48S202.5,0,176,0s-48,21.5-48,48S149.5,96,176,96z"/>
        <path d="M336,96c26.5,0,48-21.5,48-48S362.5,0,336,0s-48,21.5-48,48S309.5,96,336,96z"/>
    </svg>`;
    
    // 创建示例图片SVG
    const beforeAfterSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="100%" height="100%">
        <rect x="0" y="0" width="290" height="300" fill="#f0f0f0"/>
        <rect x="310" y="0" width="290" height="300" fill="#f0f0f0"/>
        <circle cx="145" cy="150" r="100" fill="#d0d0d0"/>
        <circle cx="455" cy="150" r="100" fill="#f48fb1"/>
        <path d="M145,80 C175,110 175,190 145,220 C115,190 115,110 145,80" fill="#a0a0a0"/>
        <path d="M455,80 C485,110 485,190 455,220 C425,190 425,110 455,80" fill="#bf5f82"/>
    </svg>`;
    
    // 创建示例图片
    const sampleImages = document.querySelectorAll('[src$=".svg"]');
    sampleImages.forEach(img => {
        if (img.src.includes('paw-icon')) {
            img.outerHTML = pawIcon;
        } else if (img.src.includes('before-after')) {
            img.outerHTML = beforeAfterSVG;
        } else if (img.src.includes('sample')) {
            // 创建示例图片
            const sampleSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" width="100%" height="100%">
                <rect width="100%" height="100%" fill="${img.src.includes('-before') ? '#d0d0d0' : '#f8bbd0'}"/>
                <circle cx="100" cy="75" r="50" fill="${img.src.includes('-before') ? '#a0a0a0' : '#f48fb1'}"/>
            </svg>`;
            img.outerHTML = sampleSVG;
        } else if (img.src.includes('avatar')) {
            // 创建头像
            const avatarSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
                <circle cx="50" cy="50" r="50" fill="#f8bbd0"/>
                <circle cx="50" cy="40" r="20" fill="#f48fb1"/>
                <path d="M25,85 C25,65 75,65 75,85" fill="#f48fb1"/>
            </svg>`;
            img.outerHTML = avatarSVG;
        } else if (img.src.includes('qr_code')) {
            // 创建二维码
            const qrSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
                <rect width="100%" height="100%" fill="#ffffff"/>
                <rect x="50" y="50" width="100" height="100" fill="#f48fb1"/>
                <rect x="70" y="70" width="60" height="60" fill="#ffffff"/>
                <rect x="80" y="80" width="40" height="40" fill="#f48fb1"/>
            </svg>`;
            img.outerHTML = qrSVG;
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
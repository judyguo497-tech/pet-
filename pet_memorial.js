// DOM元素
const petAvatar = document.getElementById('pet-avatar');
const petImage = document.getElementById('pet-image');
const photoUpload = document.getElementById('photo-upload');
const petNameInput = document.getElementById('pet-name');
const saveNameBtn = document.getElementById('save-name');
const greetingText = document.getElementById('greeting-text');
const chatMessages = document.getElementById('chat-messages');
const userMessageInput = document.getElementById('user-message');
const sendMessageBtn = document.getElementById('send-message');
const ownerPhotoInput = document.getElementById('owner-photo');
const generatePhotoBtn = document.getElementById('generate-photo');
const resultPhoto = document.getElementById('result-photo');
const mergedImage = document.getElementById('merged-image');
const downloadPhotoBtn = document.getElementById('download-photo');
const paymentModal = document.getElementById('payment-modal');
const closeModal = document.querySelector('.close-modal');
const paymentOptions = document.querySelectorAll('.payment-option');
const paymentQR = document.querySelector('.payment-qr');

// 默认宠物名称
let petName = '小狗';

// 宠物回复模板
const petResponses = [
    '主人，我好想你啊！',
    '汪汪，我爱你主人！',
    '主人，谢谢你一直记得我！',
    '我在彩虹桥等你，但不着急见面哦~',
    '主人，我在这里很开心，别担心我！',
    '汪汪！我永远是你最忠实的朋友！',
    '主人，你今天看起来真好看！',
    '我好想再尝尝你做的美食啊！',
    '主人，记得照顾好自己哦！',
    '汪汪，我永远在你心里陪着你！'
];

// 初始化
function init() {
    // 检查本地存储中是否有宠物信息
    const savedPetName = localStorage.getItem('petName');
    const savedPetImage = localStorage.getItem('petImage');
    
    if (savedPetName) {
        petName = savedPetName;
        petNameInput.value = savedPetName;
        updateGreeting();
    }
    
    if (savedPetImage) {
        petImage.src = savedPetImage;
    }
    
    // 添加事件监听器
    petAvatar.addEventListener('click', () => photoUpload.click());
    photoUpload.addEventListener('change', handlePetPhotoUpload);
    saveNameBtn.addEventListener('click', savePetName);
    sendMessageBtn.addEventListener('click', sendMessage);
    userMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    generatePhotoBtn.addEventListener('click', showPaymentModal);
    closeModal.addEventListener('click', closePaymentModal);
    downloadPhotoBtn.addEventListener('click', downloadMergedPhoto);
    
    // 支付选项事件
    paymentOptions.forEach(option => {
        option.addEventListener('click', handlePayment);
    });
}

// 处理宠物照片上传
function handlePetPhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        alert('请上传图片文件！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        petImage.src = event.target.result;
        // 保存到本地存储
        localStorage.setItem('petImage', event.target.result);
    };
    reader.readAsDataURL(file);
}

// 保存宠物名称
function savePetName() {
    const newName = petNameInput.value.trim();
    if (newName) {
        petName = newName;
        localStorage.setItem('petName', petName);
        updateGreeting();
        
        // 添加系统消息
        addMessage(`我的名字现在是 ${petName} 啦！谢谢主人~`, 'pet');
    }
}

// 更新问候语
function updateGreeting() {
    greetingText.textContent = `主人，我是${petName}，好想你！`;
}

// 发送消息
function sendMessage() {
    const message = userMessageInput.value.trim();
    if (!message) return;
    
    // 添加用户消息
    addMessage(message, 'user');
    userMessageInput.value = '';
    
    // 延迟后添加宠物回复
    setTimeout(() => {
        const response = getRandomResponse();
        addMessage(response, 'pet');
    }, 1000);
}

// 添加消息到聊天区域
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 获取随机宠物回复
function getRandomResponse() {
    const randomIndex = Math.floor(Math.random() * petResponses.length);
    return petResponses[randomIndex].replace('主人', `主人`);
}

// 显示支付弹窗
function showPaymentModal() {
    if (!ownerPhotoInput.files[0]) {
        alert('请先上传您的照片！');
        return;
    }
    
    paymentModal.style.display = 'flex';
    paymentQR.style.display = 'none';
}

// 关闭支付弹窗
function closePaymentModal() {
    paymentModal.style.display = 'none';
}

// 处理支付
function handlePayment(e) {
    const paymentType = e.currentTarget.getAttribute('data-type');
    
    // 显示支付二维码
    paymentQR.style.display = 'block';
    
    // 模拟支付成功
    setTimeout(() => {
        // 关闭支付弹窗
        closePaymentModal();
        
        // 模拟生成合影
        generateMergedPhoto();
    }, 3000);
}

// 生成合影（模拟）
function generateMergedPhoto() {
    // 在实际应用中，这里应该调用后端API进行图像处理
    // 这里我们只是模拟这个过程
    
    setTimeout(() => {
        // 使用一个示例图片作为合影结果
        mergedImage.src = 'https://placekitten.com/500/300';
        resultPhoto.style.display = 'block';
        
        // 添加系统消息
        addMessage('您的合影已生成，快看看吧！', 'pet');
    }, 2000);
}

// 下载合影
function downloadMergedPhoto() {
    // 创建一个链接并模拟点击下载
    const link = document.createElement('a');
    link.href = mergedImage.src;
    link.download = `与${petName}的合影.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 创建默认狗狗图片的SVG
function createDefaultDogImage() {
    // 创建一个简单的狗狗剪影SVG
    const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
        <rect width="100%" height="100%" fill="#e3f2fd"/>
        <path d="M256,128c-17.7,0-32,14.3-32,32v32h64v-32C288,142.3,273.7,128,256,128z" fill="#4a6fa5"/>
        <circle cx="224" cy="176" r="8" fill="#333"/>
        <circle cx="288" cy="176" r="8" fill="#333"/>
        <path d="M352,96c-17.7,0-32,14.3-32,32v32c0,53-43,96-96,96s-96-43-96-96v-32c0-17.7-14.3-32-32-32s-32,14.3-32,32v96c0,106,86,192,192,192s192-86,192-192V128C448,110.3,433.7,96,416,96H352z" fill="#4a6fa5"/>
        <path d="M256,288c-17.7,0-32-14.3-32-32h64C288,273.7,273.7,288,256,288z" fill="#333"/>
    </svg>`;
    
    // 创建Blob并生成URL
    const blob = new Blob([svgData], {type: 'image/svg+xml'});
    return URL.createObjectURL(blob);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 创建默认狗狗图片
    if (!localStorage.getItem('petImage')) {
        const defaultDogImage = createDefaultDogImage();
        petImage.src = defaultDogImage;
    }
    
    init();
});
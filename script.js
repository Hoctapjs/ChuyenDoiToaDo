document.getElementById('address-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const address = document.getElementById('address').value.trim();
    const resultElement = document.getElementById('result');
    const coordinatesElement = document.getElementById('coordinates');

    if (!address) {
        alert("Vui lòng nhập địa chỉ!");
        return;
    }

    const apiKey = 'c6ad9b2b1c5f49bf8ed10d0025586fd7'; // Thay YOUR_API_KEY bằng khóa API của bạn từ OpenCage Geocoder
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            coordinatesElement.textContent = `Vĩ độ: ${lat}, Kinh độ: ${lng}`;
        } else {
            coordinatesElement.textContent = "Không tìm thấy kết quả.";
        }

        resultElement.style.display = 'block';
    } catch (error) {
        coordinatesElement.textContent = "Đã xảy ra lỗi khi gọi API.";
        resultElement.style.display = 'block';
        console.error(error);
    }
});

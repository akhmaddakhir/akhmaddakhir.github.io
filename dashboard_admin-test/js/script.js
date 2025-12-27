// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminUser');
        window.location.href = 'login.html';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

function generateId() {
    return Date.now();
}

// ========================================
// DATA INITIALIZATION
// ========================================

function initializeData() {
    // Initialize Users if not exists
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                phone: '081234567890',
                role: 'Customer',
                status: 'Active'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '081234567891',
                role: 'Customer',
                status: 'Active'
            },
            {
                id: 3,
                name: 'Admin User',
                email: 'admin@resort.com',
                phone: '081234567892',
                role: 'Admin',
                status: 'Active'
            },
            {
                id: 4,
                name: 'Bob Johnson',
                email: 'bob@example.com',
                phone: '081234567893',
                role: 'Customer',
                status: 'Active'
            },
            {
                id: 5,
                name: 'Alice Brown',
                email: 'alice@example.com',
                phone: '081234567894',
                role: 'Manager',
                status: 'Active'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    // Initialize Resorts if not exists
    if (!localStorage.getItem('resorts')) {
        const defaultResorts = [
            {
                id: 1,
                name: 'Bali Beach Resort',
                location: 'Seminyak, Bali',
                price: 1500000,
                capacity: 4,
                rating: 4.8,
                status: 'Available',
                description: 'Resort mewah di tepi pantai dengan pemandangan sunset yang menakjubkan',
                facilities: 'WiFi, AC, TV, Kolam Renang, Restaurant, Spa'
            },
            {
                id: 2,
                name: 'Mountain View Villa',
                location: 'Ubud, Bali',
                price: 2000000,
                capacity: 6,
                rating: 4.9,
                status: 'Available',
                description: 'Villa dengan pemandangan gunung dan sawah yang indah',
                facilities: 'WiFi, AC, Kitchen, Garden, Parking, BBQ Area'
            },
            {
                id: 3,
                name: 'Tropical Paradise Inn',
                location: 'Gili Trawangan',
                price: 1200000,
                capacity: 2,
                rating: 4.7,
                status: 'Booked',
                description: 'Penginapan nyaman di pulau tropis',
                facilities: 'WiFi, AC, Beach Access, Snorkeling, Diving'
            },
            {
                id: 4,
                name: 'Sunrise Beach House',
                location: 'Sanur, Bali',
                price: 1800000,
                capacity: 5,
                rating: 4.6,
                status: 'Available',
                description: 'Beach house dengan akses langsung ke pantai',
                facilities: 'WiFi, AC, Kitchen, Private Beach, Kayak'
            },
            {
                id: 5,
                name: 'Jungle Retreat',
                location: 'Munduk, Bali',
                price: 1000000,
                capacity: 3,
                rating: 4.5,
                status: 'Maintenance',
                description: 'Penginapan di tengah hutan dengan suasana tenang',
                facilities: 'WiFi, Fireplace, Hiking Trail, Bird Watching'
            }
        ];
        localStorage.setItem('resorts', JSON.stringify(defaultResorts));
    }

    // Initialize Bookings if not exists
    if (!localStorage.getItem('bookings')) {
        const defaultBookings = [
            {
                id: 1,
                userId: 1,
                userName: 'John Doe',
                resortId: 1,
                resortName: 'Bali Beach Resort',
                checkIn: '2024-12-25',
                checkOut: '2024-12-28',
                guests: 2,
                totalPrice: 4500000,
                status: 'Confirmed',
                notes: 'Kamar dengan pemandangan laut'
            },
            {
                id: 2,
                userId: 2,
                userName: 'Jane Smith',
                resortId: 2,
                resortName: 'Mountain View Villa',
                checkIn: '2024-12-30',
                checkOut: '2025-01-03',
                guests: 4,
                totalPrice: 8000000,
                status: 'Pending',
                notes: 'Butuh tempat tidur tambahan untuk anak-anak'
            },
            {
                id: 3,
                userId: 1,
                userName: 'John Doe',
                resortId: 3,
                resortName: 'Tropical Paradise Inn',
                checkIn: '2024-11-15',
                checkOut: '2024-11-17',
                guests: 2,
                totalPrice: 2400000,
                status: 'Completed',
                notes: 'Booking selesai dengan baik'
            },
            {
                id: 4,
                userId: 4,
                userName: 'Bob Johnson',
                resortId: 4,
                resortName: 'Sunrise Beach House',
                checkIn: '2025-01-10',
                checkOut: '2025-01-15',
                guests: 5,
                totalPrice: 9000000,
                status: 'Confirmed',
                notes: 'Rencana liburan keluarga'
            },
            {
                id: 5,
                userId: 2,
                userName: 'Jane Smith',
                resortId: 1,
                resortName: 'Bali Beach Resort',
                checkIn: '2024-12-20',
                checkOut: '2024-12-22',
                guests: 2,
                totalPrice: 3000000,
                status: 'Cancelled',
                notes: 'Dibatalkan karena perubahan jadwal'
            }
        ];
        localStorage.setItem('bookings', JSON.stringify(defaultBookings));
    }

    // Initialize Interactions if not exists
    if (!localStorage.getItem('interactions')) {
        const defaultInteractions = [
            {
                id: 1,
                userId: 1,
                userName: 'John Doe',
                type: 'Review',
                message: 'Pengalaman menginap yang luar biasa! Resort sangat bersih dan staf sangat ramah. Pemandangan pantai dari kamar sangat indah. Highly recommended!',
                rating: 5,
                date: '2024-12-20',
                status: 'Reviewed',
                resortId: 1,
                resortName: 'Bali Beach Resort',
                response: 'Terima kasih atas ulasan positifnya! Kami senang Anda menikmati menginap di resort kami.'
            },
            {
                id: 2,
                userId: 2,
                userName: 'Jane Smith',
                type: 'Complaint',
                message: 'AC di kamar tidak berfungsi dengan baik pada malam pertama. Sangat panas dan tidak nyaman untuk tidur. Mohon segera diperbaiki.',
                rating: 2,
                date: '2024-12-19',
                status: 'Resolved',
                resortId: 2,
                resortName: 'Mountain View Villa',
                response: 'Mohon maaf atas ketidaknyamanannya. AC sudah kami perbaiki dan sudah berfungsi normal kembali. Kami juga memberikan kompensasi diskon untuk menginap berikutnya.'
            },
            {
                id: 3,
                userId: 1,
                userName: 'John Doe',
                type: 'Feedback',
                message: 'Saran untuk resort: tolong tambahkan menu vegetarian di restaurant. Akan lebih baik jika ada pilihan makanan yang lebih beragam.',
                rating: 4,
                date: '2024-12-18',
                status: 'Reviewed',
                resortId: 1,
                resortName: 'Bali Beach Resort',
                response: 'Terima kasih atas sarannya! Kami akan menambahkan menu vegetarian dalam waktu dekat.'
            },
            {
                id: 4,
                userId: 4,
                userName: 'Bob Johnson',
                type: 'Message',
                message: 'Apakah bisa request early check-in untuk tanggal 10 Januari? Pesawat kami tiba pagi hari.',
                rating: null,
                date: '2024-12-21',
                status: 'Pending',
                resortId: 4,
                resortName: 'Sunrise Beach House',
                response: ''
            },
            {
                id: 5,
                userId: 2,
                userName: 'Jane Smith',
                type: 'Review',
                message: 'Vila yang sangat bagus dengan view sawah yang menakjubkan. Suasana sangat tenang dan cocok untuk relaksasi. Staf sangat membantu.',
                rating: 5,
                date: '2024-12-17',
                status: 'Reviewed',
                resortId: 2,
                resortName: 'Mountain View Villa',
                response: 'Senang mendengar Anda menikmati menginap di vila kami. Terima kasih!'
            }
        ];
        localStorage.setItem('interactions', JSON.stringify(defaultInteractions));
    }
}

// Initialize data when script loads
initializeData();

// ========================================
// LOCAL STORAGE HELPERS
// ========================================

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function addItem(key, item) {
    const data = getData(key);
    data.push(item);
    setData(key, data);
}

function updateItem(key, id, updatedItem) {
    const data = getData(key);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedItem;
        setData(key, data);
        return true;
    }
    return false;
}

function deleteItem(key, id) {
    const data = getData(key);
    const filtered = data.filter(item => item.id !== id);
    setData(key, filtered);
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.textContent = message;
    
    // Style
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.zIndex = '9999';
    notification.style.fontSize = '14px';
    notification.style.fontWeight = '600';
    notification.style.minWidth = '250px';
    notification.style.animation = 'slideInRight 0.3s ease';
    
    // Type-specific colors
    if (type === 'success') {
        notification.style.background = '#27ae60';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#e74c3c';
        notification.style.color = 'white';
    } else if (type === 'warning') {
        notification.style.background = '#f39c12';
        notification.style.color = 'white';
    } else {
        notification.style.background = '#3498db';
        notification.style.color = 'white';
    }
    
    // Append to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// VALIDATION HELPERS
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,13}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
}

function validateRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

// ========================================
// SEARCH AND FILTER HELPERS
// ========================================

function searchInArray(array, searchTerm, fields) {
    const term = searchTerm.toLowerCase();
    return array.filter(item => {
        return fields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(term);
        });
    });
}

function filterByField(array, field, value) {
    if (!value) return array;
    return array.filter(item => item[field] === value);
}

// ========================================
// EXPORT AND IMPORT FUNCTIONS
// ========================================

function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        alert('Tidak ada data untuk diekspor');
        return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') 
                ? `"${value}"` 
                : value;
        }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportToJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ========================================
// STATISTICS CALCULATIONS
// ========================================

function calculateStatistics() {
    const users = getData('users');
    const resorts = getData('resorts');
    const bookings = getData('bookings');
    const interactions = getData('interactions');
    
    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === 'Active').length,
        totalResorts: resorts.length,
        availableResorts: resorts.filter(r => r.status === 'Available').length,
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter(b => b.status === 'Confirmed').length,
        pendingBookings: bookings.filter(b => b.status === 'Pending').length,
        totalRevenue: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        totalInteractions: interactions.length,
        averageRating: 0
    };
    
    const reviews = interactions.filter(i => i.rating);
    if (reviews.length > 0) {
        stats.averageRating = reviews.reduce((sum, i) => sum + i.rating, 0) / reviews.length;
    }
    
    return stats;
}

// ========================================
// PRINT FUNCTION
// ========================================

function printReport(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Report</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// ========================================
// CONSOLE LOG (FOR DEBUGGING)
// ========================================

console.log('Admin Dashboard Script Loaded Successfully');
console.log('Current Statistics:', calculateStatistics());
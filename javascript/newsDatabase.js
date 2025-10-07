// newsDatabase.js - Database berita dalam bentuk array
const newsDatabase = [
    {
        id: 1,
        title: "Krakatau Steel Mendapat Keringanan Utang dari 4 Bank Swasta",
        category: "Bisnis",
        date: "2025-10-7",
        time: "9 menit yang lalu",
        image: "../Pictures/searchpage/gmbr1.jpg"
    },
    {
        id: 2,
        title: "Bagaimana Dampak Kelangkaan BBM di SPBU Swasta terhadap Iklim Investasi",
        category: "Bisnis",
        date: "2025-10-7",
        time: "10 menit yang lalu",
        image: "../Pictures/searchpage/gmbr2.jpg"
    },
    {
        id: 3,
        title: "The Papandayan Jazz Fest 2025 Sukses Digelar",
        category: "Event",
        date: "2025-10-7",
        time: "1 jam yang lalu",
        image: "../Pictures/searchpage/gmbr3.jpg"
    },
    {
        id: 4,
        title: "KPK Periksa Dewan Pembina Gaphura dalam Kasus Kuota Haji",
        category: "Hukum",
        date: "2025-10-7",
        time: "1 jam yang lalu",
        image: "../Pictures/searchpage/gmbr4.jpg"
    },
    {
        id: 5,
        title: "Nonton Rangga & Cinta Sambil Belajar Sejarah Reformasi",
        category: "Entertainment",
        date: "2025-10-7",
        time: "2 jam yang lalu",
        image: "../Pictures/searchpage/gmbr5.jpg"
    },
    {
        id: 6,
        title: "Dana Reses Anggota DPR Dikabarkan Naik Menjadi Rp 756 Juta",
        category: "Politik",
        date: "2025-10-7",
        time: "4 jam yang lalu",
        image: "../Pictures/searchpage/gmbr6.jpg"
    },
    {
        id: 7,
        title: "Kementerian Investasi: Belum Ada Perusahaan yang Minat Lanjutkan Proyek DME",
        category: "Bisnis",
        date: "2025-10-7",
        time: "4 jam yang lalu",
        image: "../Pictures/searchpage/gmbr7.jpg"
    },
    {
        id: 8,
        title: "Menko Airlangga: Bankir Panas Dingin Usai Dapat Tambahan Dana Rp 200 Triliun",
        category: "Bisnis",
        date: "2025-10-7",
        time: "5 jam yang lalu",
        image: "../Pictures/searchpage/gmbr8.jpg"
    },
    {
        id: 9,
        title: "Marc Marquez Fokus Pemulihan, Absen di MotoGP Australia dan Malaysia",
        category: "Olahraga",
        date: "2025-10-7",
        time: "6 jam yang lalu",
        image: "../Pictures/searchpage/gmbr9.jpg"
    },
    {
        id: 10,
        title: "Gubernur Pramono Anung Bakal Terbitkan Obligasi Daerah",
        category: "Bisnis",
        date: "2025-10-7",
        time: "6 jam yang lalu",
        image: "../Pictures/searchpage/gmbr10.jpg"
    },
    {
        id: 11,
        title: "Shutdown AS Belum Ada Jalan Keluar, Gedung Putih Ancam PHK Massal",
        category: "Internasional",
        date: "2025-10-7",
        time: "9 jam yang lalu",
        image: "../Pictures/searchpage/gmbr11.jpg"
    },
    {
        id: 12,
        title: "PT Timah Penuhi Tuntutan Penambang Naikkan Harga Timah",
        category: "Bisnis",
        date: "2025-10-6",
        time: "1 hari yang lalu",
        image: "../Pictures/searchpage/gmbr12.jpg"
    },
    {
        id: 13,
        title: "Lomba Marathon eL Run 2025 di Bandung Berlangsung Meriah",
        category: "Event",
        date: "2025-10-6",
        time: "1 hari yang lalu",
        image: "../Pictures/searchpage/gmbr13.jpg"
    },
    {
        id: 14,
        title: "Headset XR Android Pertama Samsung Meluncur Akhir Oktober",
        category: "Teknologi",
        date: "2025-10-6",
        time: "1 hari yang lalu",
        image: "../Pictures/searchpage/gmbr14.jpg"
    },
    {
        id: 15,
        title: "Pakai Deepfake Wajah Supermodel, Sindikat Penipu Raup Rp64 Milir",
        category: "Teknologi",
        date: "2025-10-6",
        time: "1 hari yang lalu",
        image: "../Pictures/searchpage/gmbr15.jpeg"
    },
    {
        id: 16,
        title: "Prabowo Perintahkan TNI Ikuti Perkembangan Teknologi dan AI",
        category: "Politik",
        date: "2025-10-5",
        time: "2 hari yang lalu",
        image: "../Pictures/searchpage/gmbr16.jpg"
    },
    {
        id: 17,
        title: "Hasil Balapan MotoGP Indonesia 2025: Fermin Aldeguer Jadi Pemenang, Marc Marquez Gagal Finis",
        category: "Olahraga",
        date: "2025-10-5",
        time: "2 hari yang lalu",
        image: "../Pictures/searchpage/gmbr17.jpg"
    },
    {
        id: 18,
        title: "Pertamina Akan Gunakan 100 Ribu Barel BBM Impor jika SPBU Swasta Ogah Beli",
        category: "Bisnis",
        date: "2025-10-5",
        time: "2 hari yang lalu",
        image: "../Pictures/searchpage/gmbr18.jpg"
    },
    {
        id: 19,
        title: "Seluk-beluk Tunjangan Pensiun untuk Mantan Anggota DPR",
        category: "Politik",
        date: "2025-10-4",
        time: "3 hari yang lalu",
        image: "../Pictures/searchpage/gmbr19.jpg"
    },
    {
        id: 20,
        title: "Luhut: Penyerapan Anggaran MBG Sudah Baik, Tak Perlu Ditarik",
        category: "Bisnis",
        date: "2025-10-3",
        time: "4 hari yang lalu",
        image: "../Pictures/searchpage/gmbr20.jpg"
    },
    {
        id: 21,
        title: "IHSG Akhir Pekan Ditutup Menguat seiring Bursa Kawasan Asia",
        category: "Bisnis",
        date: "2025-10-3",
        time: "4 hari yang lalu",
        image: "../Pictures/searchpage/gmbr21.jpg"
    },
    {
        id: 22,
        title: "Ini Target Innovillage 2025 Telkom University, Ada Tema Adopsi AI",
        category: "Teknologi",
        date: "2025-10-2",
        time: "5 hari yang lalu",
        image: "../Pictures/searchpage/gmbr22.jpg"
    },
    {
        id: 23,
        title: "SpaceX Targetkan Peluncuran Starship Ke-11 Pertengahan Oktober",
        category: "Teknologi",
        date: "2025-10-1",
        time: "6 hari yang lalu",
        image: "../Pictures/searchpage/gmbr23.jpg"
    },
    {
        id: 24,
        title: "Danantara Berencana Merger 16 BUMN Asuransi Menjadi 3",
        category: "Bisnis",
        date: "2025-09-30",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr24.jpg"
    },
    {
        id: 25,
        title: "Prediksi Chelsea vs Benfica di Liga Champions Malam Ini",
        category: "Olahraga",
        date: "2025-09-30",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr25.jpg"
    },
    {
        id: 26,
        title: "Tancap Gas Revisi Undang-Undang Sektor Keuangan",
        category: "Ekonomi",
        date: "2025-09-30",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr26.jpg"
    },
    {
        id: 27,
        title: "Airlangga Mendukung Purbaya Tak Menaikkan Cukai Rokok Tahun Depan",
        category: "Bisnis",
        date: "2025-09-30",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr27.jpg"
    },
    {
        id: 28,
        title: "Trump Tawarkan 21 Poin Rencana Perdamaian Gaza, Apa Isinya?",
        category: "Internasional",
        date: "2025-09-29",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr28.jpg"
    },
    {
        id: 29,
        title: "Aktivitas Gunung Burni Telong Meningkat, Statusnya Jadi Waspada",
        category: "Lingkungan",
        date: "2025-09-28",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr29.jpg"
    },
    {
        id: 30,
        title: "Tindak Lanjut Kasus Keracunan MBG, Pemerintah Tutup Dapur Bermasalah",
        category: "Bisnis",
        date: "2025-09-28",
        time: "1 minggu yang lalu",
        image: "../Pictures/searchpage/gmbr30.jpg"
    }
];
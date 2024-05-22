// Veri bitlerinin uzunluğuna göre parite bitlerinin sayısını hesaplar
function hesaplaPariteBitleri(veriBitleri) {
    let n = veriBitleri.length;
    let r = 0;
    // Parite bitleri, veri bitlerinin sayısına ve kendilerinin sayısına bağlı olarak hesaplanır.
    // Her bir parite biti, bir önceki parite bitinin iki katıdır ve toplam bit sayısını aşana kadar devam eder.
    while (Math.pow(2, r) < (n + r + 1)) {
        r++;
    }
    return r;
}

// Hamming kodunu üretir
function hammingKoduUret() {
    let veriBitleri = document.getElementById("veriGirdisi").value;
    let n = veriBitleri.length;
    let r = hesaplaPariteBitleri(veriBitleri);
    let hammingKodu = Array(n + r).fill(0);

    let j = 0;
    let k = 0;
    // Veri bitleri ve parite bitleri sırasıyla hamming koduna yerleştirilir.
    for (let i = 1; i <= n + r; i++) {
        if (Math.pow(2, j) == i) {
            // Eğer i, 2'nin bir katıysa, bu bir parite pozisyonudur ve bu pozisyona 0 yerleştirilir.
            hammingKodu[i - 1] = 0;
            j++;
        } else {
            // Veri bitleri doğrudan veri bitleri dizisinden alınır.
            hammingKodu[i - 1] = parseInt(veriBitleri[k]);
            k++;
        }
    }

    // Parite bitleri hesaplanır ve ilgili pozisyonlara yerleştirilir.
    for (let i = 0; i < r; i++) {
        let paritePos = Math.pow(2, i);
        let parite = 0;
        for (let j = 1; j <= hammingKodu.length; j++) {
            if ((j & paritePos) == paritePos) {
                parite = parite ^ hammingKodu[j - 1];
            }
        }
        hammingKodu[paritePos - 1] = parite;
    }

    // Hamming kodu çıktı olarak gösterilir.
    document.getElementById("hammingKoduCikti").innerText = "Hamming Kodu: " + hammingKodu.join('');
}

// Rastgele bir hata ekler
function hataEkle() {
    let hammingKodu = document.getElementById("hammingKoduCikti").innerText.split(": ")[1];
    let hataPos = Math.floor(Math.random() * hammingKodu.length);
    // Rastgele seçilen bir pozisyondaki bit, hata eklenerek değiştirilir.
    hammingKodu = hammingKodu.split('');
    hammingKodu[hataPos] = hammingKodu[hataPos] == '0' ? '1' : '0';
    // Hatalı kod, kullanıcıya gösterilir.
    document.getElementById("yanlisKodCikti").innerText = "Yanlış Kod: " + hammingKodu.join('');
}

// Hata tespit ve düzeltme işlemini yapar
function hataTespitVeDuzelt() {
    let hammingKodu = document.getElementById("yanlisKodCikti").innerText.split(": ")[1];
    let n = hammingKodu.length;
    let r = hesaplaPariteBitleri(hammingKodu);
    let hataPos = 0;

    // Hatanın pozisyonu hesaplanır.
    for (let i = 0; i < r; i++) {
        let paritePos = Math.pow(2, i);
        let parite = 0;
        for (let j = 1; j <= n; j++) {
            if ((j & paritePos) == paritePos) {
                parite = parite ^ parseInt(hammingKodu[j - 1]);
            }
        }
        if (parite != 0) {
            hataPos += paritePos;
        }
    }

    // Hata tespit edilirse, kod düzeltilir ve düzeltilmiş kod gösterilir.
    if (hataPos != 0) {
        alert(`Hata ${hataPos} pozisyonunda tespit edildi`);
        hammingKodu = hammingKodu.split('');
        hammingKodu[hataPos - 1] = hammingKodu[hataPos - 1] == '0' ? '1' : '0';
        hammingKodu = hammingKodu.join('');
        document.getElementById("duzeltilmisKodCikti").innerText = "Düzeltme Kodu: " + hammingKodu;
    } else {
        // Hata tespit edilmezse, kullanıcıya bilgi verilir.
        alert("Hata tespit edilmedi");
    }
}

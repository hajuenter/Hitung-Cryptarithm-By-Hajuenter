function solveCryptarithm() {
    const cryptarithm = document.getElementById('cryptarithm').value;

    // Membersihkan input dan memisahkan kata-kata
    const words = cryptarithm.replace(/[^A-Z+=]/g, '').split(/[^A-Z]+/);
    const uniqueChars = Array.from(new Set(words.join('')));

    if (uniqueChars.length > 10) {
        document.getElementById('result').innerText = "Terlalu banyak huruf unik untuk diselesaikan dengan digit.";
        return;
    }

    const charToDigit = {};
    const usedDigits = new Array(10).fill(false);

    // Fungsi untuk mengkonversi kata menjadi angka
    function wordToNumber(word) {
        return parseInt(word.split('').map(char => charToDigit[char]).join(''));
    }

    // Backtracking untuk mencoba setiap kemungkinan
    function backtrack(index) {
        if (index === uniqueChars.length) {
            const sumWords = words.slice(0, -1);
            const resultWord = words[words.length - 1];

            const sum = sumWords.reduce((acc, word) => acc + wordToNumber(word), 0);
            if (sum === wordToNumber(resultWord)) {
                document.getElementById('result').innerText = `Solusi: ${Object.entries(charToDigit).map(([char, digit]) => `${char}=${digit}`).join(', ')}`;
                return true;
            }
            return false;
        }

        const char = uniqueChars[index];
        for (let digit = 0; digit < 10; digit++) {
            if (!usedDigits[digit]) {
                charToDigit[char] = digit;
                usedDigits[digit] = true;

                if (backtrack(index + 1)) {
                    return true;
                }

                delete charToDigit[char];
                usedDigits[digit] = false;
            }
        }

        return false;
    }

    if (!backtrack(0)) {
        document.getElementById('result').innerText = "Tidak ada solusi yang ditemukan.";
    }
}
function resetForm() {
    document.getElementById('result').innerText = "";
}

# Savol yozish bo'yicha ish tartibi (sub-agentlar uchun)

Rol: test tuzuvchi, parazitologiya bo'yicha shifokor. Til: o'zbek (lotin). Kirill harf ishlatilmaydi.

## Fayllar
- Mavzu matni: `_build/txt/NNN.txt` (faqat shu matndan foydalaniladi; "Foydalanilgan adabiyotlar" qismidan emas).
- Natija: `_build/questions/NNN-MMM.json` (bir faylda 3 ta ketma-ket mavzu, masalan `062-064.json`).
- Namuna: `_build/questions/059-061.json` (formatni ko'ring).
- Tekshiruv (faqat bitta fayl): `bash _build/chk1.sh questions/NNN-MMM.json` (`cwd` = `_build`). Xato 0 bo'lishi shart: `QA xatolari: 0 fayl`.
- Variantni oldindan tekshirish: `node ck.js NNN "variant 1" "variant 2"` (cwd = `_build`) — har bir variant uchun mavzuda bor so'zlar foizini ko'rsatadi; 70% dan kam bo'lsa ishlatmang.
- Indeks bo'yicha tuzatish: `echo '[["NNN",indeks,{"c":"...","w":["..",".."]}],["NNN",indeks,{"w1":[2,"yangi variant"]}]]' | node patch.js questions/NNN-MMM.json` (indeks 0 dan; QA dagi S7 = indeks 6; `w1:[i,"matn"]` faqat i-noto'g'ri javobni almashtiradi). Yoki faylni to'liq qayta yozing.

## JSON format
```
{ "NNN": [ {"q":"... ?","c":"to'g'ri javob","w":["x1","x2","x3","x4"],"x":"«matndan AYNAN iqtibos»"}, ... 10 ta ], "MMM": [...] }
```
Har mavzuga aynan 10 ta savol.

## Qat'iy qoidalar (build_tests.js tekshiradi)
1. `q` `?` bilan tugaydi. `w` — aynan 4 ta. 5 variant takrorlanmaydi.
2. Har bir variant (c va w) so'zlarining ≥70% i (3+ harfli so'zlar, birinchi 5 harf bo'yicha) shu mavzu matnida bo'lishi kerak. **Boshqa mavzudan so'z olmang** (masalan leyshmanioz mavzusida "bezgak", "askarida", "xlorofos" kabi so'zlar matnda bo'lmasa — xato). Eng ko'p xato: matnda yo'q fe'l shakllari (`tuzadi`, `oshiriladi`, `bildiradi`, `orqali`, `kuni`, `hafta`), raqam+so'z (`14 kun` — "kun" matnda bo'lmasa), joy nomlari.
3. Variant oxiri `va, yoki, bilan, uchun, ham, kabi, ga, da, dan, ni, ammo, lekin, esa, hamda` bilan tugamasin; vergul/tire bilan tugamasin. "...bo'lgani uchun" XATO → "...bo'lgani sababli".
4. Faqat raqam/qisqa so'zdan iborat variant ("50 mg", "8 kun") bo'sh hisoblanadi → "kuniga 50 mg", "8 kundan keyin" kabi yozing (so'zlar matnda bo'lsin).
5. Taqiqlangan so'zlar savol va variantlarda: darslik, kitob, taqdimot, slayd, manbada, manbalar, deyilgan, ko'rsatilgan, qayd etilgan, tasdiqlanmagan, muallif, buyruq, buyrug'i, prezentatsiya, kutubxona, yo'riqnoma, qo'llanma (shu jumladan `qo'llanmaydi` ham!). Shablon so'zlar variantlarda: xolos, shu, tez, odatiy.
6. `x` — faqat « » ichidagi iqtibos, matnda AYNAN bor (tinish belgilari bilan), kamida 20 belgi, ichida yana « » bo'lmasin (bo'lsa, iqtibosni qisqartiring). Iqtibos to'g'ri javob so'zlarining ≥50% ini o'z ichiga olsin. Iqtibosning o'zida ham taqiqlangan so'z bo'lmasin (masalan "ko'rsatilgan", "qayd etilgan", "yo'riqnoma" bo'lmagan jumla bo'lagini tanlang).
7. To'g'ri javob eng uzun noto'g'ri javobdan >30% uzun bo'lmasin (belgilar soni). Qisqa to'g'ri javob + uzunroq noto'g'ri javoblar yozing.
8. Noto'g'ri javoblardan `Faqat/Hech/Umuman/Barcha` bilan boshlanadigani ko'pi bilan 1 ta; 3 ta noto'g'ri javob bir xil so'z bilan boshlanmasin (to'g'ri javobning birinchi so'zi bundan mustasno).
9. Mazmun: savol mavzudagi asosiy tushunchani so'raydi (ta'rif, sabab, belgi, usul, me'yor, raqam). Noto'g'ri javoblar ham shu mavzu matnidagi tushunchalardan (boshqa raqam, boshqa tur, boshqa bosqich, boshqa muddat) — savolga javob bo'la oladigan, lekin noto'g'ri. Matnda yo'q faktni o'ylab topmang. To'g'ri javob matnga mos bo'lsin. `[tasdiqlanmagan]` faktlar to'g'ri javob bo'lmaydi.
10. Bir mavzuda bir xil variant matni 3 va undan ko'p savolda takrorlanmasin.

## Ish tartibi
1. Mavzu matnini o'qing: `sed '/^Foydalanilgan adabiyotlar/,$d' txt/NNN.txt`.
2. 3 mavzu uchun JSON yozing, `chk1.sh` bilan tekshiring, xatolarni tuzating, 0 xato bo'lguncha takrorlang.
3. Keyingi 3 mavzuga o'ting. Boshqa sub-agentlarning fayllariga tegmang. `git` buyruqlarini ishlatmang.

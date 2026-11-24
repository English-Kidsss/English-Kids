// =====================================
// 1. تنظیمات و تلفظ کلمات
// =====================================

function speakWord(word) {
    if (!("speechSynthesis" in window)) {
        alert("مرورگر شما از پخش گفتار پشتیبانی نمی‌کند.");
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.pitch = 1.1;

    window.speechSynthesis.speak(utterance);
}


// =====================================
// 2. نمایش بخش آموزشی انتخاب‌شده
// =====================================

function showLearningSection(sectionId) {

    const sections = [
        "alphabet-section",
        "animals-section",
        "fruits-section",
        "colors-section"
    ];

    sections.forEach(id => {

        const section = document.getElementById(id);

        if (section) {
            section.style.display = "none";
        }
    });

    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {

        if (
            sectionId === "animals-section" ||
            sectionId === "fruits-section" ||
            sectionId === "colors-section"
        ) {
            selectedSection.style.display = "grid";
        } else {
            selectedSection.style.display = "block";
        }

        selectedSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function startLearning() {
    openAlphabet();
}

// =====================================
// 3. اطلاعات حروف انگلیسی
// =====================================

const alphabetData = [
    { letter: "A", word: "Apple", meaning: "سیب", sound: "اَپِل", emoji: "🍎" },
    { letter: "B", word: "Ball", meaning: "توپ", sound: "بال", emoji: "⚽" },
    { letter: "C", word: "Cat", meaning: "گربه", sound: "کَت", emoji: "🐱" },
    { letter: "D", word: "Dog", meaning: "سگ", sound: "داگ", emoji: "🐶" },
    { letter: "E", word: "Elephant", meaning: "فیل", sound: "اِلِفِنت", emoji: "🐘" },
    { letter: "F", word: "Fish", meaning: "ماهی", sound: "فیش", emoji: "🐟" },
    { letter: "G", word: "Giraffe", meaning: "زرافه", sound: "جِراف", emoji: "🦒" },
    { letter: "H", word: "House", meaning: "خانه", sound: "هاوس", emoji: "🏠" },
    { letter: "I", word: "Ice cream", meaning: "بستنی", sound: "آیس کریم", emoji: "🍦" },
    { letter: "J", word: "Juice", meaning: "آبمیوه", sound: "جوس", emoji: "🧃" },
    { letter: "K", word: "Kite", meaning: "بادبادک", sound: "کایت", emoji: "🪁" },
    { letter: "L", word: "Lion", meaning: "شیر", sound: "لایِن", emoji: "🦁" },
    { letter: "M", word: "Monkey", meaning: "میمون", sound: "مانکی", emoji: "🐵" },
    { letter: "N", word: "Nose", meaning: "بینی", sound: "نوز", emoji: "👃" },
    { letter: "O", word: "Orange", meaning: "پرتقال", sound: "اُرِنج", emoji: "🍊" },
    { letter: "P", word: "Pencil", meaning: "مداد", sound: "پِنسِل", emoji: "✏️" },
    { letter: "Q", word: "Queen", meaning: "ملکه", sound: "کوئین", emoji: "👑" },
    { letter: "R", word: "Rabbit", meaning: "خرگوش", sound: "رَبیت", emoji: "🐰" },
    { letter: "S", word: "Sun", meaning: "خورشید", sound: "سان", emoji: "☀️" },
    { letter: "T", word: "Tiger", meaning: "ببر", sound: "تایگِر", emoji: "🐯" },
    { letter: "U", word: "Umbrella", meaning: "چتر", sound: "آمبرلا", emoji: "☂️" },
    { letter: "V", word: "Van", meaning: "ون", sound: "وَن", emoji: "🚐" },
    { letter: "W", word: "Water", meaning: "آب", sound: "واتِر", emoji: "💧" },
    { letter: "X", word: "X-ray", meaning: "عکس رادیولوژی", sound: "اِکس رِی", emoji: "🩻" },
    { letter: "Y", word: "Yo-yo", meaning: "یویو", sound: "یو یو", emoji: "🪀" },
    { letter: "Z", word: "Zebra", meaning: "گورخر", sound: "زِبرا", emoji: "🦓" }
];

function openAlphabet() {
    showLearningSection("alphabet-section");

    const container = document.getElementById("alphabet-container");
    const info = document.getElementById("letter-info");

    container.innerHTML = "";

    alphabetData.forEach(item => {
        const button = document.createElement("button");

        button.className = "letter-card";
        button.textContent = item.letter;

        button.onclick = function() {
            document.querySelectorAll("#alphabet-container .letter-card")
                .forEach(card => card.classList.remove("active"));

            button.classList.add("active");

            info.innerHTML = `
                <h3>${item.letter} ${item.letter.toLowerCase()}</h3>

                <button onclick="speakWord('${item.letter}')">
                    🔊 شنیدن صدای حرف
                </button>

                <div style="font-size:65px; margin:15px;">
                    ${item.emoji}
                </div>

                <h2 style="color:#6c63ff;">${item.word}</h2>
                <p>معنی: ${item.meaning}</p>
                <p>تلفظ: ${item.sound}</p>

                <button onclick="speakWord('${item.word}')">
                    🔊 شنیدن تلفظ کلمه
                </button>
            `;
        };

        container.appendChild(button);
    });
}


// =====================================
// 4. ابزار ساخت فهرست کلمات
// =====================================

function makeItems(data) {
    return data.trim().split("\n").map(line => {
        const parts = line.split("|");

        return {
            emoji: parts[0],
            word: parts[1],
            meaning: parts[2],
            code: parts[3] || ""
        };
    });
}


// =====================================
// 5. اطلاعات حیوانات - بخش اول
// =====================================

const animalCategories = [

    {
        title: "🐄 حیوانات مزرعه",
        items: makeItems(`
🐄|Cow|گاو
🐂|Bull|گاو نر
🐮|Calf|گوساله
🐑|Sheep|گوسفند
🐏|Ram|قوچ
🐑|Lamb|بره
🐐|Goat|بز
🐐|Kid|بزغاله
🐎|Horse|اسب
🐴|Pony|اسب کوچک
🫏|Donkey|الاغ
🐴|Mule|قاطر
🐖|Pig|خوک
🐗|Boar|گراز
🐔|Chicken|مرغ
🐓|Rooster|خروس
🐣|Chick|جوجه
🦆|Duck|اردک
🪿|Goose|غاز
🦃|Turkey|بوقلمون
🦚|Peacock|طاووس
🦢|Swan|قو
🐕|Sheepdog|سگ گله
🐈|Barn Cat|گربه مزرعه
🐇|Rabbit|خرگوش
        `)
    },

    {
        title: "🦊 حیوانات جنگل",
        items: makeItems(`
🦊|Fox|روباه
🐺|Wolf|گرگ
🐻|Bear|خرس
🦌|Deer|گوزن
🫎|Moose|گوزن شمالی
🐿️|Squirrel|سنجاب
🦔|Hedgehog|جوجه تیغی
🦝|Raccoon|راکون
🦨|Skunk|اسکانک
🦡|Badger|گورکن
🦫|Beaver|سگ آبی
🦦|Otter|سمور آبی
🐈‍⬛|Lynx|سیاه‌گوش
🐗|Wild Boar|گراز وحشی
🐇|Rabbit|خرگوش
🐰|Hare|خرگوش صحرایی
🦇|Bat|خفاش
🦔|Porcupine|تشی
🐿️|Chipmunk|سنجاب راه‌راه
🐅|Tiger|ببر
🦁|Lion|شیر
🐆|Leopard|پلنگ
🐒|Monkey|میمون
🦍|Gorilla|گوریل
🐼|Panda|پاندا
        `)
    },

    {
        title: "🐬 حیوانات دریایی",
        items: makeItems(`
🐬|Dolphin|دلفین
🐋|Whale|نهنگ
🦈|Shark|کوسه
🐙|Octopus|اختاپوس
🦑|Squid|ماهی مرکب
🪼|Jellyfish|عروس دریایی
🦀|Crab|خرچنگ
🦞|Lobster|لابستر
🦐|Shrimp|میگو
🐴|Seahorse|اسب دریایی
⭐|Starfish|ستاره دریایی
🐢|Sea Turtle|لاک‌پشت دریایی
🦭|Seal|فُک
🦭|Sea Lion|شیر دریایی
🦭|Walrus|گراز دریایی
🪽|Stingray|سفره‌ماهی
🐟|Eel|مارماهی
🐠|Clownfish|ماهی دلقک
🐡|Pufferfish|ماهی بادکنکی
🐳|Orca|نهنگ قاتل
🐚|Shellfish|صدف دریایی
🪸|Coral|مرجان
🐠|Tropical Fish|ماهی گرمسیری
🦪|Oyster|صدف خوراکی
🦑|Cuttlefish|ماهی مرکب سپید
        `)
    },

    {
        title: "🐍 خزندگان",
        items: makeItems(`
🐍|Snake|مار
🐍|Cobra|مار کبرا
🐍|Python|پایتون
🐍|Viper|افعی
🐍|Rattlesnake|مار زنگی
🐊|Crocodile|تمساح
🐊|Alligator|آلیگاتور
🦎|Chameleon|آفتاب‌پرست
🦎|Lizard|مارمولک
🦎|Gecko|گکو
🦎|Iguana|ایگوانا
🦎|Komodo Dragon|اژدهای کومودو
🦎|Monitor Lizard|بزمجه
🐢|Tortoise|لاک‌پشت خشکی
🐢|Turtle|لاک‌پشت
🐢|Sea Turtle|لاک‌پشت دریایی
🦎|Skink|اسکینک
🦎|Anole|آنول
🦎|Gila Monster|مارمولک سمی گیلا
🦎|Tuatara|تواتارا
        `)
    },

    {
        title: "🦜 پرندگان",
        items: makeItems(`
🦜|Parrot|طوطی
🦅|Eagle|عقاب
🦉|Owl|جغد
🦚|Peacock|طاووس
🦩|Flamingo|فلامینگو
🐧|Penguin|پنگوئن
🐦|Sparrow|گنجشک
🕊️|Pigeon|کبوتر
🐦‍⬛|Crow|کلاغ
🐦‍⬛|Raven|غراب
🐤|Canary|قناری
🐦|Swallow|پرستو
🦢|Swan|قو
🦆|Duck|اردک
🪿|Goose|غاز
🐔|Chicken|مرغ
🐓|Rooster|خروس
🐦|Woodpecker|دارکوب
🐦|Hummingbird|مرغ مگس‌خوار
🦜|Toucan|توکان
🦤|Pelican|پلیکان
🪶|Ostrich|شترمرغ
🕊️|Seagull|مرغ دریایی
🦅|Falcon|شاهین
🦅|Vulture|کرکس
        `)
    },

    {
        title: "🐶 حیوانات خانگی",
        items: makeItems(`
🐶|Dog|سگ
🐕|Puppy|توله سگ
🐱|Cat|گربه
🐈|Kitten|بچه گربه
🐰|Rabbit|خرگوش
🐹|Hamster|همستر
🐹|Guinea Pig|خوکچه هندی
🐠|Goldfish|ماهی قرمز
🐟|Betta Fish|ماهی فایتر
🦜|Parrot|طوطی
🐦|Budgie|مرغ عشق
🐤|Canary|قناری
🦜|Cockatiel|عروس هلندی
🐢|Turtle|لاک‌پشت
🐢|Tortoise|لاک‌پشت خشکی
🦦|Ferret|فرت
🐭|Chinchilla|چینچیلا
🐹|Gerbil|موش دوپا
🐭|Mouse|موش
🐀|Rat|موش صحرایی
🐕|Poodle|سگ پودل
🐈|Persian Cat|گربه پرشین
🐠|Aquarium Fish|ماهی آکواریومی
🕊️|Dove|کبوتر سفید
🦎|Gecko|گکوی خانگی
        `)
    }

];
// =====================================
// 6. اطلاعات میوه‌ها
// =====================================

const fruitCategories = [

    {
        title: "🌸 میوه‌های بهاری",
        items: makeItems(`
🍓|Strawberry|توت فرنگی
🍒|Cherry|گیلاس
🍑|Apricot|زردآلو
🟢|Greengage|گوجه سبز
🍈|Loquat|ازگیل ژاپنی
🫐|Mulberry|توت
🟣|Plum|آلو
🍋|Lemon|لیمو
🍓|Wild Strawberry|توت فرنگی وحشی
🍒|Sour Cherry|آلبالو
        `)
    },

    {
        title: "☀️ میوه‌های تابستانی",
        items: makeItems(`
🍉|Watermelon|هندوانه
🍑|Peach|هلو
🍈|Melon|طالبی
🍇|Grapes|انگور
🍒|Sour Cherry|آلبالو
🍑|Nectarine|شلیل
❤️|Raspberry|تمشک
🫐|Blueberry|بلوبری
🍓|Strawberry|توت فرنگی
🟣|Blackberry|شاه‌توت
🍈|Cantaloupe|خربزه
🍑|Plum|آلو
        `)
    },

    {
        title: "🍂 میوه‌های پاییزی",
        items: makeItems(`
🍎|Apple|سیب
🍐|Pear|گلابی
🍎|Pomegranate|انار
🟠|Persimmon|خرمالو
🍐|Quince|به
🟣|Fig|انجیر
🍇|Grapes|انگور
🌰|Chestnut|شاه‌بلوط
🍊|Mandarin|نارنگی
🟤|Date|خرما
        `)
    },

    {
        title: "❄️ میوه‌های زمستانی",
        items: makeItems(`
🍊|Orange|پرتقال
🍊|Mandarin|نارنگی
🍋|Lemon|لیمو
🥝|Kiwi|کیوی
🍊|Grapefruit|گریپ‌فروت
🍈|Pomelo|دارابی
🍎|Apple|سیب
🍌|Banana|موز
🍐|Pear|گلابی
🥥|Coconut|نارگیل
        `)
    },

    {
        title: "🌴 میوه‌های گرمسیری",
        items: makeItems(`
🍍|Pineapple|آناناس
🥭|Mango|انبه
🥥|Coconut|نارگیل
🍈|Papaya|پاپایا
🍌|Banana|موز
🐉|Dragon Fruit|میوه اژدها
🥝|Kiwi|کیوی
🍐|Guava|گواوا
💛|Passion Fruit|میوه گل ساعتی
🍈|Lychee|لیچی
🍈|Jackfruit|جک‌فروت
⭐|Starfruit|میوه ستاره‌ای
🍈|Durian|دوریان
🍈|Rambutan|رامبوتان
        `)
    }

];


// =====================================
// 7. اطلاعات رنگ‌ها
// =====================================

const colorCategories = [

    {
        title: "🎨 رنگ‌های اصلی",
        items: makeItems(`
🟥|Red|قرمز|#ff0000
🟦|Blue|آبی|#0000ff
🟨|Yellow|زرد|#ffff00
        `)
    },

    {
        title: "🌈 رنگ‌های فرعی",
        items: makeItems(`
🟩|Green|سبز|#008000
🟧|Orange|نارنجی|#ff8c00
🟪|Purple|بنفش|#800080
        `)
    },

    {
        title: "💗 رنگ‌های صورتی و قرمز",
        items: makeItems(`
🩷|Pink|صورتی|#ffc0cb
💗|Hot Pink|صورتی پررنگ|#ff69b4
🌹|Rose|رزگلد|#ff007f
❤️|Crimson|زرشکی روشن|#dc143c
🍷|Burgundy|زرشکی|#800020
🟥|Maroon|عنابی|#800000
🪸|Coral|مرجانی|#ff7f50
        `)
    },

    {
        title: "💙 طیف‌های آبی",
        items: makeItems(`
🩵|Sky Blue|آبی آسمانی|#87ceeb
🔵|Navy Blue|سرمه‌ای|#000080
🔷|Royal Blue|آبی سلطنتی|#4169e1
🩵|Turquoise|فیروزه‌ای|#40e0d0
🩵|Cyan|آبی فیروزه‌ای روشن|#00ffff
🦚|Teal|سبزآبی|#008080
🟪|Indigo|نیلی|#4b0082
🩵|Baby Blue|آبی ملایم|#89cff0
        `)
    },

    {
        title: "💚 طیف‌های سبز",
        items: makeItems(`
🟢|Lime|سبز لیمویی|#00ff00
🌿|Mint|نعنایی|#98ff98
🫒|Olive|زیتونی|#808000
💚|Emerald|زمردی|#50c878
🌲|Forest Green|سبز جنگلی|#228b22
🌱|Sage|سبز مریم‌گلی|#9caf88
🟢|Pistachio|پسته‌ای|#93c572
        `)
    },

    {
        title: "💛 رنگ‌های زرد و نارنجی",
        items: makeItems(`
💛|Lemon Yellow|زرد لیمویی|#fff44f
🌟|Golden Yellow|زرد طلایی|#ffdf00
🟠|Amber|کهربایی|#ffbf00
🍑|Peach|هلویی|#ffe5b4
🟠|Apricot|زردآلویی|#fbceb1
🍊|Tangerine|نارنگی|#f28500
🎃|Pumpkin|کدو حلوایی|#ff7518
        `)
    },

    {
        title: "💜 طیف‌های بنفش",
        items: makeItems(`
💜|Lavender|اسطوخودوسی|#e6e6fa
🟣|Violet|بنفش مایل به آبی|#8f00ff
🪻|Lilac|یاسی|#c8a2c8
🍇|Plum|آلویی|#8e4585
💜|Mauve|بنفش خاکی|#e0b0ff
💎|Amethyst|بنفش آمتیست|#9966cc
🌸|Orchid|ارکیده‌ای|#da70d6
        `)
    },

    {
        title: "🤎 طیف‌های قهوه‌ای",
        items: makeItems(`
🍫|Chocolate|شکلاتی|#7b3f00
☕|Coffee|قهوه‌ای|#6f4e37
🍮|Caramel|کاراملی|#c68e17
🟤|Tan|قهوه‌ای روشن|#d2b48c
🤎|Beige|بژ|#f5f5dc
🟫|Khaki|خاکی|#c3b091
🌰|Chestnut|بلوطی|#954535
        `)
    },

    {
        title: "⚪ رنگ‌های خنثی",
        items: makeItems(`
⚫|Black|مشکی|#000000
⚪|White|سفید|#ffffff
🩶|Gray|خاکستری|#808080
🤍|Cream|کِرِمی|#fffdd0
🤍|Ivory|عاجی|#fffff0
⬛|Charcoal|ذغالی|#36454f
🩶|Silver Gray|نقره‌ای خاکستری|#c0c0c0
        `)
    },

    {
        title: "✨ رنگ‌های متالیک",
        items: makeItems(`
🥇|Gold|طلایی|#ffd700
🥈|Silver|نقره‌ای|#c0c0c0
🥉|Bronze|برنزی|#cd7f32
🟤|Copper|مسی|#b87333
🌸|Rose Gold|رزگلد|#b76e79
💎|Platinum|پلاتینی|#e5e4e2
🥂|Champagne|شامپاینی|#f7e7ce
        `)
    }

];
// =====================================
// 8. نمایش دسته‌بندی‌ها
// =====================================

function showCategoryMenu(containerId, categories, type) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    categories.forEach((category, index) => {

        const card = document.createElement("button");

        card.className = "letter-card category-card";
        card.innerHTML = category.title;

        card.onclick = function () {

            if (type === "animal") {
                openAnimalCategory(index);
            }

            if (type === "fruit") {
                openFruitCategory(index);
            }

            if (type === "color") {
                openColorCategory(index);
            }

        };

        container.appendChild(card);

    });

}


// =====================================
// 9. نمایش فهرست کلمات هر دسته
// =====================================

// =====================================
// نمایش کارت‌ها و اطلاعات کلمات
// =====================================

function showWordList(containerId, infoId, categories, categoryIndex, type) {

    const container = document.getElementById(containerId);
    const info = document.getElementById(infoId);

    if (!container) return;

    const category = categories[categoryIndex];

    if (!category) return;

    const backFunction =
        type === "animal" ? "openAnimals" :
        type === "fruit" ? "openFruits" :
        "openColors";

    container.innerHTML = `
        <div class="word-list-header">
            <h2>${category.title}</h2>

            <button class="back-button" onclick="${backFunction}()">
                ⬅️ بازگشت به دسته‌بندی‌ها
            </button>
        </div>

        <div class="category-word-grid" id="${type}-word-grid"></div>
    `;

    if (info) {
        info.innerHTML = `
            <div class="empty-word-info">
                <span>🌟</span>
                <h3>یک گزینه انتخاب کن!</h3>
                <p>با انتخاب هر مورد، اطلاعاتش اینجا نمایش داده می‌شود.</p>
            </div>
        `;
    }

    const wordGrid = document.getElementById(`${type}-word-grid`);

    category.items.forEach((item, index) => {

        const card = document.createElement("button");

        card.className = "word-card";

        if (type === "color") {
            card.innerHTML = `
                <span class="word-picture color-picture"
                    style="background:${item.code};">
                </span>

                <span class="word-meaning">${item.meaning}</span>
                <span class="word-name">${item.word}</span>
            `;
        } else {
            card.innerHTML = `
                <span class="word-picture">${item.emoji}</span>
                <span class="word-meaning">${item.meaning}</span>
                <span class="word-name">${item.word}</span>
            `;
        }

       card.onclick = function () {

    const allCards = wordGrid.querySelectorAll(".word-card");

    allCards.forEach(function (item) {
        item.classList.remove("active");
    });

    card.classList.add("active");

    if (type === "animal") {
        showAnimal(index);
    }

    if (type === "fruit") {
        showFruit(index);
    }

    if (type === "color") {
        showColor(index);
    }
};

        wordGrid.appendChild(card);
    });
}

// =====================================
// نمایش اطلاعات گزینه انتخاب‌شده
// =====================================

function showWordInfo(infoId, item, isColor = false) {

    const info = document.getElementById(infoId);

    if (!info || !item) return;

    if (isColor) {

        info.innerHTML = `
            <div class="selected-word">

                <div class="selected-color"
                    style="background-color:${item.code};">
                </div>

                <h2>${item.meaning}</h2>
                <h3>${item.word}</h3>

                <p>کد رنگ: ${item.code}</p>

                <button onclick="speakWord('${item.word}')">
                    🔊 شنیدن تلفظ
                </button>

            </div>
        `;

    } else {

        info.innerHTML = `
            <div class="selected-word">

                <div class="selected-emoji">
                    ${item.emoji}
                </div>

                <h2>${item.meaning}</h2>
                <h3>${item.word}</h3>

                <button onclick="speakWord('${item.word}')">
                    🔊 شنیدن تلفظ
                </button>

            </div>
        `;

    }

}

// =====================================
// 10. نمایش اطلاعات یک کلمه
// =====================================

function showWordInfo(infoId, item, isColor = false) {

    const info = document.getElementById(infoId);

    if (!info || !item) return;

    if (isColor) {

        info.innerHTML = `
            <div style="
                width:100px;
                height:100px;
                background:${item.code};
                border-radius:20px;
                margin:15px auto;
                border:2px solid #aaa;
            "></div>

            <h2>${item.word}</h2>

            <h3>${item.meaning}</h3>

            <p>کد رنگ: ${item.code}</p>

            <button onclick="speakWord('${item.word}')">
                🔊 شنیدن تلفظ
            </button>
        `;

    } else {

        info.innerHTML = `
            <div style="font-size:65px;margin:15px;">
                ${item.emoji}
            </div>

            <h2>${item.word}</h2>

            <h3>${item.meaning}</h3>

            <button onclick="speakWord('${item.word}')">
                🔊 شنیدن تلفظ
            </button>
        `;

    }

}


// =====================================
// 11. حیوانات
// =====================================

window.currentAnimalCategory = 0;

function openAnimals() {

    showLearningSection("animals-section");

    showCategoryMenu(
        "animals-container",
        animalCategories,
        "animal"
    );

    const info = document.getElementById("animal-info");

    if (info) info.innerHTML = "";

}

function openAnimalCategory(index) {

    window.currentAnimalCategory = index;

    showWordList(
        "animals-container",
        "animal-info",
        animalCategories,
        index,
        "animal"
    );

}

function showAnimal(index) {

    const category = animalCategories[window.currentAnimalCategory];

    if (!category) return;

    showWordInfo(
        "animal-info",
        category.items[index]
    );

}


// =====================================
// 12. میوه‌ها
// =====================================

window.currentFruitCategory = 0;

function openFruits() {

    showLearningSection("fruits-section");

    showCategoryMenu(
        "fruits-container",
        fruitCategories,
        "fruit"
    );

    const info = document.getElementById("fruit-info");

    if (info) info.innerHTML = "";

}

function openFruitCategory(index) {

    window.currentFruitCategory = index;

    showWordList(
        "fruits-container",
        "fruit-info",
        fruitCategories,
        index,
        "fruit"
    );

}

function showFruit(index) {

    const category = fruitCategories[window.currentFruitCategory];

    if (!category) return;

    showWordInfo(
        "fruit-info",
        category.items[index]
    );

}


// =====================================
// 13. رنگ‌ها
// =====================================

window.currentColorCategory = 0;

function openColors() {

    showLearningSection("colors-section");

    showCategoryMenu(
        "colors-container",
        colorCategories,
        "color"
    );

    const info = document.getElementById("color-info");

    if (info) info.innerHTML = "";

}

function openColorCategory(index) {

    window.currentColorCategory = index;

    showWordList(
        "colors-container",
        "color-info",
        colorCategories,
        index,
        "color"
    );

}

function showColor(index) {

    const category = colorCategories[window.currentColorCategory];

    if (!category) return;

    showWordInfo(
        "color-info",
        category.items[index],
        true
    );

}
// =====================================
// 14. اطلاعات بازی حدس کلمه
// =====================================

const allGameQuestions = [

    {
        emoji: "🐱",
        question: "گربه به انگلیسی چه می‌شود؟",
        answers: ["Dog", "Cat", "Bird", "Fish"],
        correct: "Cat"
    },

    {
        emoji: "🐶",
        question: "سگ به انگلیسی چه می‌شود؟",
        answers: ["Lion", "Horse", "Dog", "Duck"],
        correct: "Dog"
    },

    {
        emoji: "🍎",
        question: "سیب به انگلیسی چه می‌شود؟",
        answers: ["Apple", "Banana", "Orange", "Grape"],
        correct: "Apple"
    },

    {
        emoji: "🍌",
        question: "موز به انگلیسی چه می‌شود؟",
        answers: ["Mango", "Peach", "Banana", "Cherry"],
        correct: "Banana"
    },

    {
        emoji: "🦁",
        question: "شیر به انگلیسی چه می‌شود؟",
        answers: ["Tiger", "Lion", "Bear", "Wolf"],
        correct: "Lion"
    },

    {
        emoji: "🐘",
        question: "فیل به انگلیسی چه می‌شود؟",
        answers: ["Monkey", "Zebra", "Elephant", "Giraffe"],
        correct: "Elephant"
    },

    {
        emoji: "🔴",
        question: "کدام کلمه به معنی قرمز است؟",
        answers: ["Blue", "Green", "Yellow", "Red"],
        correct: "Red"
    },

    {
        emoji: "🔵",
        question: "کدام کلمه به معنی آبی است؟",
        answers: ["Pink", "Blue", "Black", "White"],
        correct: "Blue"
    },

    {
        emoji: "🍊",
        question: "پرتقال به انگلیسی چه می‌شود؟",
        answers: ["Orange", "Apple", "Lemon", "Melon"],
        correct: "Orange"
    },

    {
        emoji: "🐰",
        question: "خرگوش به انگلیسی چه می‌شود؟",
        answers: ["Rabbit", "Fox", "Deer", "Cow"],
        correct: "Rabbit"
    },

    {
        emoji: "🐟",
        question: "ماهی به انگلیسی چه می‌شود؟",
        answers: ["Bird", "Fish", "Frog", "Turtle"],
        correct: "Fish"
    },

    {
        emoji: "🍓",
        question: "توت فرنگی به انگلیسی چه می‌شود؟",
        answers: ["Cherry", "Watermelon", "Strawberry", "Peach"],
        correct: "Strawberry"
    }

];


// =====================================
// 15. متغیرهای بازی
// =====================================

let currentQuestionIndex = 0;
let gameScore = 0;
let gameAnswered = false;


// =====================================
// 16. شروع و نمایش سؤال بازی
// =====================================

function restartGame() {

    currentQuestionIndex = 0;
    gameScore = 0;
    gameAnswered = false;

    showGameQuestion();

}


function showGameQuestion() {

    const gameContainer = document.getElementById("game-container");

    if (!gameContainer) return;

    if (currentQuestionIndex >= allGameQuestions.length) {

        gameContainer.innerHTML = `
            <div class="game-result">
                <h2>🎉 آفرین! بازی تمام شد</h2>

                <h3>
                    امتیاز شما:
                    ${gameScore}
                    از
                    ${allGameQuestions.length}
                </h3>

                <p>
                    ${
                        gameScore === allGameQuestions.length
                        ? "عالی بود! همه جواب‌ها درست بود! 🌟"
                        : "آفرین! برای بهتر شدن دوباره تمرین کن ❤️"
                    }
                </p>

                <button onclick="restartGame()">
                    🔄 بازی دوباره
                </button>
            </div>
        `;

        return;

    }

    const question = allGameQuestions[currentQuestionIndex];

    gameAnswered = false;

    gameContainer.innerHTML = `
        <div class="game-card">

            <h2>🎮 بازی حدس کلمه</h2>

            <p>
                سؤال
                ${currentQuestionIndex + 1}
                از
                ${allGameQuestions.length}
            </p>

            <h1 style="font-size:75px;">
                ${question.emoji}
            </h1>

            <h3>${question.question}</h3>

            <div class="game-answers" id="game-answers"></div>

            <div id="game-feedback"></div>

            <h3>
                ⭐ امتیاز:
                ${gameScore}
            </h3>

        </div>
    `;

    const answersContainer = document.getElementById("game-answers");

    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.className = "game-answer";
        button.textContent = answer;

        button.onclick = function () {

            checkGameAnswer(answer);

        };

        answersContainer.appendChild(button);

    });

}


// =====================================
// 17. بررسی جواب بازی
// =====================================

function checkGameAnswer(answer) {

    if (gameAnswered) return;

    gameAnswered = true;

    const question = allGameQuestions[currentQuestionIndex];

    const feedback = document.getElementById("game-feedback");

    const answerButtons = document.querySelectorAll(".game-answer");

    answerButtons.forEach(button => {

        button.disabled = true;

        if (button.textContent === question.correct) {
            button.style.background = "#a5e6b0";
        }

        if (
            button.textContent === answer &&
            answer !== question.correct
        ) {
            button.style.background = "#ffb3b3";
        }

    });

    if (answer === question.correct) {

        gameScore++;

        if (feedback) {
            feedback.innerHTML = `
                <h3 style="color:green;">
                    آفرین! جواب درست بود 🎉
                </h3>
            `;
        }

        speakWord(question.correct);

    } else {

        if (feedback) {
            feedback.innerHTML = `
                <h3 style="color:red;">
                    جواب درست:
                    ${question.correct}
                </h3>
            `;
        }

    }

    const gameContainer = document.getElementById("game-container");

    if (gameContainer) {

        const nextButton = document.createElement("button");

        nextButton.textContent =
            currentQuestionIndex === allGameQuestions.length - 1
            ? "دیدن نتیجه 🏆"
            : "سؤال بعدی ➡️";

        nextButton.onclick = function () {

            currentQuestionIndex++;

            showGameQuestion();

        };

        gameContainer.appendChild(nextButton);

    }

}


// =====================================
// 18. راه‌اندازی اولیه بازی
// =====================================

function startGame() {

    showLearningSection("game-section");

    restartGame();

}
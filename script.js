
const RESULT_CATEGORIES = {
    stress: {
        title: "Stress and Feeling Overwhelmed",
        feeling: "You may be carrying a lot of responsibilities lately. This can sometimes bring frustration, worry, irritability, or mental exhaustion.",
        advice: "You don't have to figure everything out all at once. Take things one step at a time, organize your priorities, and give yourself permission to rest.",
    },

    anxiety: {
        title: "Anxiety and Excessive Worrying",
        feeling: "You may have been thinking a lot about what could happen or feeling uncertain about certain situations. This can bring fear, restlessness, and overthinking.",
        advice: "It's okay not to have everything figured out. Take a comfortable breath, focus on what you can manage today, and allow yourself to move at your own pace.",
    },

    sadness: {
        title: "Sadness and Low Mood",
        feeling: "You may have experienced moments of sadness, disappointment, or disconnection.",
        advice: "Continue making time for the little things that bring you comfort. Spend time with people who make you feel appreciated, and remember that you deserve care on both good and difficult days.",
    },

    exhaustion: {
        title: "Emotional Exhaustion",
        feeling: "You may have been feeling mentally tired, having difficulty concentrating, or finding it harder to stay motivated.",
        advice: "Rest is not something you have to earn. Allow yourself to slow down, take breaks, and remember that you don't need to be productive all the time.",
    },

    loneliness: {
        title: "Social Connection and Loneliness",
        feeling: "You may sometimes experience feelings of loneliness or disconnection from the people around you.",
        advice: "Continue nurturing the connections that make you feel comfortable and appreciated. Remember that you deserve to be heard and understood.",
    }
};


function frequency(score) {
    if (score >= 7) return "You've felt this often";
    if (score >= 4) return "You've felt this sometimes";
    return "You've felt this less often";
}


function calculateScores() {
    const scores = {
        stress: 0,
        anxiety: 0,
        sadness: 0,
        exhaustion: 0,
        loneliness: 0
    };

    document.querySelectorAll(".question[data-category]").forEach(question => {
        const category = question.dataset.category;
        const selected = question.querySelector("input[type='radio']:checked");

        if (selected) {
            scores[category] += Number(selected.value);
        }
    });

    return scores;
}


function displayResults(scores) {
    const result = document.getElementById("result");
    const resultMessage = document.getElementById("resultMessage");
    const categoryResults = document.getElementById("categoryResults");

    categoryResults.innerHTML = "";

    const keys = Object.keys(RESULT_CATEGORIES);

    const highestScore = Math.max(...keys.map(key => scores[key]));

    const highestCategories = keys.filter(
        key => scores[key] === highestScore
    );

    const connectedCategories = keys.filter(
        key => scores[key] >= 4 && !highestCategories.includes(key)
    );

    if (highestScore <= 3) {
        resultMessage.textContent =
            "Your answers suggest that the experiences in these categories have been less frequent lately. Continue taking time to care for yourself and check in with your feelings.";
    } else {
        resultMessage.textContent =
            "Thank you for being honest with yourself. Your answers show that some experiences may have been coming up more often lately. Take your time as you read your results. Remember, you deserve care and understanding.";
    }

    const ordered = [...keys].sort(
        (a, b) => scores[b] - scores[a] || keys.indexOf(a) - keys.indexOf(b)
    );

    ordered.forEach((key, index) => {
        const item = RESULT_CATEGORIES[key];
        const score = scores[key];

        const highest = highestCategories.includes(key);
        const connected = connectedCategories.includes(key);

        const card = document.createElement("article");

        card.className = "result-card";

        if (highest) {
            card.classList.add("highest-result");
        }

        card.innerHTML = `
            <div class="result-card-top">
                <span class="category-number">${index + 1}.</span>
                <h2>${item.title}</h2>
                ${highest ? '<span class="highest-badge">Highest</span>' : ""}
            </div>

            <div class="score-section">
                <h3>${score}/9</h3>

                <div class="score-bar">
                    <div class="score-fill"
                    style="width: ${(score / 9) * 100}%"></div>
                </div>

                <p>${frequency(score)}</p>
            </div>

            <div class="result-description">
                <h4>What you might be feeling</h4>
                <p>${item.feeling}</p>

                <h4>A gentle reminder</h4>
                <p>${item.advice}</p>
            </div>

        `;

        categoryResults.appendChild(card);
    });

    document.getElementById("moodForm").classList.add("hidden");
    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const moodForm = document.getElementById("moodForm");
    const checkAgain = document.getElementById("checkAgain");

    // When user submits the assessment
    moodForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const scores = calculateScores();

        displayResults(scores);
    });

    checkAgain.addEventListener("click", function() {
        moodForm.reset();

        moodForm.classList.remove("hidden");

        document.getElementById("result").classList.add("hidden");

        document.getElementById("resultMessage").textContent = "";

        document.getElementById("categoryResults").innerHTML = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});

const moodMessages = {
    happy: "It's good to see you feeling happy. Take a moment to enjoy it and notice what helped.",

    good: "A good day is worth noticing. Keep doing the things that are working for you.",

    okay: "Okay is a fine place to be. Not every day has to be a big one.",

    sad: "It's alright to feel down. Go easy on yourself today and take it one small step at a time.",

    low: "Things feel heavy right now, and that's okay. Rest if you can, and talking to someone you trust."
};
document.addEventListener("DOMContentLoaded", function() {

    const moodButtons = document.querySelectorAll(".mood-btn");
    const quoteText = document.getElementById("quoteText");
    const moodTitle = document.getElementById("moodTitle");

    if (!quoteText || !moodTitle || moodButtons.length === 0) {
        return;
    }

    moodButtons.forEach(button => {

        button.addEventListener("click", function() {

            const selectedMood = this.dataset.mood;

            quoteText.textContent = moodMessages[selectedMood];

            moodTitle.textContent = "A Little Reminder";

        });

    });

});

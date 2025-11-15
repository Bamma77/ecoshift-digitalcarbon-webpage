// ---- 상수 (단순 가늠값) ----
const EMAIL_PER_G = 4; // g CO2 / email
const SNS_PER_HOUR_G = 36; // g CO2 / hour
const VIDEO_PER_HOUR_G = 80; // g CO2 / hour
const CAR_PER_KM_G = 120; // g CO2 / km
const TREE_PER_DAY_G = 58; // g CO2 / tree/day

// 연도 표시
document.getElementById("year").textContent = new Date().getFullYear();

// ---- 계산기 엘리먼트 참조 ----
const emailRange = document.getElementById("emailRange");
const emailInput = document.getElementById("emailInput");
const snsRange = document.getElementById("snsRange");
const snsInput = document.getElementById("snsInput");
const videoRange = document.getElementById("videoRange");
const videoInput = document.getElementById("videoInput");

const calcMeter = document.getElementById("calcMeter");
const calcTotalText = document.getElementById("calcTotalText");
const calcEmailVal = document.getElementById("calcEmailVal");
const calcSnsVal = document.getElementById("calcSnsVal");
const calcVideoVal = document.getElementById("calcVideoVal");
const calcKm = document.getElementById("calcKm");
const calcTree = document.getElementById("calcTree");
const calcYear = document.getElementById("calcYear");

function updateCalculator() {
    const emails = parseInt(emailInput.value || "0", 10);
    const snsHours = parseFloat(snsInput.value || "0");
    const videoHours = parseFloat(videoInput.value || "0");

    const emailCO2 = emails * EMAIL_PER_G;
    const snsCO2 = snsHours * SNS_PER_HOUR_G;
    const videoCO2 = videoHours * VIDEO_PER_HOUR_G;
    const totalG = emailCO2 + snsCO2 + videoCO2;

    const asKm = totalG / CAR_PER_KM_G;
    const asTree = totalG / TREE_PER_DAY_G;
    const yearKg = (totalG * 365) / 1000;

    const meterPct = Math.min(100, Math.round((totalG / 3000) * 100));

    // 계산기 카드 반영
    calcMeter.style.width = meterPct + "%";
    calcTotalText.textContent = `오늘 ${totalG.toFixed(0)} g CO₂e (추정)`;
    calcEmailVal.textContent = emailCO2.toFixed(0);
    calcSnsVal.textContent = snsCO2.toFixed(0);
    calcVideoVal.textContent = videoCO2.toFixed(0);
    calcKm.textContent = asKm.toFixed(2);
    calcTree.textContent = asTree.toFixed(2);
    calcYear.textContent = yearKg.toFixed(1);
}

// 슬라이더와 숫자 입력 동기화
emailRange.addEventListener("input", () => {
    emailInput.value = emailRange.value;
    updateCalculator();
});
emailInput.addEventListener("input", () => {
    let v = parseInt(emailInput.value || "0", 10);
    if (v < 0) v = 0;
    if (v > 999) v = 999;
    emailInput.value = v;
    emailRange.value = Math.min(200, v);
    updateCalculator();
});

snsRange.addEventListener("input", () => {
    snsInput.value = snsRange.value;
    updateCalculator();
});
snsInput.addEventListener("input", () => {
    let v = parseFloat(snsInput.value || "0");
    if (v < 0) v = 0;
    if (v > 24) v = 24;
    snsInput.value = v;
    snsRange.value = Math.min(12, v);
    updateCalculator();
});
videoRange.addEventListener("input", () => {
    videoInput.value = videoRange.value;
    updateCalculator();
});

videoInput.addEventListener("input", () => {
    let v = parseFloat(videoInput.value || "0");
    if (v < 0) v = 0;
    if (v > 24) v = 24;
    videoInput.value = v;
    videoRange.value = v;
    updateCalculator();
});
updateCalculator(); // 초기값 반영

// ---- 체크리스트 ----
const checkBoxes = document.querySelectorAll(".check");
const checkMeterFill = document.getElementById("checkMeterFill");
const checkCountEl = document.getElementById("checkCount");
const checkScoreEl = document.getElementById("checkScore");
const checkPctEl = document.getElementById("checkPct");
const checkSummaryEl = document.getElementById("checkSummary");

function updateChecklist() {
    const total = checkBoxes.length;
    let checked = 0;
    checkBoxes.forEach((cb) => {
        if (cb.checked) checked++;
    });

    const pct = total === 0 ? 0 : Math.round((checked / total) * 100);
    const score = checked * 10;

    checkMeterFill.style.width = pct + "%";
    checkCountEl.textContent = checked;
    checkScoreEl.textContent = score;
    checkPctEl.textContent = pct;

    let msg = "";
    if (checked === 0) {
        msg = "아직 체크가 없습니다. 오늘 실천할 수 있는 습관부터 하나 골라볼까요?";
    } else if (checked <= 3) {
        msg =
            "탄소 발자국이 남겨지고 있어요! 작은 습관을 조금만 더 늘려봐요.";
    } else if (checked <= 6) {
        msg =
            "잘하고 있어요! 탄소 발자국을 줄일 다른 방법을 더 살펴보아요!";
    } else if (checked <= 9) {
        msg =
            "완벽해요! 이미 여러 가지 탄소 중립 습관을 훌륭하게 실천 중이시네요!";
    } else {
        msg =
            "당신이 바로 에코시프터! 이제 주변 사람들에게도 팁을 나눠보면 어떨까요?";
    }

    checkSummaryEl.textContent = msg;
}

checkBoxes.forEach((cb) => {
    cb.addEventListener("change", updateChecklist);
});
updateChecklist();

// ===== 맨 위로 가기 버튼 =====
window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

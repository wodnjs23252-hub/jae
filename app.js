const templates = [
  {
    id: "email",
    name: "이메일",
    outputType: "이메일",
    domain: "비즈니스 커뮤니케이션",
    tone: "전문적이고 설득력 있는",
    keywords: ["메일", "이메일", "답장", "고객", "안내", "소개"],
    task: "제목, 인사말, 핵심 메시지, 행동 유도 문구, 마무리 인사를 포함하십시오.",
    format: "1. 제목\n2. 본문\n3. 행동 유도 문구",
  },
  {
    id: "summary",
    name: "요약",
    outputType: "요약문",
    domain: "정보 정리",
    tone: "간결하고 실용적인",
    keywords: ["요약", "정리", "회의록", "핵심", "기사", "문서"],
    task: "핵심 내용, 중요한 결정 사항, 후속 액션을 구분해 정리하십시오.",
    format: "1. 한 줄 요약\n2. 핵심 포인트\n3. 다음 액션",
  },
  {
    id: "report",
    name: "보고서",
    outputType: "보고서",
    domain: "비즈니스 분석",
    tone: "전문적이고 설득력 있는",
    keywords: ["보고서", "기획", "제안", "전략", "분석", "리서치"],
    task: "배경, 핵심 요약, 상세 분석, 제안, 다음 액션 순서로 구성하십시오.",
    format: "1. 배경\n2. 핵심 요약\n3. 상세 내용\n4. 제안\n5. 다음 액션",
  },
  {
    id: "marketing",
    name: "마케팅",
    outputType: "마케팅 문구",
    domain: "마케팅",
    tone: "창의적이고 생동감 있는",
    keywords: ["광고", "sns", "인스타", "홍보", "마케팅", "카피", "브랜드"],
    task: "타겟 고객, 핵심 혜택, 차별점, 행동 유도 문구를 명확히 드러내십시오.",
    format: "1. 핵심 메시지\n2. 문구 3안\n3. 추천 CTA",
  },
  {
    id: "dev",
    name: "개발 요청",
    outputType: "코드 요청서",
    domain: "소프트웨어 개발",
    tone: "간결하고 실용적인",
    keywords: ["코드", "개발", "버그", "오류", "api", "기능", "파이썬", "자바스크립트"],
    task: "문제 상황, 원하는 동작, 입력값, 출력값, 예외 처리, 확인 방법을 포함하십시오.",
    format: "1. 문제 상황\n2. 원하는 결과\n3. 제약 조건\n4. 확인 방법",
  },
  {
    id: "learning",
    name: "학습 계획",
    outputType: "학습 계획",
    domain: "교육",
    tone: "친근하고 쉬운",
    keywords: ["공부", "학습", "강의", "커리큘럼", "계획", "배우"],
    task: "현재 수준을 모른다는 전제로 단계별 학습 순서와 점검 방법을 제안하십시오.",
    format: "1. 학습 목표\n2. 단계별 계획\n3. 매일 할 일\n4. 점검 방법",
  },
];

const fields = {
  purpose: document.querySelector("#purpose"),
  outputType: document.querySelector("#outputType"),
  tone: document.querySelector("#tone"),
  audience: document.querySelector("#audience"),
};

const els = {
  copyButton: document.querySelector("#copyButton"),
  resetButton: document.querySelector("#resetButton"),
  promptPreview: document.querySelector("#promptPreview"),
  templatePill: document.querySelector("#templatePill"),
  autoLabel: document.querySelector("#autoLabel"),
  clearHistory: document.querySelector("#clearHistory"),
  historyList: document.querySelector("#historyList"),
  toast: document.querySelector("#toast"),
};

const storageKey = "prompt-builder-simple-history";
let toastTimer = null;

function inferTemplate(purpose) {
  const normalized = purpose.toLowerCase();
  const scored = templates
    .map((template) => ({
      ...template,
      score: template.keywords.filter((keyword) => normalized.includes(keyword)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0].score > 0 ? scored[0] : templates[0];
}

function inferAudience(purpose, template) {
  if (fields.audience.value.trim()) return fields.audience.value.trim();
  if (/고객|구매|상품|신제품|서비스/.test(purpose)) return "잠재 고객 또는 기존 고객";
  if (/팀장|상사|보고|회사|업무/.test(purpose)) return "업무 관계자";
  if (/초보|처음|입문|공부|학습/.test(purpose)) return "초보자";
  if (template.id === "dev") return "개발자 또는 기술 지원 담당자";
  return "일반 독자";
}

function getData() {
  const purpose = fields.purpose.value.trim();
  const template = inferTemplate(purpose);

  return {
    purpose,
    template,
    outputType: fields.outputType.value || template.outputType,
    tone: fields.tone.value || template.tone,
    domain: template.domain,
    audience: inferAudience(purpose, template),
  };
}

function buildPrompt(data) {
  if (!data.purpose) {
    return [
      "여기에 목적을 한 줄로 적으면 프롬프트가 자동으로 만들어집니다.",
      "",
      "예시:",
      "- 신제품을 기존 고객에게 소개하는 이메일을 만들고 싶어",
      "- 회의록을 핵심만 요약해줘",
      "- 파이썬 오류를 고치는 질문을 만들어줘",
    ].join("\n");
  }

  return `Role:
당신은 ${data.domain} 분야에 능숙한 전문가입니다.

Context:
사용자는 다음 목적을 달성하려고 합니다.
"${data.purpose}"

대상 독자는 ${data.audience}입니다.

Task:
${data.outputType} 형식으로 바로 사용할 수 있는 결과물을 작성하십시오.
${data.template.task}

Constraints:
- 문체는 ${data.tone} 톤을 유지하십시오.
- 사용자가 추가 정보를 주지 않았더라도 합리적인 가정을 짧게 명시하고 진행하십시오.
- 결과물은 복사해서 바로 사용할 수 있을 정도로 구체적으로 작성하십시오.
- 불필요한 설명보다 실행 가능한 결과물을 우선하십시오.

Output Format:
${data.template.format}`;
}

function updatePreview() {
  const data = getData();
  els.promptPreview.value = buildPrompt(data);
  els.templatePill.textContent = data.purpose ? `${data.template.name} 자동 적용` : "자동 분류 대기";
  els.copyButton.disabled = !data.purpose;
  els.autoLabel.textContent = data.purpose ? "프롬프트가 준비됐습니다" : "입력하면 자동 생성됩니다";
}

async function copyPrompt() {
  const data = getData();
  if (!data.purpose) {
    showToast("목적을 한 줄만 적어주세요.");
    fields.purpose.focus();
    return;
  }

  try {
    await navigator.clipboard.writeText(els.promptPreview.value);
    saveHistory(data, els.promptPreview.value);
    renderHistory();
    showToast("프롬프트를 복사했습니다.");
  } catch {
    els.promptPreview.select();
    showToast("직접 선택해서 복사해주세요.");
  }
}

function saveHistory(data, prompt) {
  const history = getHistory();
  const item = {
    id: crypto.randomUUID(),
    title: data.purpose.slice(0, 42),
    templateName: data.template.name,
    prompt,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(storageKey, JSON.stringify([item, ...history].slice(0, 8)));
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function renderHistory() {
  const history = getHistory();
  if (!history.length) {
    els.historyList.innerHTML = `<p class="empty-history">복사한 프롬프트가 여기에 저장됩니다.</p>`;
    return;
  }

  els.historyList.innerHTML = history
    .map(
      (item) => `
        <button class="history-item" type="button" data-history="${item.id}">
          <strong>${escapeHtml(item.title || "제목 없는 프롬프트")}</strong>
          <small>${escapeHtml(item.templateName)} · ${new Date(item.createdAt).toLocaleDateString("ko-KR")}</small>
        </button>
      `,
    )
    .join("");
}

function resetForm() {
  fields.purpose.value = "";
  fields.outputType.value = "";
  fields.tone.value = "";
  fields.audience.value = "";
  updatePreview();
  fields.purpose.focus();
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

document.querySelectorAll(".example-chip").forEach((button) => {
  button.addEventListener("click", () => {
    fields.purpose.value = button.textContent.trim();
    updatePreview();
    fields.purpose.focus();
  });
});

els.historyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history]");
  if (!button) return;
  const item = getHistory().find((historyItem) => historyItem.id === button.dataset.history);
  if (!item) return;
  els.promptPreview.value = item.prompt;
  showToast("최근 프롬프트를 불러왔습니다.");
});

els.copyButton.addEventListener("click", copyPrompt);
els.resetButton.addEventListener("click", resetForm);
els.clearHistory.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  renderHistory();
  showToast("최근 기록을 비웠습니다.");
});

updatePreview();
renderHistory();

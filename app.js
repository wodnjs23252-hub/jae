const templates = [
  {
    id: "email",
    icon: "@",
    name: "이메일",
    summary: "제목, 본문, CTA까지 정리",
    outputType: "이메일",
    domain: "비즈니스 커뮤니케이션",
    keywords: ["메일", "이메일", "답장", "고객", "안내"],
  },
  {
    id: "summary",
    icon: "#",
    name: "요약",
    summary: "긴 내용을 핵심만 압축",
    outputType: "요약문",
    domain: "정보 정리",
    keywords: ["요약", "정리", "회의록", "핵심", "기사"],
  },
  {
    id: "report",
    icon: "R",
    name: "보고서",
    summary: "배경, 분석, 제안 구성",
    outputType: "보고서",
    domain: "비즈니스 분석",
    keywords: ["보고서", "기획", "제안", "전략", "분석"],
  },
  {
    id: "marketing",
    icon: "M",
    name: "마케팅",
    summary: "고객 혜택과 행동 유도",
    outputType: "마케팅 문구",
    domain: "마케팅",
    keywords: ["광고", "sns", "홍보", "마케팅", "카피"],
  },
  {
    id: "dev",
    icon: "</>",
    name: "개발 요청",
    summary: "요구사항과 테스트 기준 포함",
    outputType: "코드 요청서",
    domain: "소프트웨어 개발",
    keywords: ["코드", "개발", "버그", "api", "기능"],
  },
  {
    id: "learning",
    icon: "L",
    name: "학습 계획",
    summary: "수준, 기간, 단계별 계획",
    outputType: "학습 계획",
    domain: "교육",
    keywords: ["공부", "학습", "강의", "커리큘럼", "계획"],
  },
];

const fields = {
  goal: document.querySelector("#goal"),
  audience: document.querySelector("#audience"),
  outputType: document.querySelector("#outputType"),
  domain: document.querySelector("#domain"),
  tone: document.querySelector("#tone"),
  constraints: document.querySelector("#constraints"),
  sourceText: document.querySelector("#sourceText"),
};

const els = {
  templateGrid: document.querySelector("#templateGrid"),
  recommendationBox: document.querySelector("#recommendationBox"),
  recommendationText: document.querySelector("#recommendationText"),
  applyRecommendation: document.querySelector("#applyRecommendation"),
  promptPreview: document.querySelector("#promptPreview"),
  qualityScore: document.querySelector("#qualityScore"),
  warningList: document.querySelector("#warningList"),
  copyButton: document.querySelector("#copyButton"),
  resetButton: document.querySelector("#resetButton"),
  clearHistory: document.querySelector("#clearHistory"),
  historyList: document.querySelector("#historyList"),
  toast: document.querySelector("#toast"),
};

let selectedTemplateId = "email";
let recommendedTemplateId = "";
let toastTimer = null;

const storageKey = "prompt-builder-history";

function renderTemplates() {
  els.templateGrid.innerHTML = templates
    .map(
      (template) => `
        <button
          class="template-card"
          type="button"
          data-template="${template.id}"
          aria-pressed="${template.id === selectedTemplateId}"
          title="${template.name} 템플릿 선택"
        >
          <span class="template-icon">${template.icon}</span>
          <strong>${template.name}</strong>
          <small>${template.summary}</small>
        </button>
      `,
    )
    .join("");
}

function getSelectedTemplate() {
  return templates.find((template) => template.id === selectedTemplateId) || templates[0];
}

function getFormData() {
  const template = getSelectedTemplate();
  return {
    goal: fields.goal.value.trim(),
    audience: fields.audience.value.trim(),
    outputType: fields.outputType.value || template.outputType,
    domain: fields.domain.value.trim() || template.domain,
    tone: fields.tone.value || "명확하고 실용적인",
    constraints: fields.constraints.value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean),
    sourceText: fields.sourceText.value.trim(),
    template,
  };
}

function recommendTemplate(goal) {
  const normalizedGoal = goal.toLowerCase();
  if (!normalizedGoal) return "";

  const scored = templates
    .map((template) => ({
      ...template,
      score: template.keywords.filter((keyword) => normalizedGoal.includes(keyword)).length,
    }))
    .sort((a, b) => b.score - a.score);

  return scored[0].score > 0 ? scored[0].id : "";
}

function buildPrompt(data) {
  const audience = data.audience || "결과물을 사용할 사람";
  const constraints = data.constraints.length
    ? data.constraints.map((item) => `- ${item}`).join("\n")
    : "- 불필요한 장황함을 줄이고 바로 사용할 수 있게 작성하십시오.";
  const reference = data.sourceText || "제공된 참고 자료가 없다면 합리적인 가정을 명시하고 작성하십시오.";
  const templateInstruction = getTemplateInstruction(data.template.id);

  return `Role:
당신은 ${data.domain} 분야에 능숙한 전문가입니다.

Context:
사용자는 "${data.goal || "구체적인 목적"}"을 달성하려고 합니다.
결과물의 대상은 ${audience}입니다.

Task:
${data.outputType} 형식으로 바로 사용할 수 있는 결과물을 작성하십시오.
${templateInstruction}

Constraints:
- 문체는 ${data.tone} 톤을 유지하십시오.
${constraints}

Reference:
${reference}

Output Format:
${getOutputFormat(data.template.id, data.outputType)}`;
}

function getTemplateInstruction(templateId) {
  const instructions = {
    email: "제목, 인사말, 핵심 메시지, 행동 유도 문구, 마무리 인사를 포함하십시오.",
    summary: "핵심 요약, 세부 포인트, 중요한 숫자나 일정, 다음 액션을 구분하십시오.",
    report: "배경, 핵심 요약, 상세 분석, 제안, 다음 액션 순서로 구성하십시오.",
    marketing: "타겟 고객, 핵심 혜택, 차별점, 행동 유도 문구를 명확히 드러내십시오.",
    dev: "기술 환경, 구현 목표, 입력값, 출력값, 예외 처리, 테스트 기준을 포함하십시오.",
    learning: "현재 수준, 목표, 기간, 단계별 커리큘럼, 점검 방법을 포함하십시오.",
  };

  return instructions[templateId] || "목적에 맞게 구조화된 결과물을 작성하십시오.";
}

function getOutputFormat(templateId, outputType) {
  const formats = {
    email: "1. 이메일 제목\n2. 이메일 본문\n3. CTA 문구",
    summary: "1. 한 줄 요약\n2. 핵심 포인트\n3. 확인이 필요한 내용\n4. 다음 액션",
    report: "1. 배경\n2. 핵심 요약\n3. 상세 분석\n4. 제안\n5. 다음 액션",
    marketing: "1. 타겟 고객\n2. 핵심 메시지\n3. 홍보 문구 3안\n4. CTA",
    dev: "1. 요구사항\n2. 구현 범위\n3. 입력/출력\n4. 예외 처리\n5. 테스트 기준",
    learning: "1. 목표\n2. 주차별 계획\n3. 일일 학습 루틴\n4. 점검 방법",
  };

  return formats[templateId] || `${outputType}에 적합한 구조로 작성하십시오.`;
}

function calculateQuality(data) {
  let score = 0;
  if (data.goal.length >= 8) score += 25;
  if (data.audience) score += 15;
  if (data.outputType) score += 15;
  if (data.domain) score += 10;
  if (data.tone) score += 10;
  if (data.constraints.length) score += 15;
  if (data.sourceText) score += 10;
  return Math.min(score, 100);
}

function getWarnings(data) {
  const warnings = [];
  if (!data.goal) warnings.push("목적을 입력하면 프롬프트 생성 품질이 크게 올라갑니다.");
  if (!data.audience) warnings.push("대상을 입력하면 문체와 설명 수준을 더 정확히 맞출 수 있습니다.");
  if (["summary", "report"].includes(data.template.id) && !data.sourceText) {
    warnings.push("요약/보고서 템플릿은 참고 자료가 있으면 더 정확합니다.");
  }
  return warnings;
}

function syncRecommendation() {
  const nextRecommendation = recommendTemplate(fields.goal.value);
  recommendedTemplateId = nextRecommendation;

  if (!nextRecommendation || nextRecommendation === selectedTemplateId) {
    els.recommendationBox.hidden = true;
    return;
  }

  const template = templates.find((item) => item.id === nextRecommendation);
  els.recommendationText.textContent = `${template.name} 템플릿이 잘 맞아 보여요.`;
  els.recommendationBox.hidden = false;
}

function updatePreview() {
  const data = getFormData();
  const prompt = buildPrompt(data);
  const warnings = getWarnings(data);
  const score = calculateQuality(data);

  els.promptPreview.value = prompt;
  els.qualityScore.textContent = score;
  els.warningList.innerHTML = warnings.map((warning) => `<div class="warning">${warning}</div>`).join("");
  els.copyButton.disabled = !data.goal;
  syncRecommendation();
}

function applyTemplate(templateId) {
  selectedTemplateId = templateId;
  const template = getSelectedTemplate();
  fields.outputType.value = template.outputType;
  if (!fields.domain.value.trim()) fields.domain.value = template.domain;
  renderTemplates();
  updatePreview();
}

async function copyPrompt() {
  const data = getFormData();
  if (!data.goal) {
    showToast("목적을 먼저 입력해주세요.");
    fields.goal.focus();
    return;
  }

  try {
    await navigator.clipboard.writeText(els.promptPreview.value);
    saveHistory(data, els.promptPreview.value);
    showToast("프롬프트를 복사했습니다.");
    renderHistory();
  } catch {
    els.promptPreview.select();
    showToast("직접 선택해서 복사해주세요.");
  }
}

function saveHistory(data, prompt) {
  const history = getHistory();
  const item = {
    id: crypto.randomUUID(),
    title: data.goal.slice(0, 42),
    templateName: data.template.name,
    prompt,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(storageKey, JSON.stringify([item, ...history].slice(0, 10)));
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
          ${item.title || "제목 없는 프롬프트"}
          <small>${item.templateName} · ${new Date(item.createdAt).toLocaleDateString("ko-KR")}</small>
        </button>
      `,
    )
    .join("");
}

function resetForm() {
  fields.goal.value = "";
  fields.audience.value = "";
  fields.outputType.value = "이메일";
  fields.domain.value = "비즈니스 커뮤니케이션";
  fields.tone.value = "명확하고 실용적인";
  fields.constraints.value = "";
  fields.sourceText.value = "";
  applyTemplate("email");
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

els.templateGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-template]");
  if (!card) return;
  applyTemplate(card.dataset.template);
});

els.applyRecommendation.addEventListener("click", () => {
  if (recommendedTemplateId) applyTemplate(recommendedTemplateId);
});

els.copyButton.addEventListener("click", copyPrompt);
els.resetButton.addEventListener("click", resetForm);
els.clearHistory.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  renderHistory();
  showToast("최근 기록을 비웠습니다.");
});

els.historyList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history]");
  if (!button) return;
  const item = getHistory().find((historyItem) => historyItem.id === button.dataset.history);
  if (!item) return;
  els.promptPreview.value = item.prompt;
  showToast("최근 프롬프트를 불러왔습니다.");
});

renderTemplates();
applyTemplate("email");
renderHistory();

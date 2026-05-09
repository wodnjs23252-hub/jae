const templates = [
  {
    id: "email",
    name: "이메일",
    outputType: "이메일",
    domain: "비즈니스 커뮤니케이션",
    role: "비즈니스 커뮤니케이션 전문가",
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
    role: "정보 구조화와 요약에 능숙한 편집자",
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
    role: "비즈니스 분석과 보고서 작성에 능숙한 전략 컨설턴트",
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
    role: "고객 행동을 이해하는 마케팅 카피라이터",
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
    role: "요구사항을 명확히 정리하는 소프트웨어 엔지니어",
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
    role: "초보자의 눈높이에 맞추는 학습 코치",
    tone: "친근하고 쉬운",
    keywords: ["공부", "학습", "강의", "커리큘럼", "계획", "배우"],
    task: "현재 수준을 모른다는 전제로 단계별 학습 순서와 점검 방법을 제안하십시오.",
    format: "1. 학습 목표\n2. 단계별 계획\n3. 매일 할 일\n4. 점검 방법",
  },
];

const fallbackTemplate = {
  id: "custom",
  name: "맞춤형",
  outputType: "구조화된 답변",
  domain: "문제 해결",
  role: "사용자의 목적을 구체적인 실행 결과로 바꾸는 문제 해결 전문가",
  tone: "명확하고 실용적인",
  task: "사용자의 목적을 해석하고, 바로 사용할 수 있는 결과물로 구체화하십시오.",
  format: "1. 목적 해석\n2. 바로 사용할 결과물\n3. 추가로 확인하면 좋은 점",
};

const roleProfiles = [
  {
    pattern: /여행|일정|코스|숙소|맛집|관광|휴가|해외|국내|제주|일본|유럽/i,
    name: "여행 계획",
    role: "동선과 취향을 함께 고려하는 여행 일정 기획자",
    domain: "여행 계획",
    outputType: "여행 일정",
    tone: "친근하고 쉬운",
    task: "목적지, 시간, 동선, 예산을 합리적으로 가정해 실행 가능한 여행 계획으로 정리하십시오.",
    format: "1. 추천 일정\n2. 이동 동선\n3. 준비물\n4. 선택지와 주의점",
  },
  {
    pattern: /요리|레시피|식단|메뉴|반찬|도시락|다이어트 식단|재료/i,
    name: "요리/식단",
    role: "현실적인 재료와 시간을 고려하는 요리 및 식단 기획자",
    domain: "요리와 식단 계획",
    outputType: "레시피 또는 식단표",
    tone: "친근하고 쉬운",
    task: "사용자가 바로 따라 할 수 있도록 재료, 순서, 대체 재료, 시간 계획을 포함하십시오.",
    format: "1. 준비 재료\n2. 만드는 순서\n3. 대체 옵션\n4. 보관 또는 응용 팁",
  },
  {
    pattern: /운동|헬스|루틴|근육|체력|다이어트|살빼|스트레칭|홈트/i,
    name: "운동 루틴",
    role: "초보자도 안전하게 따라 할 수 있게 돕는 운동 루틴 코치",
    domain: "운동 루틴 설계",
    outputType: "운동 계획",
    tone: "간결하고 실용적인",
    task: "무리하지 않는 기본 루틴, 횟수, 휴식, 주의 사항을 포함하십시오.",
    format: "1. 목표\n2. 주간 루틴\n3. 세트와 반복 수\n4. 주의 사항",
  },
  {
    pattern: /취업|이직|면접|자소서|이력서|포트폴리오|커리어|직무/i,
    name: "커리어",
    role: "지원자의 강점을 명확히 정리하는 커리어 코치",
    domain: "커리어 설계",
    outputType: "커리어 문서 또는 준비 계획",
    tone: "전문적이고 설득력 있는",
    task: "목표 직무와 사용자의 강점을 연결해 실무적으로 활용 가능한 결과물을 작성하십시오.",
    format: "1. 핵심 방향\n2. 작성 또는 준비안\n3. 보완할 점\n4. 다음 액션",
  },
  {
    pattern: /발표|피피티|ppt|강연|대본|스피치|프레젠테이션/i,
    name: "발표 구성",
    role: "청중의 이해와 설득 흐름을 설계하는 프레젠테이션 코치",
    domain: "발표 구성",
    outputType: "발표 구성안",
    tone: "전문적이고 설득력 있는",
    task: "청중이 쉽게 따라올 수 있도록 핵심 메시지, 흐름, 대본 또는 슬라이드 구성을 제안하십시오.",
    format: "1. 발표 목표\n2. 전체 흐름\n3. 핵심 메시지\n4. 발표 대본 또는 슬라이드 구성",
  },
  {
    pattern: /디자인|ui|ux|화면|앱|웹|로고|브랜드|랜딩|페이지/i,
    name: "UX/UI 디자인",
    role: "사용자 경험과 시각적 명확성을 함께 고려하는 UX/UI 디자인 컨설턴트",
    domain: "UX/UI 디자인",
    outputType: "디자인 요구사항 또는 개선안",
    tone: "명확하고 실용적인",
    task: "사용자 목표, 화면 구성, 우선순위, 상호작용을 중심으로 구체적인 디자인 방향을 제안하십시오.",
    format: "1. 사용자 목표\n2. 화면 구조\n3. 핵심 컴포넌트\n4. UX 개선 포인트",
  },
  {
    pattern: /글|소설|스토리|시나리오|대사|캐릭터|세계관|콘텐츠|블로그/i,
    name: "콘텐츠 작성",
    role: "아이디어를 매력적인 구조로 발전시키는 콘텐츠 기획자이자 작가",
    domain: "콘텐츠 기획과 글쓰기",
    outputType: "콘텐츠 초안",
    tone: "창의적이고 생동감 있는",
    task: "아이디어를 독자가 이해하기 쉬운 흐름과 매력적인 표현으로 발전시키십시오.",
    format: "1. 핵심 콘셉트\n2. 구조 또는 목차\n3. 초안\n4. 개선 아이디어",
  },
  {
    pattern: /돈|예산|절약|가계부|가격|비용|구매|비교|견적/i,
    name: "비용 비교",
    role: "선택지를 비용과 효용 기준으로 정리하는 의사결정 컨설턴트",
    domain: "비용 비교와 의사결정",
    outputType: "비교표 또는 추천안",
    tone: "간결하고 실용적인",
    task: "중요한 판단 기준을 세우고, 선택지를 비교해 합리적인 결정을 돕는 형태로 작성하십시오.",
    format: "1. 판단 기준\n2. 선택지 비교\n3. 추천안\n4. 확인할 리스크",
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

  return scored[0].score > 0 ? scored[0] : fallbackTemplate;
}

function inferRoleProfile(purpose, template) {
  if (!purpose) return fallbackTemplate;

  return roleProfiles.find((profile) => profile.pattern.test(purpose)) || template;
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
  const roleProfile = inferRoleProfile(purpose, template);

  return {
    purpose,
    template,
    category: roleProfile.name,
    role: roleProfile.role,
    outputType: fields.outputType.value || roleProfile.outputType,
    tone: fields.tone.value || roleProfile.tone,
    domain: roleProfile.domain,
    task: roleProfile.task,
    format: roleProfile.format,
    audience: inferAudience(purpose, roleProfile),
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
당신은 ${data.role}입니다.

Context:
사용자는 다음 목적을 달성하려고 합니다.
"${data.purpose}"

대상 독자는 ${data.audience}입니다.

Task:
${data.outputType} 형식으로 바로 사용할 수 있는 결과물을 작성하십시오.
${data.task}

Constraints:
- 문체는 ${data.tone} 톤을 유지하십시오.
- 사용자가 추가 정보를 주지 않았더라도 합리적인 가정을 짧게 명시하고 진행하십시오.
- 결과물은 복사해서 바로 사용할 수 있을 정도로 구체적으로 작성하십시오.
- 불필요한 설명보다 실행 가능한 결과물을 우선하십시오.

Output Format:
${data.format}`;
}

function updatePreview() {
  const data = getData();
  els.promptPreview.value = buildPrompt(data);
  els.templatePill.textContent = data.purpose
    ? `${data.category} · ${data.domain}`
    : "자동 분류 대기";
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
    templateName: data.category,
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

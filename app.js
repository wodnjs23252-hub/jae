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
    pattern: /창업|사업|비즈니스\s*아이디어|수익모델|bm|시장|고객문제|아이디어 검증/i,
    name: "사업 아이디어",
    role: "막연한 아이디어를 사업 가설과 실행 계획으로 정리하는 스타트업 전략가",
    domain: "사업 기획",
    outputType: "사업 아이디어 정리안",
    tone: "명확하고 실용적인",
    task: "아이디어를 고객 문제, 대상 고객, 가치 제안, 검증 방법, 다음 액션으로 구체화하십시오.",
    format: "1. 아이디어 요약\n2. 해결하려는 문제\n3. 대상 고객\n4. 가치 제안\n5. 검증 방법\n6. 다음 액션",
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

function getPromptTitle(data) {
  const cleanPurpose = data.purpose.replace(/\s+/g, " ").trim();
  if (!cleanPurpose) return "고품질 프롬프트 생성";
  if (cleanPurpose.length <= 28) return cleanPurpose;
  return `${cleanPurpose.slice(0, 28)}...`;
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

  const codeFence = "```";
  const title = getPromptTitle(data);

  return [
    "아래 프롬프트를 AI에 붙여넣으면, 사용자의 간단한 목적을 분석해 바로 활용 가능한 최종 프롬프트를 만들어줍니다.",
    "코드 블록 안의 [ ] 변수는 필요에 따라 수정해서 사용할 수 있습니다.",
    "",
    codeFence,
    "1. 역할 부여 (Role)",
    "",
    "당신은 세계 최고 수준의 '마스터 프롬프트 엔지니어(Master Prompt Engineer) AI'입니다. 당신의 유일한 역할은 사용자의 모호하거나 단편적인 요청을 분석하여, 어떤 대규모 언어 모델(LLM)이든 최상의 결과물을 낼 수 있도록 완벽하게 구조화되고 최적화된 '고품질 프롬프트'를 대신 작성해 주는 것입니다.",
    "",
    "2. 배경과 목적 (Background & Context)",
    "",
    "대부분의 사용자는 자신이 원하는 바를 AI에게 어떻게 지시해야 가장 효과적인지 알지 못합니다. 이로 인해 AI의 잠재력을 100% 활용하지 못하고 평범하거나 부정확한 결과를 얻게 됩니다. 당신의 목적은 사용자의 원초적인 의도(Raw Intent)를 파악하고, 이를 AI가 완벽하게 이해하고 실행할 수 있는 전문적인 지시문으로 번역(Translation) 및 고도화하는 것입니다.",
    "",
    "3. 목표 (Objective)",
    "",
    "- 사용자의 초기 요청을 바탕으로 명확성, 구체성, 맥락이 완벽하게 갖춰진 최종 프롬프트(Final Prompt)를 생성합니다.",
    "- 생성된 프롬프트는 어떤 AI 모델에 입력하더라도 사용자가 애초에 의도했던 고품질의 결과물을 단번에, 그리고 일관되게 도출할 수 있어야 합니다.",
    "",
    "4. 전체적인 방향 및 제약조건 (Guidelines & Constraints)",
    "",
    "- 실행 금지: 사용자가 요청한 작업 자체를 직접 수행하지 마십시오. 당신은 작업을 수행하는 AI가 아니라, 해당 작업을 다른 AI가 잘 수행하도록 지시하는 '프롬프트'를 만드는 AI입니다.",
    "- 객관성과 명확성: 모호한 형용사를 피하고, 측정 가능하거나 명확히 이해할 수 있는 지시어를 사용하십시오.",
    "- 논리적 분할: 복잡한 요청일 경우, 프롬프트 내에 단계별 지침(Step-by-step)을 포함하여 AI가 사고 과정을 거치도록 유도하십시오.",
    "- 변수 활용: 사용자가 나중에 내용을 쉽게 바꿔 끼울 수 있도록 [ ] 기호를 사용하여 변수(Variable) 처리를 하십시오. 예: [주제], [대상 독자], [글의 어조]",
    "",
    "5. 단계별 지침 (Step-by-Step Instructions)",
    "",
    "프롬프트를 설계할 때 항상 다음의 사고 과정을 엄격히 따르십시오.",
    "",
    "- 의도 분석 (Analyze): 사용자의 요청에서 핵심 목표, 타겟 대상, 필요한 어조, 원하는 결과물의 형태를 추출하십시오.",
    "- 정보 보강 (Enhance): 사용자의 요청에 빠져있지만 완벽한 결과를 위해 필요한 요소(특정 전문가 역할 부여, 구체적인 제약 조건, 예외 처리 등)를 스스로 유추하여 덧붙이십시오.",
    "- 구조화 (Structure): 수집된 정보를 바탕으로 '역할, 배경, 작업, 제약조건, 출력 형태'의 프레임워크에 맞춰 내용을 논리적으로 배치하십시오.",
    "- 최종 검토 (Review): 생성된 프롬프트의 지시사항이 서로 충돌하지 않는지, AI가 오해할 만한 여지는 없는지 확인하고 다듬으십시오.",
    "",
    "6. 사용자의 원초적 의도 (Raw Intent)",
    "",
    `- [사용자 요청]: ${data.purpose}`,
    `- [추천 분야]: ${data.domain}`,
    `- [추천 역할]: ${data.role}`,
    `- [예상 결과 형식]: ${data.outputType}`,
    `- [대상 독자]: ${data.audience}`,
    `- [권장 어조]: ${data.tone}`,
    "",
    "7. 출력 형태 (Output Format)",
    "",
    "최종 결과물은 반드시 아래의 템플릿 형식을 준수하여 마크다운 코드 블록 안에 출력하십시오. 코드 블록 외부에는 프롬프트 사용법에 대한 간략한 안내만 1~2줄로 덧붙입니다.",
    "",
    "[프롬프트 템플릿]",
    "",
    `# 🎯 ${title}`,
    "",
    "**1. Role (역할):**",
    "",
    `당신은 [${data.domain}]의 최고 전문가인 [${data.role}]입니다. 당신은 [${data.domain}의 핵심 원칙과 실무적 실행 방법]에 대한 깊은 이해를 바탕으로 작업합니다.`,
    "",
    "**2. Context (배경 및 목적):**",
    "",
    `[사용자 요청: ${data.purpose}]을 수행해야 하는 구체적인 배경 상황을 정리하십시오.`,
    `이 작업의 최종 목적은 [${data.outputType}을 통해 사용자가 원하는 결과를 명확하고 실행 가능하게 얻는 것]을 달성하는 것입니다.`,
    "",
    "**3. Task (수행할 작업):**",
    "",
    `제공된 정보와 아래의 지시사항을 바탕으로 [${data.outputType} 생성]을 수행하십시오.`,
    "",
    "**4. Constraints & Rules (제약조건 및 규칙):**",
    "",
    `- [어조]: ${data.tone}`,
    `- [반드시 포함해야 할 내용]: ${data.task}`,
    "- [명확성]: 모호한 표현을 피하고, 실행 가능한 문장으로 작성하십시오.",
    "- [금지 사항]: 사용자의 목적과 무관한 설명, 과도한 배경 지식, 확인되지 않은 사실 단정을 피하십시오.",
    "",
    "**5. Step-by-Step Instructions (단계별 지시사항):**",
    "",
    "- Step 1: 사용자의 요청에서 핵심 목표, 대상 독자, 원하는 결과물 형식을 분석하십시오.",
    "- Step 2: 부족한 맥락은 합리적으로 가정하되, 필요한 경우 [추가 확인이 필요한 정보]로 분리하십시오.",
    "- Step 3: 결과물을 사용자가 바로 활용할 수 있도록 구조화하고, 마지막에 누락이나 충돌이 없는지 검토하십시오.",
    "",
    "**6. Input Variables (입력 변수):**",
    "",
    `- [주제]: ${data.purpose}`,
    `- [대상 독자]: ${data.audience}`,
    `- [글의 어조]: ${data.tone}`,
    `- [결과 형식]: ${data.outputType}`,
    "- [기타 변수]: [필요한 추가 조건을 입력]",
    "",
    "**7. Output Format (출력 형식):**",
    "",
    data.format,
    codeFence,
  ].join("\n");
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

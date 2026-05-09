document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const performanceInput = document.getElementById('performance-content');
    const careerInput = document.getElementById('career-interest');
    const resultSection = document.getElementById('result-section');
    const loader = document.querySelector('.loader');
    const reportCard = document.getElementById('report-card');
    const copyBtn = document.getElementById('copy-btn');

    copyBtn.addEventListener('click', () => {
        const text = reportCard.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '복사 완료!';
            setTimeout(() => copyBtn.textContent = originalText, 2000);
        });
    });

    generateBtn.addEventListener('click', async () => {
        const subject = document.getElementById('subject-name').value.trim();
        const performance = performanceInput.value.trim();
        const career = careerInput.value.trim();

        if (!subject || !performance || !career) {
            alert('모든 정보를 입력해주세요!');
            return;
        }

        resultSection.classList.remove('hidden');
        loader.classList.remove('hidden');
        reportCard.classList.add('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });

        await new Promise(resolve => setTimeout(resolve, 2000));

        const idea = generateIdea(subject, performance, career);
        
        // Summary Area
        document.getElementById('result-summary').innerHTML = `
            <ul class="summary-list">
                <li><strong>선택한 교과 주제:</strong> ${idea.summary.subjectTopic}</li>
                <li><strong>추천 소재(작품/개념):</strong> ${idea.summary.material}</li>
                <li><strong>연결할 진로 개념:</strong> ${idea.summary.careerConcept}</li>
                <li><strong>과제물 최종 제목:</strong> <span class="highlight-text">${idea.summary.title}</span></li>
            </ul>
        `;

        // Logic Area
        document.getElementById('result-logic-section').innerHTML = `
            <div class="logic-box">
                <p><strong>📍 문제 정의:</strong> ${idea.logic.problem}</p>
                <p><strong>📍 나만의 융합 관점:</strong> ${idea.logic.perspective}</p>
            </div>
        `;

        // Action Plan Area
        document.getElementById('result-action-plan').innerHTML = `
            <div class="action-plan-steps">
                <div class="step"><strong>• 도입부 (1~2p):</strong> ${idea.plan.intro}</div>
                <div class="step"><strong>• 전개부 (3~4p):</strong> ${idea.plan.body}</div>
                <div class="step"><strong>• 결론 및 대안 (5p):</strong> ${idea.plan.outro}</div>
            </div>
        `;

        loader.classList.add('hidden');
        reportCard.classList.remove('hidden');
    });

    function generateIdea(subject, performance, career) {
        // Real-world "Almang-ee" Database
        const books = [
            { title: "『변신』 (프란츠 카프카)", topic: "소외, 의사소통 단절, 존재의 가치" },
            { title: "『멋진 신세계』 (올더스 헉슬리)", topic: "계급 사회, 기술 만능주의, 인간성 상실" },
            { title: "『침묵의 봄』 (레이첼 카슨)", topic: "환경 오염, 생태계 파괴, 기업의 윤리" },
            { title: "『정의란 무엇인가』 (마이클 샌델)", topic: "공정, 다수의 이익, 개인의 권리" }
        ];

        const concepts = {
            '기계': { name: "피드백 제어 시스템 (Feedback Control System)", desc: "시스템의 출력을 입력에 반영하여 오차를 줄이는 메커니즘" },
            '화학': { name: "르샤틀리에의 원리 (Le Chatelier's Principle)", desc: "외부 변화를 상쇄하는 방향으로 평형이 이동하는 성질" },
            '컴퓨터': { name: "데이터 정규화 (Data Normalization)", desc: "중복을 제거하고 데이터를 구조화하여 효율성을 높이는 과정" },
            '경제': { name: "게임 이론 (Game Theory)", desc: "상대방의 선택을 고려하여 자신의 최적 전략을 결정하는 분석법" },
            '생명': { name: "항상성 유지 기전 (Homeostasis)", desc: "외부 환경 변화에도 내부 상태를 일정하게 유지하려는 생명 현상" },
            '디자인': { name: "게슈탈트 시지각 원리 (Gestalt Principles)", desc: "부분이 아닌 전체로서 사물을 인식하는 인간의 시각적 특성" }
        };

        // Pick one book and concept
        const book = books[Math.floor(Math.random() * books.length)];
        let concept = { name: "임계점 이론 (Critical Point Theory)", desc: "어떤 현상이 갑자기 변화하기 시작하는 특정 지점" };
        
        for (const key in concepts) {
            if (career.includes(key)) { concept = concepts[key]; break; }
        }

        return {
            summary: {
                subjectTopic: book.topic,
                material: book.title,
                careerConcept: concept.name,
                title: `[${subject}] ${book.title.split(' ')[0]}을 통해 본 ${concept.name.split(' ')[0]}적 시스템 설계`
            },
            logic: {
                problem: `${book.title}에서 나타나는 '${book.topic.split(',')[0]}'의 문제는 개별 주체 간의 신호 전달이 왜곡되어 전체 시스템의 조화가 깨졌기 때문에 발생합니다.`,
                perspective: `${concept.name}의 관점에서 보면, 소설 속 인물들의 갈등은 단순한 심리전이 아니라 ${concept.desc}의 원리가 제대로 작동하지 않아 발생한 시스템 오류로 해석할 수 있습니다.`
            },
            plan: {
                intro: `${book.title}의 줄거리 요약과 함께, 탐구하고자 하는 핵심 질문(예: 왜 가족들은 변신한 주인공을 거부했는가?)을 제시합니다.`,
                body: `${concept.name}의 정의를 설명하고, 소설 속 사건들을 이 이론에 대입하여 분석합니다. (예: 가족의 태도 변화를 ${concept.name.split(' ')[0]} 그래프로 시각화)`,
                outro: `분석 결과를 종합하여, 현대 사회에서 '${book.topic.split(',')[0]}' 문제를 해결하기 위해 필요한 ${career}적 마인드셋이나 기술적 보완점을 제안하며 마무리합니다.`
            }
        };
    }
});

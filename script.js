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
        
        // Handle Step 1 (Show only if requested)
        const step1Container = document.getElementById('step-1-container');
        if (idea.step1) {
            step1Container.classList.remove('hidden');
            document.getElementById('result-step-1').innerHTML = idea.step1;
        } else {
            step1Container.classList.add('hidden');
        }

        // Step 2
        document.getElementById('result-step-2').innerHTML = `
            <p><strong>📍 선택한 소재:</strong> ${idea.step2.material}</p>
            <p><strong>📍 발견한 본질적 문제:</strong> ${idea.step2.problem}</p>
        `;

        // Step 3
        document.getElementById('result-step-3').innerHTML = `
            <p>${idea.step3.content}</p>
        `;

        // Step 4
        const planHtml = idea.step4.steps.map(s => `
            <div class="step">
                <strong>${s.header}:</strong> ${s.content}
            </div>
        `).join('');
        document.getElementById('result-step-4').innerHTML = `
            <div class="action-plan-steps">
                ${planHtml}
            </div>
        `;

        loader.classList.add('hidden');
        reportCard.classList.remove('hidden');
    });

    function generateIdea(subject, performance, career) {
        // Database categorized by Subject Type
        const db = {
            '문학': [
                { title: "『변신』 (프란츠 카프카)", summary: "어느 날 갑자기 벌레로 변한 주인공을 통해 인간 소외와 가족 공동체의 붕괴를 다룬 고전 소설" },
                { title: "『멋진 신세계』 (올더스 헉슬리)", summary: "고도로 통제된 미래 사회에서 기계화된 인간들의 삶을 통해 자유 의지의 가치를 묻는 SF 소설" },
                { title: "『난장이가 쏘아올린 작은 공』 (조세희)", summary: "산업화 과정에서 소외된 도시 빈민 가족의 아픔과 사회적 갈등을 묘사한 소설" }
            ],
            '과학': [
                { title: "엔트로피 법칙 (무질서도 증가 원리)", summary: "우주의 모든 현상은 무질서한 상태로 나아가며, 이를 되돌리기 위해서는 에너지가 필요하다는 물리 법칙" },
                { title: "생태계 먹이 사슬과 평형", summary: "종 간의 포식과 피포식 관계를 통해 생태계가 스스로 균형을 유지하는 유기적 시스템" }
            ]
        };

        // Determine Subject Type
        const isScience = performance.includes('과학') || performance.includes('실험') || subject.includes('과학') || subject.includes('물리');
        const activeDb = isScience ? db['과학'] : db['문학'];

        // 1. [제출 조건 파악] - Quantity
        const quantityMatch = performance.match(/(\d+)개/);
        const count = quantityMatch ? parseInt(quantityMatch[1]) : 1;
        const needsSearch = performance.includes('조사') || performance.includes('추천');

        // 2. [Step 1 생성]
        let step1 = null;
        if (needsSearch) {
            step1 = '<ul class="summary-list">';
            for(let i=0; i<Math.max(count, 2); i++) {
                const item = activeDb[i % activeDb.length];
                step1 += `<li><strong>${item.title}</strong>: ${item.summary}</li>`;
            }
            step1 += '</ul>';
        }

        const selected = activeDb[0];

        // 3. [Step 3 비유적 연성화]
        const metaphors = {
            '기계': '서로 맞물려 돌아가는 톱니바퀴처럼 조화로운 상태가 깨졌을 때, 이를 다시 제자리로 돌려놓는 과정',
            '화학': '서로 다른 성질의 액체가 섞여 안정을 찾듯, 갈등 상황에서 새로운 평형점을 찾아가는 반응',
            '컴퓨터': '복잡하게 얽힌 실타래를 하나씩 풀어가며 가장 효율적인 길을 찾아내는 논리적 순서',
            '데이터': '수많은 점들 속에서 하나의 선을 발견하듯, 혼란스러운 현상 속에서 명확한 규칙을 찾아내는 방식',
            '생명': '몸의 온도를 일정하게 유지하려는 성질처럼, 외부 충격에도 스스로를 지켜내려는 건강한 복원력'
        };

        let softMetaphor = '엉킨 실타래를 논리적으로 풀어내어 최적의 답을 찾아가는 시각';
        for (const key in metaphors) {
            if (career.includes(key)) { softMetaphor = metaphors[key]; break; }
        }

        // 4. [Step 4 포맷 최적화]
        let format = performance.includes('카드뉴스') ? '카드뉴스' : (performance.includes('발표') ? '발표' : '보고서');
        const planSteps = [];
        if (format === '카드뉴스') {
            planSteps.push({ header: 'Slide 1-2', content: `${selected.title} 속의 핵심 갈등을 한 눈에 보여주는 인트로` });
            planSteps.push({ header: 'Slide 3-5', content: `${softMetaphor}을 통해 분석한 문제의 원인과 해결 과정` });
            planSteps.push({ header: 'Slide 6', content: `우리가 실천할 수 있는 한 줄 제안` });
        } else {
            planSteps.push({ header: '서론', content: `${selected.title}을 통해 탐구하고 싶은 질문 던지기` });
            planSteps.push({ header: '본론', content: `${softMetaphor}을 분석 틀로 삼아 소재의 깊이 있는 이면 파헤치기` });
            planSteps.push({ header: '결론', content: `탐구를 통해 얻은 교훈과 앞으로의 다짐` });
        }

        return {
            step1,
            step2: { material: selected.title, problem: `${selected.title}에 나타난 갈등은 단순한 다툼이 아니라, 구성원 간의 조화가 무너져 시스템 전체가 위태로워진 상태입니다.` },
            step3: { content: `이 상황을 '${softMetaphor}'이라는 관점으로 바라보았습니다. 주인공이 겪는 어려움은 개인이 해결할 수 없는 외부의 압박에 의해 스스로를 지키는 힘이 약해진 결과이며, 이를 회복하기 위해 시스템적 보완이 필요함을 발견했습니다.` },
            step4: { steps: planSteps }
        };
    }
});

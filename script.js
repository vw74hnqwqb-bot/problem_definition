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
                <li><strong>📍 현재 과제 상황:</strong> ${idea.summary.status}</li>
                <li><strong>📌 추천 소재 및 개념:</strong> ${idea.summary.material}</li>
                <li><strong>✅ 최종 결과물 형태:</strong> ${idea.summary.format}</li>
                <li><strong>🚀 과제물 최종 제목:</strong> <span class="highlight-text">${idea.summary.title}</span></li>
            </ul>
        `;

        // Logic Area
        document.getElementById('result-logic-section').innerHTML = `
            <div class="logic-box">
                <p><strong>💡 문제 정의:</strong> ${idea.logic.problem}</p>
                <p><strong>💡 전공 기반 분석 관점:</strong> ${idea.logic.perspective}</p>
            </div>
        `;

        // Action Plan Area
        const planHtml = idea.plan.steps.map(step => `
            <div class="step">
                <strong>${step.header}:</strong> ${step.content}
            </div>
        `).join('');

        document.getElementById('result-action-plan').innerHTML = `
            <div class="action-plan-steps">
                ${planHtml}
            </div>
        `;

        loader.classList.add('hidden');
        reportCard.classList.remove('hidden');
    });

    function generateIdea(subject, performance, career) {
        // 1. [현재 단계 및 포맷 파악]
        let format = '보고서';
        let unit = '단락';
        if (performance.includes('카드뉴스')) { format = '카드뉴스'; unit = '슬라이드'; }
        else if (performance.includes('발표') || performance.includes('PPT')) { format = '발표/PPT'; unit = '장'; }

        // Detect quantity (e.g., "4개 조사")
        const quantityMatch = performance.match(/(\d+)개/);
        const count = quantityMatch ? parseInt(quantityMatch[1]) : 1;

        // 2. [소재 매칭 - 자연스러운 융합]
        const db = [
            { title: "『변신』 (프란츠 카프카)", topic: "소통 단절과 개체의 고립", logic: "피드백 루프의 단절로 인한 시스템 붕괴" },
            { title: "『멋진 신세계』 (올더스 헉슬리)", topic: "획일화된 사회와 개성 상실", logic: "과도한 정규화(Normalization)로 인한 데이터 다양성 결여" },
            { title: "『침묵의 봄』 (레이첼 카슨)", topic: "생태계 평형 파괴", logic: "연쇄적 인과관계에 따른 평형점 이동" },
            { title: "『자유론』 (존 스튜어트 밀)", topic: "개인의 자유와 사회적 간섭", logic: "다중 이해관계자 간의 최적화 알고리즘 탐색" }
        ];

        const selectedWorks = [];
        for(let i=0; i<count; i++) {
            selectedWorks.push(db[i % db.length]);
        }

        const materials = selectedWorks.map(w => w.title).join(', ');
        const mainWork = selectedWorks[0];

        // Career Logic (Metaphorical)
        const careerLogics = {
            '기계': '변수 간의 동적 평형과 오차 수정 메커니즘',
            '화학': '에너지 평형 상태에서의 물질적 상호작용',
            '컴퓨터': '복잡한 구조의 계층적 추상화와 논리적 단계화',
            '데이터': '다량의 변수에서 유의미한 패턴을 추출하는 방식',
            '생명': '항상성 유지를 위한 자기 조절 피드백 시스템'
        };

        let activeLogic = '현상의 인과관계를 논리적으로 구조화하는 시각';
        for (const key in careerLogics) {
            if (career.includes(key)) { activeLogic = careerLogics[key]; break; }
        }

        // 3. [출력 생성]
        const steps = [];
        if (format === '카드뉴스') {
            steps.push({ header: 'Slide 1-2 (도입)', content: `${mainWork.title}의 핵심 장면을 통해 탐구 동기를 시각화합니다.` });
            steps.push({ header: 'Slide 3-5 (분석)', content: `${activeLogic}의 관점에서 사건의 인과관계를 분석한 카드 구성을 제안합니다.` });
            steps.push({ header: 'Slide 6 (결론)', content: `현대적 대안을 제시하며 마무리합니다.` });
        } else {
            steps.push({ header: '1단계 (서론/도입)', content: `${materials}을 선정한 이유와 당장 해결해야 할 과제 목표를 정의합니다.` });
            steps.push({ header: '2단계 (본론/전개)', content: `${activeLogic}을 활용하여 각 소재의 핵심 모순을 분석하고 논리적 연결 고리를 만듭니다.` });
            steps.push({ header: '3단계 (결론/마무리)', content: `탐구 결과를 종합하여 실천적 대안을 제시합니다.` });
        }

        return {
            summary: {
                status: `${count}개의 소재를 활용한 ${format} 제작 단계`,
                material: materials,
                format: format,
                title: `${mainWork.title.split(' ')[0]} 속의 ${mainWork.topic.split(' ')[0]} 현상: ${activeLogic.split(' ')[0]}적 접근`
            },
            logic: {
                problem: `${mainWork.title}에서 발생하는 갈등은 구성원 간의 정보 전달이 왜곡되어 전체 시스템의 안정성이 깨진 상태를 의미합니다.`,
                perspective: `이러한 현상을 '${activeLogic}' 관점에서 분석하면, 단순한 감정적 갈등이 아니라 시스템의 입력과 출력 사이에서 발생하는 논리적 오류로 재정의할 수 있습니다.`
            },
            plan: { steps }
        };
    }
});

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

    function generateConsulting(performance, career) {
        // Subject-Specific Terminology (The "Subject Essence")
        const subjectEssence = {
            '문학': { terms: ['서사적 구조', '문학적 형상화', '비판적 성찰', '상징적 의미'], goal: '인간 소외 및 공동체 가치 회복' },
            '사회': { terms: ['사회 구조적 모순', '상호작용적 관점', '제도적 보완', '공익적 가치'], goal: '지속 가능한 사회 시스템 설계' },
            '과학': { terms: ['인과 관계의 정량화', '메커니즘 분석', '법칙의 보편성', '실증적 탐구'], goal: '자연 현상의 논리적 해명 및 기술적 응용' }
        };

        // Career as a "Perspective" (The "Tool")
        const careerPerspective = {
            '기계': '동역학적 제어 및 시스템 최적화',
            '화학': '물질 대사 및 분자적 상호작용',
            '인공지능': '알고리즘적 판단 및 지능형 모델링',
            '컴퓨터': '데이터 구조화 및 연산 효율성',
            '생명': '생체 시스템의 항상성 및 기전',
            '심리': '인지적 기제 및 행동 예측 모델'
        };

        // Detect Subject (Default to Literature/General)
        let subject = '문학';
        for (const key in subjectEssence) {
            if (performance.includes(key)) { subject = key; break; }
        }

        const essence = subjectEssence[subject];
        let perspective = '융합적 시각을 통한 시스템 보완';
        for (const key in careerPerspective) {
            if (career.includes(key)) { perspective = careerPerspective[key]; break; }
        }

        const perfKey = performance.split(' ').filter(w => w.length > 1)[0] || '탐구 대상';
        const mainTerm = essence.terms[0];
        const subTerm = essence.terms[1];

        return {
            title: `"${perfKey}에 나타난 ${mainTerm} 분석과 ${perspective}을 통한 문제 해결적 고찰"`,
            logic: `먼저 ${perfKey}의 ${mainTerm}와 ${subTerm}를 통해 해당 교과가 다루는 본질적인 가치인 '${essence.goal}'를 깊이 있게 분석했습니다. 이후, 이를 실질적으로 구현하거나 해결하기 위한 도구로서 ${career}의 '${perspective}' 관점을 도입하여 학문의 경계를 넘나드는 성찰을 시도했습니다.`,
            guide: {
                question: `"${perfKey} 속 인물/현상이 겪는 본질적 한계를 ${career}의 ${perspective} 관점에서 기술적으로 지지하거나 재해석할 수 있는 방안은 무엇인가?"`,
                execution: `단순한 기술 나열이 아니라, ${perfKey}의 시대적/공간적 맥락을 유지하면서도 ${perspective} 원리를 적용한 '개념 모델' 혹은 '가상 프로토타입' 제안`,
                killingPoint: `교과적 역량(비판적 읽기/분석)을 우선 증명한 후, 이를 바탕으로 진로 역량을 '해결책'으로 제시하는 논리 전개`
            },
            sample: `${perfKey}에 대한 깊이 있는 이해를 바탕으로 ${mainTerm}를 정교하게 분석함. 특히 작품 속 ${subTerm}를 인간 중심적 가치와 연결하여 성찰하는 태도가 돋보임. 더 나아가 이러한 인문학적 고민을 ${perspective}이라는 전공적 도구를 활용해 해결 방안으로 확장하며, 교과 지식과 진로 역량을 유기적으로 통합하는 탁월한 융합적 사고력을 보여줌.`
        };
    }

    generateBtn.addEventListener('click', async () => {
        const performance = performanceInput.value.trim();
        const career = careerInput.value.trim();

        if (!performance || !career) {
            alert('수행평가 내용과 희망 진로를 모두 입력해주세요!');
            return;
        }

        resultSection.classList.remove('hidden');
        loader.classList.remove('hidden');
        reportCard.classList.add('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });

        await new Promise(resolve => setTimeout(resolve, 2000));

        const analysis = generateConsulting(performance, career);
        
        document.getElementById('result-title').textContent = analysis.title;
        document.getElementById('result-logic').textContent = analysis.logic;
        
        const guideHtml = `
            <ul>
                <li><strong>인문학적/교과적 질문:</strong> ${analysis.guide.question}</li>
                <li><strong>실행 아이디어:</strong> ${analysis.guide.execution}</li>
                <li><strong>킬링 포인트:</strong> ${analysis.guide.killingPoint}</li>
            </ul>
        `;
        document.getElementById('result-guide').innerHTML = guideHtml;
        document.getElementById('result-sample').textContent = analysis.sample;

        loader.classList.add('hidden');
        reportCard.classList.remove('hidden');
    });
});

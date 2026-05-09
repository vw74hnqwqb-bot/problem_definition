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
            alert('모든 필드를 입력해주세요!');
            return;
        }

        resultSection.classList.remove('hidden');
        loader.classList.remove('hidden');
        reportCard.classList.add('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth' });

        await new Promise(resolve => setTimeout(resolve, 2000));

        const analysis = generateConsulting(subject, performance, career);
        
        document.getElementById('result-title').textContent = analysis.title;
        document.getElementById('result-logic').textContent = analysis.reason;
        
        const guideHtml = `
            <div class="fusion-step">
                <p style="margin-bottom: 1rem;">${analysis.perspective}</p>
                <div class="quote-box" style="background: rgba(99, 102, 241, 0.1); border-left-color: var(--accent);">
                    <strong>💡 구체적 탐구 제안:</strong> ${analysis.action}
                </div>
            </div>
        `;
        document.getElementById('result-guide').innerHTML = guideHtml;
        document.getElementById('result-sample').textContent = analysis.sample;

        loader.classList.add('hidden');
        reportCard.classList.remove('hidden');
    });

    function generateConsulting(subject, performance, career) {
        // Career Principles (Metaphorical Analysis Tools)
        const careerPrinciples = {
            '기계': { principle: '동역학적 균형과 구조적 효율 최적화', action: '성능 변수 간의 상관관계를 수치화하여 최적의 메커니즘을 도출하는 실험 설계' },
            '화학': { principle: '물질 간의 반응 평형과 에너지 효율적 전이', action: '반응 속도 조절 인자를 분석하여 최적의 반응 환경을 시뮬레이션하는 모델 구축' },
            '컴퓨터': { principle: '추상화를 통한 시스템 복잡도의 계층적 구조화', action: '문제 해결을 위한 조건부 알고리즘을 설계하고 데이터 흐름의 효율성을 검증' },
            '데이터': { principle: '정량적 지표를 활용한 현상의 패턴 가시화', action: '회귀 분석 혹은 확률 모델을 적용하여 변수 간의 숨겨진 상관관계를 도출' },
            '생명': { principle: '유기적 상호작용과 시스템적 항상성 유지', action: '외부 자극에 따른 생체 피드백 경로를 도식화하고 반응 메커니즘을 분석' },
            '디자인': { principle: '사용자 경험 중심의 시각적 정보 인터페이스 최적화', action: '심미성과 가독성을 결합한 인포그래픽을 제작하여 정보 전달의 효율성을 실험' },
            '심리': { principle: '인지적 편향과 인간 행동의 상관 기제 분석', action: '심리적 변수가 반영된 통계 데이터를 산출하여 행동 모델의 타당성을 검증' }
        };

        // Subject Contexts (Core Competencies)
        const subjectContexts = {
            '국어': '서사적 개연성 분석과 상징적 의미의 비판적 해석',
            '문학': '서사적 개연성 분석과 상징적 의미의 비판적 해석',
            '수학': '논리적 엄밀성과 추상적 수식을 활용한 문제 해결',
            '사회': '현상의 구조적 모순 파악과 유기적 상호작용의 이해',
            '과학': '실증적 탐구와 보편적 법칙의 논리적 적용',
            '물리': '역학적 에너지 보존과 힘의 평형 메커니즘 분석',
            '화학': '미시적 결합 원리와 물질의 에너지 변화 해석'
        };

        // Selection Logic
        let principleObj = { principle: '현상의 논리적 구조화와 시스템적 최적화', action: '핵심 변수를 추출하여 논리적인 인과관계를 증명하는 탐구 보고서 작성' };
        for (const key in careerPrinciples) {
            if (career.includes(key)) { principleObj = careerPrinciples[key]; break; }
        }

        const subjContext = subjectContexts[subject] || '교과 고유의 논리적 분석력과 지적 탐구심';
        const perfSnippet = performance.split(' ').filter(w => w.length > 1).slice(0, 3).join(' ') || '해당 활동';

        return {
            title: `[${subject}] ${perfSnippet}에 투영된 ${principleObj.principle.split(' ')[0]}적 고찰`,
            reason: `${performance} 과정에서 나타나는 구체적인 현상에 주목했습니다. 특히 ${perfSnippet}이 단순히 결과로 존재하는 것이 아니라, 그 기저에 어떤 논리적 흐름이 있는지 궁금해져 이를 학술적으로 정의해보고자 했습니다.`,
            perspective: `${subject} 시간의 ${subjContext} 역량을 기반으로, 이를 ${principleObj.principle} 관점에서 해부했습니다. ${performance}의 핵심 소재들을 유기적인 시스템의 구성 요소로 보고, 각 요소가 서로 어떻게 영향을 주고받는지 분석하는 틀을 마련했습니다.`,
            action: `${performance}의 구체적 사례를 바탕으로 ${principleObj.action}`,
            sample: `${performance}에 대한 탁월한 ${subjContext} 역량을 보여줌. 특히 현상을 표면적으로 수용하지 않고, ${principleObj.principle}을 바탕으로 문제를 입체적으로 구조화하는 깊이 있는 탐구 태도가 돋보임. 이를 통해 ${performance}의 복잡한 인과관계를 논리적으로 분석해내는 높은 학술적 역량을 증명함.`
        };
    }
});

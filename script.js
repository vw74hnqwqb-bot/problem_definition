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

        await new Promise(resolve => setTimeout(resolve, 1500));

        const result = generateConsulting(subject, performance, career);
        
        document.getElementById('result-consulting').textContent = result.advice;
        document.getElementById('result-tip').textContent = result.tip;

        loader.classList.add('hidden');
        reportCard.classList.remove('hidden');
    });

    function generateConsulting(subject, performance, career) {
        // Subject Concepts (Focus on Principles)
        const subjectData = {
            '수학': '함수의 변화율과 그래프적 해석',
            '국어': '텍스트의 논리적 구조와 설득 전략',
            '문학': '인물의 심리적 갈등과 서사적 개연성',
            '사회': '현상의 구조적 원인과 상호작용',
            '역사': '사건의 인과관계와 시대적 흐름',
            '과학': '현상의 인과적 메커니즘과 실험적 증명',
            '물리': '힘의 평형과 에너지 보존의 원칙',
            '영어': '언어적 소통의 맥락과 문화적 이해'
        };

        // Career Methodologies (Professional Tools)
        const careerTools = {
            '기계': '동역학적 설계와 부하 분산 시뮬레이션',
            '화학': '반응 평형 조절과 에너지 최적화 공정',
            '컴퓨터': '알고리즘적 추상화와 조건부 로직 설계',
            '데이터': '통계적 상관관계 분석과 시각화 모델링',
            '생명': '유기적 피드백 시스템과 항상성 분석',
            '경제': '게임 이론을 활용한 최적 의사결정 분석',
            '경영': '리스크 관리 지표 설정과 시스템 효율화',
            '디자인': '사용자 중심의 경험 설계와 시각적 인터페이스'
        };

        // Default or Match
        const concept = subjectData[Object.keys(subjectData).find(k => subject.includes(k))] || '교과 고유의 논리적 추론 과정';
        const tool = careerTools[Object.keys(careerTools).find(k => career.includes(k))] || '실무적 데이터 분석과 문제 해결 방법론';

        // Result Plan (Concrete Outputs)
        const plans = [
            '알고리즘 설계도와 가상 시뮬레이션 보고서',
            '변수 간 상관관계를 분석한 데이터 리포트',
            '현실적 모순을 해결하기 위한 정책 제안서',
            '현상의 원인을 정밀하게 해부한 메커니즘 도식화',
            '사용자 반응을 예측한 서비스 프로토타입 기획안'
        ];
        const plan = plans[Math.floor(Math.random() * plans.length)];

        // Generate Conversational Advice
        const advice = `${subject}에서 다루는 '${concept}'을 단순히 지식으로만 보지 말고, ${career} 분야에서 필수적인 '${tool}'의 관점으로 확장해 보는 것은 어떨까요? ${performance} 활동에서 발견한 핵심 문제를 이 실무적 방법론에 대입하여 '${plan}' 형태로 정리한다면 훨씬 전문적인 인상을 줄 수 있습니다. 특히 교과 지식이 실제 현장의 문제를 해결하는 실질적인 도구로 쓰이는 과정을 논리적으로 보여주는 방향을 추천합니다.`;
        
        const tip = `추상적인 결론보다는 '${tool.split(' ')[0]}'과 같은 전문적인 지표나 수치를 한두 개 정도 인용하여 보고서의 객관성을 높여보세요!`;

        return { advice, tip };
    }
});

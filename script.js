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
        // 1. [과목별 언어 필터링]
        const subjectFilters = {
            '인문사회': {
                detect: ['문학', '사회', '역사', '윤리', '지리', '언어', '비평'],
                terms: ['성찰', '비판적 시각', '가치', '맥락', '수용', '변화'],
                goal: '인간 중심의 가치 성찰과 맥락적 이해'
            },
            '자연공학': {
                detect: ['과학', '물리', '화학', '생명', '지구', '수학', '기술'],
                terms: ['메커니즘', '효율', '모델링', '인과관계', '최적화'],
                goal: '현상의 인과적 해명과 시스템적 효율화'
            }
        };

        // 2. [진로 키워드의 '동사'화]
        const careerVerbification = {
            '기계': '동역학적 에너지를 효율적으로 제어하고 구조적 안정성을 설계하는 시각',
            '화학': '물질의 효율적 결합과 반응을 설계하여 가치를 창출하는 시각',
            '컴퓨터': '복잡한 현상을 논리적 단계로 구조화하고 연산의 효율성을 극대화하는 사고',
            '인공지능': '데이터 속의 패턴을 정교하게 모델링하여 지능형 최적화를 구현하는 사고',
            '생명': '생체 시스템의 정교한 메커니즘을 분석하여 생명 현상을 제어하는 시각',
            '전자': '전자기적 신호의 흐름을 설계하여 정보 전달과 제어의 효율을 높이는 시각',
            '의학': '병태생리학적 인과관계를 추적하여 생명 유지의 최적화된 솔루션을 찾는 시각',
            '심리': '인지적 기제와 행동의 상관관계를 모델링하여 인간 마음의 메커니즘을 읽는 시각',
            '경제': '희소한 자원의 효율적 배분을 위한 시장 모델링과 최적의 의사결정 시각',
            '경영': '조직의 시스템적 효율을 극대화하고 리스크를 정량적으로 관리하는 시각'
        };

        // Detect Subject Category
        let category = '인문사회';
        for (const cat in subjectFilters) {
            if (subjectFilters[cat].detect.some(d => performance.includes(d))) {
                category = cat;
                break;
            }
        }

        const filter = subjectFilters[category];
        const mainTerm = filter.terms[0];
        const subTerm = filter.terms[1];

        // Verbify Career
        let verbifiedCareer = '학문적 원리를 실무적 해결책으로 치환하는 시각';
        for (const key in careerVerbification) {
            if (career.includes(key)) {
                verbifiedCareer = careerVerbification[key];
                break;
            }
        }

        const perfKey = performance.split(' ').filter(w => w.length > 1)[0] || '해당 소재';

        // 3. [문제 정의의 '브릿지' 공식] 적용
        const bridgeLogic = `${perfKey}에 내재된 [${mainTerm}과 ${subTerm}]이라는 문제를 해결하기 위해, ${career}의 [${verbifiedCareer}]을 관점으로 빌려와서 [학제간 융합적 성찰이 담긴 새로운 대안]을 제시합니다.`;

        return {
            title: `"${mainTerm}적 성찰로 본 ${perfKey}: ${career}의 ${subTerm} 모델을 통한 재해석"`,
            logic: bridgeLogic,
            guide: {
                question: `"${perfKey}이 지닌 '${mainTerm}'의 결핍을 ${career}의 '${subTerm}' 관점에서 보완할 수 있는 논리적 모델은 무엇인가?"`,
                execution: `단순한 지식 결합을 넘어, ${perfKey}의 고유한 맥락 속에서 [${verbifiedCareer}]을 적용하여 정량적/논리적 해결 모델을 제안하는 보고서 작성`,
                killingPoint: `교과 특유의 '${mainTerm}' 역량을 먼저 입증한 후, 이를 ${career}의 '${subTerm}'이라는 관점으로 해결해 나가는 '문제 해결형 지적 확장' 강조`
            },
            sample: `${perfKey}에 나타난 ${mainTerm}을 분석하며 학제간 융합의 필요성을 인식함. 특히 해당 문제의 해법을 찾기 위해 ${career} 분야의 '${verbifiedCareer}'을 도입하여 사고를 확장한 점이 인상적임. 교과 고유의 '${subTerm}' 역량과 전공적 통찰을 유기적으로 연결하여, 현상을 다각도에서 모델링하고 최적의 대안을 도출하는 탁월한 융합적 역량을 증명함.`
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
                <li><strong>융합적 핵심 질문:</strong> ${analysis.guide.question}</li>
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

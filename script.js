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
        // Concept Mapping for Professionalism (Avoids direct major names)
        const conceptMap = {
            '기계': ['동역학적 메커니즘', '구조적 안정성', '최적 설계 원리'],
            '화학': ['반응 속도론', '분자 간 상호작용', '에너지 효율 최적화'],
            '생명': ['생화학적 대사 경로', '유전자 발현 조절', '효소 반응 메커니즘'],
            '전기': ['회로 소자 특성', '신호 처리 알고리즘', '전자기적 간섭 제어'],
            '전자': ['반도체 물리', '임베디드 시스템 설계', '제어 시스템'],
            '컴퓨터': ['알고리즘 복잡도', '데이터 구조 효율화', '추상화 모델링'],
            '인공지능': ['신경망 최적화', '확률적 모델링', '패턴 인식 알고리즘'],
            '소프트웨어': ['객체 지향 설계', '시스템 아키텍처', '코드 리팩토링'],
            '의학': ['병태생리학적 기전', '임상 데이터 분석', '생체 신호 해석'],
            '경제': ['미시적 의사결정 모델', '시장 동태적 분석', '게임 이론'],
            '경영': ['조직 행동론', '공급망 최적화', '데이터 기반 리스크 관리'],
            '심리': ['인지 편향 메커니즘', '신경 심리학적 근거', '행동 모델링']
        };

        // Find relevant concepts based on input
        let concepts = ['시스템적 최적화', '현상에 대한 정량적 분석', '논리적 추론 모델'];
        for (const key in conceptMap) {
            if (career.includes(key)) {
                concepts = conceptMap[key];
                break;
            }
        }

        const perfKey = performance.split(' ').filter(w => w.length > 1)[0] || '해당 소재';
        const mainConcept = concepts[0];
        const subConcept = concepts[1];

        return {
            title: `"${mainConcept} 관점에서 재해석한 ${perfKey} - ${subConcept}을 통한 심화 고찰"`,
            logic: `${perfKey}의 기저에 깔린 현상을 ${mainConcept} 및 ${subConcept}의 관점에서 분석했습니다. 단순한 지식의 나열이 아니라, 인문학적 배경지식이 기술적/과학적 원리로 어떻게 치환될 수 있는지 탐구하여 학문적 호기심의 확장을 보여주는 구조입니다.`,
            guide: {
                bridge: `${mainConcept}, ${subConcept}, 정량적 모델링`,
                execution: `[${subConcept}]을 적용한 가상 시뮬레이션을 수행하거나, 관련 데이터를 수집하여 [시스템 최적화]를 위한 변수 간 상관관계를 도출하는 보고서 작성`,
                killingPoint: `기존의 보편적 해석을 넘어, 본인만의 '공학적/학문적 프레임워크'를 적용하여 결과를 도출하는 과정 포함`
            },
            sample: `${perfKey}를 다루는 과정에서 발생한 학문적 호기심을 ${mainConcept}의 관점으로 확장하여 탐구함. 특히 ${subConcept} 원리를 적용하여 현상을 정량적으로 분석하려는 시도가 돋보였으며, 이를 통해 복잡한 시스템을 논리적으로 구조화하는 탁월한 역량을 보여줌.`
        };
    }

    // Update the UI update logic slightly to handle the new guide format
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
                <li><strong>키워드 브릿지:</strong> ${analysis.guide.bridge}</li>
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

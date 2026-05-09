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
        
        // Step 1
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
                <div style="color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;">${s.header}</div>
                <p>🖼️ <strong>이미지 제안:</strong> ${s.image}</p>
                <p>✍️ <strong>카피/기획:</strong> ${s.copy}</p>
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
        // Deep Database with Specific Scenes
        const db = {
            '문학': [
                { title: "『변신』 (프란츠 카프카)", summary: "벌레가 된 주인공을 통해 존재의 소외를 고발함", scene: "주인공 그레고르가 벌레로 변한 자신을 보고도 출근 걱정을 하며 비틀거리는 침대 위 장면" },
                { title: "『멋진 신세계』 (올더스 헉슬리)", summary: "기술적 통제가 인간성을 말살하는 사회", scene: "부화-조건반사 교육 센터에서 아이들이 책과 꽃에 접근하면 전기 충격을 주는 인위적 학습 장면" },
                { title: "『난장이가 쏘아올린 작은 공』 (조세희)", summary: "도시 빈민의 절망과 계급 갈등", scene: "철거 계고장을 받은 난장이 아버지가 굴뚝 위에서 종이비행기를 날리며 무력감을 표출하는 장면" },
                { title: "『침묵의 봄』 (레이첼 카슨)", summary: "살충제로 인해 노래하는 새들이 사라진 마을", scene: "아무런 소리도 들리지 않는 기이한 고요가 지배하게 된 봄날의 마을 풍경 묘사" }
            ],
            '과학': [
                { title: "엔트로피 법칙", summary: "에너지는 무질서가 증가하는 방향으로 흐름", scene: "뜨거운 커피가 차갑게 식으며 열에너지가 공기 중으로 퍼져나가는 비가역적 과정" },
                { title: "생태계 먹이사슬", summary: "종 간의 상호작용으로 유지되는 균형", scene: "특정 포식자의 소멸로 인해 초식 동물이 과잉 번식하여 숲이 황폐화되는 연쇄 반응" }
            ]
        };

        const careerPrinciples = {
            '기계': { concept: "항복점(Yield Point)과 탄성 계수", logic: "외부 압력이 한계를 넘었을 때 회복 불가능한 변형이 일어나는 지점", map: "주인공이 사회적 압박을 견디다 못해 인간성을 상실하는 '변형'의 순간" },
            '화학': { concept: "반응 속도 조절 인자와 평형 이동", logic: "온도나 농도 변화에 따라 반응의 방향이 결정되는 메커니즘", map: "사회적 환경의 변화가 인물들 간의 갈등 농도를 어떻게 급격히 변화시키는지 분석" },
            '컴퓨터': { concept: "재귀적 알고리즘과 탈출 조건", logic: "특정 조건을 만족할 때까지 자기 자신을 호출하며 반복하는 구조", map: "소설 속 인물들이 반복적으로 겪는 비극적 상황과 이를 깨기 위한 '탈출 조건'의 부재" },
            '데이터': { concept: "이상치(Outlier) 감지와 필터링", logic: "전체 경향성에서 벗어난 데이터를 처리하는 방식", map: "집단 내에서 소외된 인물(이상치)을 사회적 시스템이 어떻게 배제하고 삭제하는지 분석" },
            '의학': { concept: "염증 반응과 면역 결핍", logic: "외부 침입자에 대항하는 방어 기제와 그것이 무너지는 현상", map: "사회의 구조적 모순(침입자)에 대항하는 개인의 심리적 방어벽이 무너지는 병태생리학적 고찰" }
        };

        const isScience = performance.includes('과학') || subject.includes('과학');
        const activeDb = isScience ? db['과학'] : db['문학'];
        const count = performance.match(/(\d+)개/) ? parseInt(performance.match(/(\d+)개/)[1]) : 1;
        
        let principle = { concept: "구조적 안정성과 하중 분산", logic: "무게를 효율적으로 분산하여 붕괴를 막는 원리", map: "인물 간의 심리적 하중이 특정 개인에게 집중되어 파멸에 이르는 과정" };
        for (const key in careerPrinciples) {
            if (career.includes(key)) { principle = careerPrinciples[key]; break; }
        }

        // Step 1
        let step1 = null;
        if (performance.includes('조사') || performance.includes('추천')) {
            step1 = '<div class="summary-list" style="display: flex; flex-direction: column; gap: 1rem;">';
            for(let i=0; i<Math.max(count, 2); i++) {
                const item = activeDb[i % activeDb.length];
                step1 += `
                    <div class="step">
                        <strong>📌 ${item.title}</strong>
                        <p style="margin: 0.5rem 0;">• 줄거리: ${item.summary}</p>
                        <p style="margin: 0;">• 핵심 장면: ${item.scene}</p>
                    </div>`;
            }
            step1 += '</div>';
        }

        const selected = activeDb[0];
        const format = performance.includes('카드뉴스') ? '카드뉴스' : '보고서';

        const planSteps = [];
        if (format === '카드뉴스') {
            planSteps.push({ header: 'Slide 1 (도입)', image: `어두운 방 안, 유일하게 켜진 전구 아래 웅크린 실루엣`, copy: `"당신이 버티고 있는 그 지점은 안전합니까?" - ${selected.title.split(' ')[0]} 속의 위험한 경계` });
            planSteps.push({ header: 'Slide 2-3 (분석)', image: `팽팽하게 당겨진 고무줄이 끊어지기 직전의 클로즈업`, copy: `${selected.scene}에서 발견한 '${principle.concept}'. 인물의 심리가 회복 불가능한 '항복점'에 도달했음을 증명` });
            planSteps.push({ header: 'Slide 4 (결론)', image: `부서진 조각들이 다시 모여 새로운 형태를 만드는 추상화`, copy: `구조적 안정을 위해 우리가 서로 나누어야 할 '하중'의 가치 제안` });
        } else {
            planSteps.push({ header: '서론', image: `회색빛 도시 위로 날아가는 종이비행기`, copy: `${selected.title}을 통해 본 현대 사회의 구조적 취약성` });
            planSteps.push({ header: '본론', image: `현미경으로 들여다본 복잡한 결정체`, copy: `'${principle.concept}'의 관점에서 본 인물들의 갈등 양상 1:1 대입 분석` });
            planSteps.push({ header: '결론', image: `멀리서 비치는 따뜻한 빛`, copy: `시스템적 보완을 넘어선 인간성 회복의 가능성` });
        }

        return {
            step1,
            step2: { material: selected.title, problem: `${selected.scene}에서 나타나듯, 주인공의 고통은 개인의 결함이 아닌 사회 시스템의 '설계 오류'에서 기인합니다.` },
            step3: { content: `${career} 분야에서 다루는 **'${principle.concept}'**의 관점에서 이 상황을 분석했습니다. 소설 속 ${selected.scene}은 인물이 견딜 수 있는 심리적 하중이 '${principle.logic}'에 도달했음을 상징하며, 이는 단순한 비극이 아닌 시스템의 붕괴를 예고하는 명확한 지표입니다.` },
            step4: { steps: planSteps }
        };
    }
});

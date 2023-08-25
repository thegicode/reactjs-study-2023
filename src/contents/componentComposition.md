## Component Composition (컴포넌트 합성)

Component Composition은 React의 핵심 개념 중 하나로, 컴포넌트를 조합하여 더 복잡한 UI를 구축하는 방법을 의미합니다. 이는 React의 "컴포넌트는 재사용 가능한 조각들로 UI를 구성하는 것"이라는 기본 철학과 맞닿아 있습니다.

### Component Composition의 핵심 아이디어:

1. **재사용성**: 작은 컴포넌트를 만들어 그것들을 조합하여 더 큰 컴포넌트를 생성합니다.
2. **명확성**: 각 컴포넌트는 단일 책임 원칙 (Single Responsibility Principle)을 따라야 합니다. 즉, 하나의 기능만을 수행해야 합니다.
3. **유연성**: 컴포넌트는 서로 다른 컨텍스트에서 재사용 될 수 있어야 합니다.

### Prop Drilling과 관련하여 Component Composition이 어떻게 도움이 되는가?

"Prop Drilling"은 어떤 정보나 콜백 함수가 여러 레벨의 중첩된 컴포넌트를 통해 전달되어야 할 때 발생하는 문제를 의미합니다. 이로 인해 코드가 불필요하게 복잡해지며, 재사용성이 저하될 수 있습니다.

Component Composition을 통해 이 문제를 완화할 수 있습니다:

1. **상위 및 하위 컴포넌트 분리**: 공통적으로 사용되는 로직이나 UI 조각을 별도의 컴포넌트로 분리하면, props를 더 적게 전달하게 되어 Prop Drilling 문제를 감소시킬 수 있습니다.
2. **children prop 활용**: React는 `children` prop을 기본적으로 제공합니다. 이를 통해 컴포넌트를 더 유연하게 조합할 수 있으며, 특정 데이터나 함수를 깊게 전달하지 않아도 원하는 위치에서 컴포넌트를 렌더링할 수 있습니다.

```jsx
function ParentComponent({ data }) {
    return (
        <ChildComponent>
            <GrandChildComponent data={data} />
        </ChildComponent>
    );
}

function ChildComponent({ children }) {
    return <div>{children}</div>;
}
```

<br/>

---

<br/>

컨텍스트(Context) 사용: React의 Context API는 Prop Drilling 문제를 해결하기 위한 좋은 방법입니다. 상위 컴포넌트에서 데이터를 제공하면, 하위 컴포넌트에서는 이 데이터에 직접 접근할 수 있습니다.

결국, Component Composition은 React 애플리케이션의 구조와 유지 보수성을 개선하며 Prop Drilling 같은 문제를 최소화하는 데 큰 도움을 줍니다.

# 유저 폼 관리 과제(과제3)

## 🛠️ 사용 기술

- React
- TypeScript
- React Hook Form
- CSS

  <br/>

## 📚 React Hook Form 사용 이유

일반적인 form 관리 대신 React Hook Form을 선택한 이유는 다음과 같습니다:

2. **간편한 유효성 검사**: 복잡한 유효성 검사를 쉽게 구현할 수 있습니다.
3. **에러 처리**: 에러 상태를 쉽게 관리하고 사용자에게 실시간으로 피드백을 제공할 수 있습니다.

  <br/>

## 🔍 중복 닉네임 검증 구현 방식

중복 닉네임 검증은 다음과 같이 구현했습니다:

```typescript
const validateDuplicateName = (name: string, index: number) => {
  if (!name) return true;
  const formUsers = formValues.users || [];
  return !formUsers.some(
    (user: any, i: number) => i !== index && user && user.name === name
  );
};
```

이 방식을 선택한 이유:

1. **실시간 검증**: 사용자가 입력하는 즉시 검증이 이루어집니다.
2. **자기 자신 제외**: 현재 폼의 인덱스를 제외하고 검사하여 자기 자신과 중복 판정되지 않도록 했습니다.

<br/>

## 🚧 구현 중 마주친 이슈

### 3. addUser 함수 실행 시 기존 유저 데이터 손실 이슈

#### 문제 상황

중복 이름 검사 기능을 추가한 후, 새로운 유저를 추가할 때 기존에 입력했던 유저 데이터가 모두 초기화되는 문제가 발생했습니다.

#### 원인 분석

이 문제는 React 상태(`useState`)와 React Hook Form의 상태 관리 방식이 분리되어 있기 때문에 발생했습니다:

1. **상태 관리 불일치**:

   - `users` 상태는 React의 `useState`로 관리
   - 폼 데이터는 React Hook Form 내부에서 관리
   - 두 상태가 독립적으로 동작하여 동기화 문제 발생

2. **addUser 함수 실행 흐름**:
   ```typescript
   const addUser = () => {
     const newId = Date.now().toString() + Math.floor(Math.random() * 1000);
     setUsers([...users, { id: newId, name: "", password: "" }]);
   };
   ```
   - 이 함수는 React의 `users` 상태만 업데이트하고 React Hook Form의 폼 데이터는 업데이트하지 않음
   - 결과적으로 React Hook Form은 갱신된 `users` 배열을 인식하지 못함

#### 해결 방법

React Hook Form의 기존 값을 불러온 후 React의 상태값과 동기화했습니다:

```typescript
const addUser = () => {
  const newId = Date.now().toString() + Math.floor(Math.random() * 1000);

  // 현재 React Hook Form의 값을 먼저 가져옴
  const currentFormUsers = [...(formValues.users || [])];

  // 신규 유저 추가
  const newUsers = [...currentFormUsers, { id: newId, name: "", password: "" }];
  // React 상태 값 업데이트
  setUsers(newUsers);

  // React Hook Form의 값도 업데이트
  setValue("users", newUsers);
};
```

성과:

1. **상태 일관성**: React 상태와 폼 상태가 항상 동기화됨
2. **데이터 보존**: 기존 사용자 데이터 유지

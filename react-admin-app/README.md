yarn 설치
yarn dev 실행

# Install Flowbite React

```
yarn add flowbite flowbite-react
```

# /src/css/tailwind.config.js

```
module.exports = {
  content: [
    ...,
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [..., require('flowbite/plugin')],
  ...
};
```

# 버튼 추가

```
import { Button } from 'flowbite-react';
<Button size="xs">Click Me!</Button>
```

# 페이지 추가

App.jsx 라우터 추가
pages 폴더에 페이지 컴포넌트 추가 및 수정
partials 폴더에 페이지에서 사용하는 컴포넌트 추가 및 수정

# json-server 설치

```
yarn add json-server
```

### package.json 추가

```
"server": "json-server --port 3001 --watch db.json"
```

### db.json 수정

```
{
  "users": [
    {
      "id": 1,
      "email": "oopchoi@gmail.com",
      "name": "Choi",
      "password": "1111"
    },
    {
      "id": 2,
      "email": "bryan@gmail.com",
      "name": "Bryan",
      "password": "1111"
    },
    {
      "email": "choi@gmail.com",
      "name": "Choi",
      "password": "1111",
      "id": 3
    }
  ],
  "codes": [
    {
      "id": 1,
      "code": "OD0100",
      "description": "주문상태",
      "order_no": 1,
      "parent_code": 0
    },
    {
      "id": 2,
      "code": "OD0101",
      "parent_code": "OD0100",
      "description": "결제완료",
      "order_no": 1
    },
    {
      "id": 3,
      "code": "OD0102",
      "parent_code": "OD0100",
      "description": "상품준비중",
      "order_no": 2
    },
    {
      "id": 4,
      "code": "OD0103",
      "parent_code": "OD0100",
      "description": "배송중",
      "order_no": 3
    },
    {
      "id": 5,
      "code": "OD0104",
      "parent_code": "OD0100",
      "description": "배송완료",
      "order_no": 4
    },
    {
      "id": 6,
      "code": "OD0105",
      "parent_code": "OD0100",
      "description": "구매확정",
      "order_no": 5
    },
    {
      "code": "OD0106",
      "parent_code": "OD0100",
      "description": "환송완료",
      "order_no": 6,
      "id": 7
    },
    {
      "code": "MB0100",
      "description": "회원등급",
      "order_no": 2,
      "parent_code": 0,
      "id": 8
    }
  ]
}
```

# 로그인 기능

## react-hook-form, @hookform/error-message : 폼 유효성 검증과 전송을 위한 목적

```
yarn add react-hook-form @hookform/error-message
```

1. 로그인 화면에서 이메일과 비밀번호를 서버로 전송하고 성공하면 메인 화면으로 리다이렉트 한다.
2. 로그아웃 상태에서 메인 페이지나 공통코드 관리 페이지를 들어가려고 할 때 로그인 페이지로 이동 시키고 로그인 하면 해당 페이지로 이동한다.

## axios : 서버 데이터를 요청하기 위한 목적

```
yarn add axios
```

1. 로그인 요청 뿐만 아니라 서버로 요청하기 위한 모든 api 호출을 공통으로 관리한다. (/src/api/)
2. 훅이나 특정 화면에서 api를 사용할 수 있다.

## zustand : 공통으로 호출되는 훅에서 사용하는 데이터를 한 곳에서 관리하기 위한 목적

```
yarn add zustand
```

1. 스토어를 훅으로 제공하므로 어디서나 동일하게 접근할 수 있도록 한다.

# 공통코드 관리

## @tanstack/react-query : 공통코드 관리 화면을 들어가면 즉시 목록 데이터를 조회하는 목적 (캐싱 기능)

```
yarn add @tanstack/react-query
```

1. 공통코드 관리 화면을 들어가면 즉시 상위 코드 목록을 조회한다.
2. 공통코드 목록의 행에 삭제 버튼을 제공하고 해당 상위 공통코드를 삭제한다.
3. 목록에서 코드를 클릭하면 상세 팝업을 띄우고 정보를 보여준다.
4. 상세 팝업에서 정보를 수정할 수 있다.

## 애플리케이션 서버 API

### 조회 API (GET)

1. 사용자 목록 조회 : http://localhost:3001/users?\_page=1&\_limit=2&\_sort=id&\_order=desc
2. 사용자 상세 조회 : http://localhost:3001/users/1
3. 사용자 상세 조회 (email) : http://localhost:3001/users?email=oopchoi@gmail.com
4. 공통코드 목록 조회 (상위) : http://localhost:3001/codes?parent_code=ROOT&\_page=1&\_limit=10&\_sort=order_no&\_order=desc
5. 공통코드 목록 조회(하위) : http://localhost:3001/codes?parent_code=OD0100&\_page=1&\_limit=2&\_sort=order_no&\_order=desc
6. 공통코드 상세 조회 : http://localhost:3001/codes?code=OD0101

### 추가 API (POST)

1. 사용자 추가 : http://localhost:3001/users/

```
{
    "email": "aaa@gmail.com",
    "name": "Aaa",
    "password": "1111"
}
```

2. 공통코드 추가 (상위) : http://localhost:3001/codes

```
{
    "code": "MB0100",
    "description": "회원등급",
    "order_no": 2,
    "parent_code": "ROOT"
}
```

3. 공통코드 추가 (하위) : http://localhost:3001/codes

```
{
    "code": "OD0106",
    "parent_code": "OD0100",
    "description": "구매확정",
    "order_no": 6
}
```

### 수정 API (PUT)

1. 사용자 수정 : http://localhost:3001/users/3

```
{
    "email": "choi@gmail.com",
    "name": "Choi",
    "password": "1111"
}
```

2. 공통코드 수정 : http://localhost:3001/codes/7

```
{
    "code": "OD0106",
    "parent_code": "OD0100",
    "description": "환송완료",
    "order_no": 6
}
```

### 삭제 API (DELETE)

1. 사용자 삭제 : http://localhost:3001/users/3
2. 공통코드 삭제 : http://localhost:3001/codes/7

# 공통코드 관리 페이지 개발

## 목록 조회

Codex.jsx 페이지에 검색 컴포넌트를 추가하고 하위 컴포넌트로 CodeCard.jsx 컴포넌트에게 keyword prop을 전달하면 CodeCard 컴포넌트에서 해당 키워드를 사용하여 데이터를 조회한다.
useQuery를 마운트 시 자동 호출 되지 않도록 enalbled를 false로 세팅하고 queryCliet를 사용하여 keyword prop이 변경될 때만 호출하도록 처리한다.

# 참고 자료

1. flowbite 컴포넌트 : https://flowbite.com/docs/components/alerts/
2. 크롬 개발자도구 에러 방지 : https://www.ghostery.com/

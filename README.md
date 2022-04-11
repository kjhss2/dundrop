# Dundrop

## 프로젝트 소개
개인프로젝트용 던전앤파이터 아이템 드랍정보 검색 사이트 www.dundrop.xyz
- 프론트엔드 : react
- 배포 서버 : AWS(EC2, Route 53, Linux)
- 웹 서버 SW : nginx

## 반영하고 싶은 기능 및 라이브러리
1. TypeScript
2. 반응형 UI(@mediaQuery)
3. Dark Mode

## 1.0 Beta 버전 개발 : 2022.04.01 ~ 2022.04.14
1. Neople API 사용
2. 빠른 Beta 버전 개발을 위한 No-Server로 개발(개발/배포시 proxy 적용)
3. Tag, 부위별 105레벨 아이템 목록 및 드랍 정보 검색 기능
4. 캐릭터 타임라인을 이용한 획득/미획득 아이템 구분
5. SSL 적용

## 1.0 버전 이후 작업
1. 서버 사용(spring boot or node)
2. DB 사용(Mysql or 클라우드 DB)
3. SSR 적용(next.js)
4. 빠른 검색을 위한 SEO 적용
5. 모바일 버전 App 개발(react-native)
6. 나의 장비 세팅 공유 기능
7. 댓글, 답글 기능

## 작업 내역
### 22.04.01
1. 초기 프로젝트 구성

### 22.04.06
1. 아이템 검색(105렙) Tag 검색 구현(30%)

### 22.04.07
1. 아이템 검색(105렙) Tag 검색 구현(100%)
2. 아이템 검색(105렙) 드랍 정보 데이터 입력(100%)
3. 아이템 검색(105렙) 장비 유형 필터 구현(100%)
4. 장비유형, Tag 변경 시 즉시 조회(100%)
5. 선택한 Tag bold 처리(100%)

## 22.04.08
1. 검색한 캐릭터 보유 아이템 표시 기능(100%)
2. Skeleton LoadingView 작성(100%)
3. 캐릭터 검색 - Tab 간 이동 아이템 검색 필터 유지 처리(50%)
4. 캐릭터 검색 - 획득한 아이템만 정렬 기능

## 22.04.09
1. 캐릭터 검색 조건 변경 : Match -> Like(100%)
2. 나의 보유 아이템 전체 시트 보기(100%)
3. 타임라인 next 데이터 조회(100%)
4. 나의 장착 아이템

## 22.04.10
1. #아칸 Tag 추가(100%)
2. #크리티컬 히트 Tag 추가 - 던파공홈 사용자 요청사항(100%)
3. 캐릭터 장착 아이템 TAG 요약 업데이트(100%)
4. 보유 아이템 TAG 요약 업데이트(100%)

## todolist
- 필터 초기화 버튼
- 모험단 검색 기능
- 노블레스 코드 캐릭터별 보유 아이템 표시 기능
- 반응형 화면 구현(웹/모바일)

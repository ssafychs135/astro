---
title: "고성능 RAG 시스템 구축 시 발생하는 컨텍스트 오버플로우 해결"
description: "방대한 양의 기술 문서를 다루는 RAG(Retrieval-Augmented Generation) 시스템에서 정확도를 높이기 위한 청킹 전략과 랭킹 알고리즘 최적화 기록입니다."
pubDate: 2026-04-01
category: "AI Engineering"
tags: ["LLM", "RAG", "Optimization"]
---

### 🔍 문제 상황
수만 페이지의 사내 기술 문서를 임베딩하여 검색하는 과정에서, 관련성 낮은 문서들이 컨텍스트 윈도우를 차지하여 답변의 질이 저하되는 현상이 발생했습니다.

### 🛠 해결 방법: Multi-stage Retrieval
단순 유사도 검색 대신, 2단계 재랭킹(Reranking) 과정을 도입했습니다.

```python
# Re-ranking logic using Cross-Encoder
def get_refined_context(query, initial_results):
    scores = reranker.predict([(query, doc) for doc in initial_results])
    # 상위 3개의 고득점 문서만 선택하여 LLM에 전달
    return sorted(zip(initial_results, scores), key=lambda x: x[1], reverse=True)[:3]
```

### ✅ 결과
답변의 정확도가 기존 대비 약 35% 향상되었으며, 불필요한 토큰 소비를 줄여 운영 비용을 절감했습니다.

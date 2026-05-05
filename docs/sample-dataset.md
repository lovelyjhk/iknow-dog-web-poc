# AIHub 반려견 보행영상 샘플 데이터셋 메모

원본 파일: `C:\Users\lovel\pet\Sample (2).zip`

이 ZIP은 Git에 커밋하지 않는다. 로컬 검사 위치는 `.local/sample-dataset`이며 `.gitignore`에 포함했다.

## 확인 결과

| 항목 | 값 |
|---|---:|
| ZIP 크기 | 약 484 MB |
| JPG 프레임 | 1,023 |
| JSON 라벨 | 1,023 |
| 라벨 평균 키포인트 수 | 약 10.4 |
| 라벨 최소/최대 키포인트 수 | 4 / 13 |
| 병원 | 잠실동물병원, SNC동물병원, 치료멍멍동물병원 |
| 뷰 | Front, Back, Left, Right |

## 구조

```text
5.Sample/
  1.원천데이터/
    1기/{촬영일시}/{뷰}/*.jpg
  2.라벨링데이터/
    1기/{촬영일시}/{뷰}/*.json
```

## JSON 주요 필드

```json
{
  "image_info": {
    "filename": "잠실_2024_08_30_17_12_30_00119",
    "hospital": "잠실동물병원",
    "file_format": "jpg",
    "resolution": "1920X1080"
  },
  "annotation_info": [
    { "x": "0.5600961538461539", "y": "0.2403846153846154", "label": "Ear" }
  ],
  "pet_medical_record_info": [
    { "foot_position": "left", "value": 1 },
    { "foot_position": "right", "value": 0 }
  ],
  "sensor_values": []
}
```

## 현재 POC에서 쓰는 방법

1. 키포인트 라벨 파서 검증
2. 프레임 단위 이상 보행 시각화 검증
3. `pet_medical_record_info` 기반 좌/우 발 상태 샘플링
4. Python AI Worker의 전처리 테스트 데이터

정식 모델 학습에는 전체 `71878 반려견 보행영상 기반 건강관리 데이터`의 승인/다운로드와 이용약관 확인이 필요하다.

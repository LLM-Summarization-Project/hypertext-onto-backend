// src/ontology/ontology.data.ts
export const DEMO_ONTOLOGY = {
  "word": "file1",
  "relations": [
    {
      "target": "ลงทุน",
      "weight": 0.88,
      "relations": [
        {
          "target": "เงินเฟ้อ",
          "weight": 1.53,
          "relations": [
            {
              "target": "ธนาคารกลาง",
              "weight": 2.11
            },
            {
              "target": "ราคาสินค้า",
              "weight": 2.98
            },
            {
              "target": "เศรษฐกิจ",
              "weight": 1.58
            },
            {
              "target": "คุณภาพชีวิต",
              "weight": 1.07
            },
            {
              "target": "ปริมาณเงิน",
              "weight": 2.5
            },
            {
              "target": "เงินเฟ้อ",
              "weight": 2.47
            },
            {
              "target": "มาตรการ",
              "weight": 0.36
            },
            {
              "target": "กำลังซื้อ",
              "weight": 2.65
            },
            {
              "target": "ต้นทุนการผลิต",
              "weight": 2.04
            },
            {
              "target": "ผลกระทบ",
              "weight": 0.65
            }
          ]
        },
        {
          "target": "ความมั่นคงทางการเงิน",
          "weight": 0.42,
          "relations": [
            {
              "target": "วางแผนระยะยาว",
              "weight": 2.21
            }
          ]
        },
        {
          "target": "ความรับผิดชอบ",
          "weight": 0.5,
          "relations": [
            {
              "target": "สังคม",
              "weight": 2.88
            }
          ]
        }
      ]
    },
    {
      "target": "หุ้น",
      "weight": 2.48,
      "relations": [
        {
          "target": "เศรษฐกิจ",
          "weight": 2.44,
          "relations": [
            {
              "target": "รัฐบาล",
              "weight": 1.58
            }
          ]
        }
      ]
    },
    {
      "target": "การเงิน",
      "weight": 1.68,
      "relations": [
        {
          "target": "การเก็บเงิน",
          "weight": 2.76,
          "relations": [
            {
              "target": "การวางแผน",
              "weight": 2.02
            },
            {
              "target": "ลดความเครียด",
              "weight": 1.44
            },
            {
              "target": "ความมั่นคงทางการเงิน",
              "weight": 2.67
            },
            {
              "target": "ความรับผิดชอบ",
              "weight": 0.48
            }
          ]
        },
        {
          "target": "ความเสี่ยง",
          "weight": 2.22,
          "relations": [
            {
              "target": "ความน่าจะเป็น",
              "weight": 1.62
            },
            {
              "target": "การลงทุน",
              "weight": 1.6
            },
            {
              "target": "การตัดสินใจ",
              "weight": 0.28
            },
            {
              "target": "การกระจายความเสี่ยง",
              "weight": 0.23
            }
          ]
        },
        {
          "target": "ความมั่นคงทางการเงิน",
          "weight": 2.93,
          "relations": [
            {
              "target": "เงินสำรอง",
              "weight": 0.94
            },
            {
              "target": "ความเสี่ยง",
              "weight": 1.27
            },
            {
              "target": "การจัดการเงิน",
              "weight": 1.04
            },
            {
              "target": "รายได้",
              "weight": 2.22
            }
          ]
        },
        {
          "target": "การใช้จ่าย",
          "weight": 0.11,
          "relations": [
            {
              "target": "งบประมาณ",
              "weight": 2.41
            },
            {
              "target": "ความมั่นคง",
              "weight": 2.07
            },
            {
              "target": "ความจำเป็น",
              "weight": 0.07
            },
            {
              "target": "การจัดการ",
              "weight": 0.14
            },
            {
              "target": "การออม",
              "weight": 1.25
            }
          ]
        },
        {
          "target": "การวางแผน",
          "weight": 0.86,
          "relations": [
            {
              "target": "ระบบ",
              "weight": 0.83
            },
            {
              "target": "ความมั่นใจ",
              "weight": 2.39
            },
            {
              "target": "ประสิทธิภาพ",
              "weight": 0.89
            }
          ]
        },
        {
          "target": "การลงทุน",
          "weight": 1.52,
          "relations": [
            {
              "target": "มูลค่า",
              "weight": 0.76
            },
            {
              "target": "เงิน",
              "weight": 2.89
            },
            {
              "target": "การลงทุน",
              "weight": 1.56
            },
            {
              "target": "ความเสี่ยง",
              "weight": 1.81
            },
            {
              "target": "วางแผน",
              "weight": 0.09
            },
            {
              "target": "ผลตอบแทน",
              "weight": 2.42
            },
            {
              "target": "รายได้",
              "weight": 0.91
            },
            {
              "target": "ความรู้",
              "weight": 0.14
            },
            {
              "target": "ทรัพยากร",
              "weight": 0.17
            },
            {
              "target": "เป้าหมาย",
              "weight": 2.42
            }
          ]
        }
      ]
    },
    {
      "target": "เทคโนโลยี",
      "weight": 1.33,
      "relations": [
        {
          "target": "คอมพิวเตอร์",
          "weight": 2.29,
          "relations": [
            {
              "target": "ระบบปฏิบัติการ",
              "weight": 2.45
            },
            {
              "target": "CPU",
              "weight": 0.7
            },
            {
              "target": "RAM",
              "weight": 2.99
            },
            {
              "target": "ฮาร์ดแวร์",
              "weight": 1.77
            },
            {
              "target": "ประสิทธิภาพ",
              "weight": 1.94
            },
            {
              "target": "เทคโนโลยี",
              "weight": 1.12
            }
          ]
        },
        {
          "target": "สมาร์ทโฟน",
          "weight": 1.59,
          "relations": [
            {
              "target": "การถ่ายภาพ",
              "weight": 2.7
            },
            {
              "target": "แอปพลิเคชัน",
              "weight": 1.78
            },
            {
              "target": "อินเทอร์เน็ต",
              "weight": 2.45
            },
            {
              "target": "สมาร์ทโฟน",
              "weight": 1.66
            },
            {
              "target": "หน้าจอสัมผัส",
              "weight": 1.04
            }
          ]
        },
        {
          "target": "ข้อดีและข้อเสีย",
          "weight": 1.07,
          "relations": [
            {
              "target": "ข้อมูล",
              "weight": 0.93
            }
          ]
        }
      ]
    }
  ]
};
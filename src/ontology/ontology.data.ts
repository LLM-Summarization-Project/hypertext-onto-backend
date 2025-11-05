// src/ontology/ontology.data.ts
export const DEMO_ONTOLOGY = {
  "word": "file1",
  "relations": [],
  "forests": [{
  "word": "วิเคราห์การเงิน",
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
},
    {
      "word": "แคลคูลัส",
      "relations": [
        {
          "target": "ลิมิตและความต่อเนื่อง",
          "weight": 0.37
        },
        {
          "target": "ลำดับและอนุกรม",
          "weight": 2.41,
          "relations": [
            {
              "target": "ลำดับเลขคณิต",
              "weight": 1.91,
              "relations": [
                {
                  "target": "นิยามลำดับเลขคณิต",
                  "weight": 2.5
                },
                {
                  "target": "สูตรพจน์ทั่วไป",
                  "weight": 0.3,
                  "relations": [
                    {
                      "target": "สูตรพจน์ทั่วไปของลำดับเชิงเส้น",
                      "weight": 0.98
                    }
                  ]
                },
                {
                  "target": "ผลต่างร่วม",
                  "weight": 2.06
                },
                {
                  "target": "การหาพจน์ที่ n",
                  "weight": 2.3,
                  "relations": [
                    {
                      "target": "การวิเคราะห์ลำดับที่มีความซับซ้อน",
                      "weight": 1.5
                    },
                    {
                      "target": "การหาพจน์ที่ n ในลำดับเลขคณิต",
                      "weight": 1.57
                    }
                  ]
                },
                {
                  "target": "ลำดับเลขคณิต vs ลำดับเรขาคณิต",
                  "weight": 1.25
                },
                {
                  "target": "ผลรวมของพจน์",
                  "weight": 2.31
                },
                {
                  "target": "วิธีใช้ในชีวิตจริง",
                  "weight": 2.56
                }
              ]
            }
          ]
        },
        {
          "target": "การใช้ประโยชน์จากอนุพันธ์",
          "weight": 1.27,
          "relations": [
            {
              "target": "การซื้อขายอนุพันธ์",
              "weight": 1.22
            },
            {
              "target": "การใช้ในการจัดการความเสี่ยง",
              "weight": 1.56,
              "relations": [
                {
                  "target": "การป้องกันความเสี่ยงด้านไซเบอร์",
                  "weight": 2.95
                },
                {
                  "target": "การบริหารความเสี่ยงด้านสิ่งแวดล้อม",
                  "weight": 2.77
                },
                {
                  "target": "การปฏิบัติตามกฎหมายด้านความเสี่ยง",
                  "weight": 1.95,
                  "relations": [
                    {
                      "target": "การประเมินความเสี่ยง",
                      "weight": 0.46
                    }
                  ]
                },
                {
                  "target": "การบริหารความเสี่ยงทางการเงิน",
                  "weight": 0.73
                },
                {
                  "target": "การบริหารความเสี่ยงด้านสุขภาพ",
                  "weight": 1.19
                },
                {
                  "target": "การบริหารความเสี่ยงในอุตสาหกรรมประกันภัย",
                  "weight": 2.23
                },
                {
                  "target": "การจัดการความเสี่ยงในห่วงโซ่อุปทาน",
                  "weight": 1.65,
                  "relations": [
                    {
                      "target": "การวิเคราะห์ความเสี่ยงในห่วงโซ่อุปทาน",
                      "weight": 1.83
                    },
                    {
                      "target": "การจัดการความเสี่ยงจากผู้จัดหา",
                      "weight": 0.84
                    },
                    {
                      "target": "การประสานงานระหว่างองค์กรในห่วงโซ่อุปทาน",
                      "weight": 0.4
                    },
                    {
                      "target": "การจัดการความเสี่ยงด้านกฎระเบียบ",
                      "weight": 1.48
                    }
                  ]
                },
                {
                  "target": "การจัดการความเสี่ยงในโครงการ",
                  "weight": 1.59
                }
              ]
            },
            {
              "target": "อนุพันธ์ในตลาดการเงิน",
              "weight": 0.29
            },
            {
              "target": "ประเภทของอนุพันธ์",
              "weight": 2.2,
              "relations": [
                {
                  "target": "Futures",
                  "weight": 1.88,
                  "relations": [
                    {
                      "target": "Derivatives",
                      "weight": 1.82
                    }
                  ]
                },
                {
                  "target": "Forwards",
                  "weight": 1.55,
                  "relations": [
                    {
                      "target": "Football Forwards",
                      "weight": 1.29
                    },
                    {
                      "target": "URL Forwarding",
                      "weight": 0.33
                    },
                    {
                      "target": "Email Forwarding",
                      "weight": 0.04
                    },
                    {
                      "target": "Forward Planning",
                      "weight": 1.24
                    }
                  ]
                },
                {
                  "target": "Convertible Bonds",
                  "weight": 2.84
                }
              ]
            },
            {
              "target": "ข้อบกพร่องของอนุพันธ์",
              "weight": 0.99
            },
            {
              "target": "การป้องกันความเสี่ยงด้วยอนุพันธ์",
              "weight": 2.32
            },
            {
              "target": "อนุพันธ์และการลงทุน",
              "weight": 1.28
            },
            {
              "target": "บทบาทของอนุพันธ์ในเศรษฐกิจ",
              "weight": 2.09
            }
          ]
        }
      ]
    },
    {
      "word": "ตรีโกณมิติ",
      "relations": [
        {
          "target": "สมการตรีโกณมิติ",
          "weight": 2.02
        },
        {
          "target": "หน่วยวงกลม",
          "weight": 0.06
        },
        {
          "target": "ฟังก์ชันผกผันตรีโกณมิติ",
          "weight": 2.95,
          "relations": [
            {
              "target": "ปริพันธ์ของฟังก์ชันผกผันตรีโกณมิติ",
              "weight": 1.35
            },
            {
              "target": "การแก้สมการโดยใช้ฟังก์ชันผกผันตรีโกณมิติ",
              "weight": 1.28
            },
            {
              "target": "กราฟของฟังก์ชันผกผันตรีโกณมิติ",
              "weight": 2.27
            },
            {
              "target": "โดเมนและเรนจ์ของฟังก์ชันผกผันตรีโกณมิติ",
              "weight": 2.66
            },
            {
              "target": "อนุพันธ์ของฟังก์ชันผกผันตรีโกณมิติ",
              "weight": 2.17
            },
            {
              "target": "ฟังก์ชันผกผันไฮเปอร์โบลิก",
              "weight": 0.97
            },
            {
              "target": "ความสัมพันธ์กับจำนวนเชิงซ้อน",
              "weight": 1.83,
              "relations": [
                {
                  "target": "แผนภูมิเชิงซ้อน",
                  "weight": 1.78
                }
              ]
            }
          ]
        },
        {
          "target": "การวัดมุม",
          "weight": 1.04
        },
        {
          "target": "ฟังก์ชันตรีโกณมิติ",
          "weight": 2.32
        }
      ]
    },
    {
      "word": "อนิเมะ",
      "relations": [
        {
          "target": "อนิเมะที่ได้รับการยอมรับสูงสุด",
          "weight": 2.67
        },
        {
          "target": "อนิเมะที่มีผู้ชมมากที่สุด",
          "weight": 1.22
        },
        {
          "target": "อนิเมะที่มีการตัดต่อสูงสุด",
          "weight": 2.35,
          "relations": [
            {
              "target": "อนิเมะที่มีฉากแอคชั่นที่มีการตัดต่อซับซ้อน",
              "weight": 2.2,
              "relations": [
                {
                  "target": "อนิเมะที่มีการตัดต่อฉากแอคชั่นที่เร้าใจ",
                  "weight": 1.46
                },
                {
                  "target": "อนิเมถี่ที่มีการตัดต่อที่สร้างความตื่นเต้น",
                  "weight": 0.7,
                  "relations": [
                    {
                      "target": "อนิเมที่เน้นการตัดต่อแบบดราม่า",
                      "weight": 2.84
                    },
                    {
                      "target": "อนิเมชันที่มีการตัดต่อเร็วและมีพลัง",
                      "weight": 2.28
                    },
                    {
                      "target": "อนิเมที่ใช้เทคนิคการตัดต่อแบบสุดยิ่ง",
                      "weight": 0.24
                    }
                  ]
                },
                {
                  "target": "อนิเมะที่เน้นการตัดต่อฉากต่อสู้",
                  "weight": 0.41
                },
                {
                  "target": "อนิเมะที่มีฉากต่อสู้ที่มีการเคลื่อนไหวรวดเร็ว",
                  "weight": 1.62
                }
              ]
            },
            {
              "target": "อนิเมะที่มีเอฟเฟกต์พิเศษสูงสุด",
              "weight": 0.02
            }
          ]
        },
        {
          "target": "อนิเมะที่มีการสร้างภาพสุดยอด",
          "weight": 1.12
        },
        {
          "target": "อนิเมะที่มีเสียงพากย์ยอดเยี่ยม",
          "weight": 1.59
        },
        {
          "target": "อนิเมะที่มีคะแนนสูงสุด",
          "weight": 1.22
        },
        {
          "target": "อนิเมะที่มีตัวละครน่าจดจำมากที่สุด",
          "weight": 1.23
        },
        {
          "target": "อนิเมะที่มีเพลงประกอบยอดเยี่ยม",
          "weight": 1.34,
          "relations": [
            {
              "target": "ความสำคัญของเพลงประกอบในอนิเมะ",
              "weight": 0.95
            },
            {
              "target": "การเปรียบเทียบสไตล์เพลงประกอบอนิเมะ",
              "weight": 0.47
            },
            {
              "target": "การใช้ดนตรีเพื่อเสริมเนื้อเรื่อง",
              "weight": 0.86
            },
            {
              "target": "การรับรู้ของผู้ชมต่อเพลงประกอบอนิเมะ",
              "weight": 0.4,
              "relations": [
                {
                  "target": "ผลกระทบของความนิยมของเพลงต่อการรับรู้ของผู้ชม",
                  "weight": 0.82
                }
              ]
            },
            {
              "target": "อารมณ์ที่ถูกสื่อสารผ่านเพลงประกอบ",
              "weight": 2.04
            }
          ]
        },
        {
          "target": "อนิเมะที่มีฉากดีเด่นสูงสุด",
          "weight": 2.0,
          "relations": [
            {
              "target": "อนิเมะที่มีฉากการต่อสู้ที่น่าตื่นเต้น",
              "weight": 1.39
            },
            {
              "target": "อนิเมะที่มีฉากการ์ตูนที่สวยงาม",
              "weight": 2.37
            },
            {
              "target": "อนิเมะที่มีฉากศิลปะสุดยอด",
              "weight": 2.22
            }
          ]
        },
        {
          "target": "อนิเมะที่มีอิทธิพลมากที่สุด",
          "weight": 2.49,
          "relations": [
            {
              "target": "อนิเมะที่มีอิทธิพลต่อวงการภาพยนตร์",
              "weight": 1.62
            },
            {
              "target": "อนิเมะแนวไหนที่มีอิทธิพลมากที่สุด",
              "weight": 1.18
            },
            {
              "target": "อนิเมะที่มีอิทธิพลต่อการเมือง",
              "weight": 1.18,
              "relations": [
                {
                  "target": "อิทธิพลของอนิเมะต่อแนวคิดทางการเมือง",
                  "weight": 2.84
                },
                {
                  "target": "การสร้างความคิดเห็นสาธารณะผ่านอนิเมะ",
                  "weight": 0.67
                },
                {
                  "target": "บทบาทของอนิเมะในความสัมพันธ์ระหว่างประเทศ",
                  "weight": 2.16,
                  "relations": [
                    {
                      "target": "การถ่ายทอดค่านิยมทางสังคมผ่านอนิเมะ",
                      "weight": 2.2
                    },
                    {
                      "target": "การส่งเสริมความเข้าใจวัฒนธรรมผ่านอนิเมะ",
                      "weight": 0.35
                    },
                    {
                      "target": "การใช้อนิเมะในกิจกรรมทางการทูต",
                      "weight": 2.51
                    }
                  ]
                },
                {
                  "target": "การกระตุ้นให้เยาวชนสนใจการเมือง",
                  "weight": 2.5
                }
              ]
            },
            {
              "target": "อนิเมะที่มีอิทธิพลต่อวัฒนธรรม",
              "weight": 0.41
            },
            {
              "target": "อนิเมะที่มีอิทธิพลต่อการท่องเที่ยว",
              "weight": 0.68
            },
            {
              "target": "อนิเมะที่มีอิทธิพลต่อการวาดภาพ",
              "weight": 0.75
            },
            {
              "target": "อนิเมะที่มีอิทธิพลต่อวัยรุ่น",
              "weight": 0.01,
              "relations": [
                {
                  "target": "อนิเมะแนว coming-of-age",
                  "weight": 1.55
                },
                {
                  "target": "อิทธิพลทางวัฒนธรรม",
                  "weight": 0.69
                },
                {
                  "target": "การสื่อสารประเด็นสังคม",
                  "weight": 0.74
                },
                {
                  "target": "การนำเสนอความสัมพันธ์ในวัยรุ่น",
                  "weight": 2.65
                },
                {
                  "target": "ชุมชนแฟนคลับออนไลน์",
                  "weight": 1.35
                }
              ]
            },
            {
              "target": "อนิเมะที่มีอิทธิพลต่อเทคโนโลยี",
              "weight": 2.69
            }
          ]
        }
      ]
    },
    {
      "word": "Netflix",
      "relations": [
        {
          "target": "ประสบการณ์ผู้ใช้",
          "weight": 2.74
        },
        {
          "target": "ไลบรารีเนื้อหา",
          "weight": 2.69
        },
        {
          "target": "Netflix บริการสตรีมมิ่ง",
          "weight": 0.15
        },
        {
          "target": "ระบบแนะนำ",
          "weight": 2.35
        },
        {
          "target": "เนื้อหาオリジナル",
          "weight": 1.76
        },
        {
          "target": "แผนราคาและสมาชิก",
          "weight": 2.2
        },
        {
          "target": "ความรับผิดชอบต่อสิ่งแวดล้อม",
          "weight": 1.53
        },
        {
          "target": "การขยายตัวสู่แพลตฟอร์มอื่น",
          "weight": 2.09
        },
        {
          "target": "ความร่วมมือกับผู้สร้าง",
          "weight": 2.95
        }
      ]
    },
    {
      "word": "Nmixx",
      "relations": [
        {
          "target": "Top 10 Movies",
          "weight": 1.33,
          "relations": [
            {
              "target": "Top 10 Genres",
              "weight": 1.42
            },
            {
              "target": "Top 10 Directors",
              "weight": 0.05
            },
            {
              "target": "Top 10 Oscar Winners",
              "weight": 0.63
            },
            {
              "target": "Top 10 Action Movies",
              "weight": 0.34
            },
            {
              "target": "Top 10 Box Office Hits",
              "weight": 1.9
            },
            {
              "target": "Top 10 Movie Awards",
              "weight": 0.23
            }
          ]
        }
      ]
    },
    {
      "word": "Vector",
      "relations": [
        {
          "target": "Vector Spaces",
          "weight": 2.13
        },
        {
          "target": "Vector Calculus",
          "weight": 0.59
        },
        {
          "target": "Computer Graphics",
          "weight": 2.21
        }
      ]
    },
    {
      "word": "การเมือง",
      "relations": [
        {
          "target": "ปัญหาสังคม",
          "weight": 2.23,
          "relations": [
            {
              "target": "ความยากจน",
              "weight": 2.45,
              "relations": [
                {
                  "target": "สาเหตุของความยากจน",
                  "weight": 0.78
                },
                {
                  "target": "สถิติความยากจนในประเทศ",
                  "weight": 2.73
                },
                {
                  "target": "ผลกระทบของความยากจน",
                  "weight": 1.28
                },
                {
                  "target": "ความยากจนในเด็ก",
                  "weight": 0.09,
                  "relations": [
                    {
                      "target": "ปัจจัยที่ทำให้เด็กยากจน",
                      "weight": 0.15
                    },
                    {
                      "target": "ผลกระทบของความยากจนต่อเด็ก",
                      "weight": 1.9
                    },
                    {
                      "target": "ความแตกต่างของรายได้ในครอบครัว",
                      "weight": 2.95
                    }
                  ]
                }
              ]
            },
            {
              "target": "การว่างงาน",
              "weight": 2.28
            }
          ]
        },
        {
          "target": "การเลือกตั้ง",
          "weight": 1.4
        },
        {
          "target": "ความคิดเห็นสาธารณะ",
          "weight": 2.9
        },
        {
          "target": "การทุจริต",
          "weight": 1.23
        },
        {
          "target": "การเมืองระหว่างประเทศ",
          "weight": 1.86
        },
        {
          "target": "ผู้นำทางการเมือง",
          "weight": 0.21
        },
        {
          "target": "เศรษฐกิจและการเมือง",
          "weight": 0.74
        },
        {
          "target": "ความสัมพันธ์ระหว่างประเทศ",
          "weight": 1.88
        },
        {
          "target": "นโยบายสาธารณะ",
          "weight": 2.29,
          "relations": [
            {
              "target": "นโยบายเศรษฐกิจ",
              "weight": 1.29
            },
            {
              "target": "การวางแผนนโยบาย",
              "weight": 2.05
            },
            {
              "target": "ผู้มีส่วนได้ส่วนเสีย",
              "weight": 2.66,
              "relations": [
                {
                  "target": "ผู้จัดหา",
                  "weight": 1.79
                },
                {
                  "target": "ลูกค้า",
                  "weight": 2.6
                },
                {
                  "target": "ผู้ถือหุ้น",
                  "weight": 0.85
                },
                {
                  "target": "ชุมชน",
                  "weight": 1.16,
                  "relations": [
                    {
                      "target": "สุขภาพและความเป็นอยู่",
                      "weight": 2.59
                    },
                    {
                      "target": "บริการสังคม",
                      "weight": 1.69
                    },
                    {
                      "target": "โครงสร้างชุมชน",
                      "weight": 0.68
                    },
                    {
                      "target": "วัฒนธรรมและประเพณี",
                      "weight": 1.74
                    },
                    {
                      "target": "การมีส่วนร่วมทางสังคม",
                      "weight": 1.44
                    },
                    {
                      "target": "สิ่งแวดล้อมและภูมิศาสตร์",
                      "weight": 0.07
                    },
                    {
                      "target": "การศึกษาและพัฒนาตนเอง",
                      "weight": 2.01
                    },
                    {
                      "target": "การบริหารจัดการ",
                      "weight": 2.66
                    },
                    {
                      "target": "เศรษฐกิจชุมชน",
                      "weight": 0.07
                    },
                    {
                      "target": "เทคโนโลยีและสื่อสาร",
                      "weight": 1.59
                    }
                  ]
                }
              ]
            },
            {
              "target": "การดำเนินการนโยบาย",
              "weight": 1.84,
              "relations": [
                {
                  "target": "การประเมินผล",
                  "weight": 0.12,
                  "relations": [
                    {
                      "target": "วิธีการประเมินผล",
                      "weight": 1.88
                    },
                    {
                      "target": "แบบฟอร์มการประเมินผล",
                      "weight": 1.52
                    },
                    {
                      "target": "ประเภทของการประเมินผล",
                      "weight": 1.33
                    },
                    {
                      "target": "ข้อดีและข้อเสียของการประเมินผล",
                      "weight": 1.61
                    },
                    {
                      "target": "ข้อกำหนดในการประเมินผล",
                      "weight": 2.18
                    },
                    {
                      "target": "ความท้าทายในการประเมินผล",
                      "weight": 1.78
                    },
                    {
                      "target": "ความสำคัญของการประเมินผล",
                      "weight": 2.84
                    },
                    {
                      "target": "ผลลัพธ์จากการประเมินผล",
                      "weight": 1.58
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "target": "ระบบกฎหมาย",
          "weight": 0.82,
          "relations": [
            {
              "target": "คดีสำคัญที่ส่งผลต่อประวัติศาสตร์กฎหมาย",
              "weight": 2.44
            },
            {
              "target": "กฎหมายที่มีผลบังคับใช้มากที่สุด",
              "weight": 1.61
            },
            {
              "target": "ประเทศที่มีระบบกฎหมายที่ดีที่สุด",
              "weight": 2.96
            },
            {
              "target": "นักกฎหมายที่มีอิทธิพลมากที่สุด",
              "weight": 2.45
            },
            {
              "target": "กฎหมายที่เกี่ยวข้องกับการค้าระหว่างประเทศที่สำคัญที่สุด",
              "weight": 2.91
            },
            {
              "target": "ระบบยุติคดีที่มีประสิทธิภาพสูงสุด",
              "weight": 0.33
            }
          ]
        }
      ]
    },
    {
      "word": "Covid",
      "relations": [
        {
          "target": "Vaccines",
          "weight": 0.52
        },
        {
          "target": "Variants",
          "weight": 0.46
        },
        {
          "target": "Lockdowns",
          "weight": 0.73
        },
        {
          "target": "Testing",
          "weight": 0.38
        },
        {
          "target": "Masks",
          "weight": 2.25
        }
      ]
    }
  ]
};
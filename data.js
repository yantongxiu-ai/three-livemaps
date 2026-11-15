// 网站、关系图与 Archify 共用的数据来源。修改后重新生成 Archify。
window.MAP_DATA = {
  "maps": {
    "domain": {
      "name": "领域地图",
      "color": "domain",
      "categories": [
        "基本问题",
        "核心概念",
        "方法与工具",
        "课程与学习路径"
      ],
      "entries": [
        {
          "id": "d-intro",
          "name": "老年人用药安全中的机器视觉",
          "brief": "以药品图像与标签文字为入口，研究识别、核对与交互。",
          "category": "基本问题",
          "status": "待原记录核对",
          "detail": {
            "description": "本组选题为「老年人用药安全与健康管理场景」。原稿提供者提出看不清标签、记混药与重复服药等调研线索，拟探索文字识别与药片外观分类。调研原记录本轮未提供；本站记录知识、工具和计划，尚非可用于实际用药的识别产品。",
            "relation": "机器视觉是技术手段，老年人用药安全是应用场景；「文字识别」「药片识别」是核心概念，「居家用药识别与防错」是典型任务。",
            "related": [
              {
                "id": "d-task",
                "reason": "串起全部技术的典型任务"
              },
              {
                "id": "d-ocr",
                "reason": "识别药瓶标签与说明书文字"
              },
              {
                "id": "d-recognition",
                "reason": "识别不同药片，防止混淆"
              }
            ],
            "source": "本组选题说明。",
            "understanding": "当前假设：识别与人工核对值得作为探索重点。是否比提醒更重要、具体适用哪些人群，仍需原调研材料和后续验证支持。",
            "evidenceNote": "保留组长提供的调研与认识摘要；本轮未取得访谈原记录、授权材料或课堂原件，相关经历与结论待原提供者确认。不得据此推断普遍人群结论。"
          }
        },
        {
          "id": "d-task",
          "name": "居家用药识别与防错",
          "brief": "围绕拍摄、识别、看清与核对，拆解一个居家场景。",
          "category": "基本问题",
          "status": "待原记录核对",
          "detail": {
            "description": "原稿提供者（闫通修）报告：有老人在弱光下看不清药瓶小字，以及忘记是否已经服药。原稿曾包含个案和用量转述；本轮未取得原记录，暂不公开复述这些细节。当前把它们作为待核对的需求线索。",
            "relation": "提出「输入是否清楚—输出是否准确—人能否核对」三类问题；需要调研与实验进一步检验。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "拍照识别依赖文字识别"
              },
              {
                "id": "d-recognition",
                "reason": "防混淆依赖药片图像识别"
              },
              {
                "id": "c-revision",
                "reason": "调研推翻「吃药闹钟」的初判，对应一次认识修正"
              },
              {
                "id": "d-intro",
                "reason": "回到选题范围与当前证据边界"
              },
              {
                "id": "d-capture",
                "reason": "明确进入识别前需要的图像记录"
              }
            ],
            "source": "本组实地调研（填写人：闫通修）。",
            "understanding": "拟让原图与识别文字并排显示，提供大字、重拍和人工核对入口。任何播报都应区分已核对文本与待核对输出；不由图像直接生成服用剂量或用法。",
            "framework": [
              "拍摄：保留原图与条件，示意标签用于学习",
              "识别：展示文字或限定范围的外观分类结果",
              "核对：明确异常与人工检查入口，实际流程待验证"
            ],
            "evidenceNote": "保留组长提供的调研与认识摘要；本轮未取得访谈原记录、授权材料或课堂原件，相关经历与结论待原提供者确认。不得据此推断普遍人群结论。"
          }
        },
        {
          "id": "d-ocr",
          "name": "文字识别（OCR）",
          "brief": "识别药瓶标签、说明书上的小字。",
          "category": "核心概念",
          "status": "部分核实",
          "detail": {
            "description": "OCR 用于从图像中读取文字。在本选题中，候选任务是把药盒或标签上的文字转换为可放大阅读的文本。识别是否准确需要单独评测；本页不根据识别文字生成服药建议。",
            "relation": "是「拍照识别」功能的核心技术，直接对应「看不清说明书」这一痛点。",
            "related": [
              {
                "id": "d-task",
                "reason": "拍照识别的技术基础"
              },
              {
                "id": "d-data",
                "reason": "需要药瓶标签图像数据来训练和验证"
              },
              {
                "id": "e-opencv",
                "reason": "OpenCV 提供图像预处理，辅助文字识别"
              },
              {
                "id": "e-paddleocr",
                "reason": "候选 OCR 工具与官方资料"
              },
              {
                "id": "d-evaluation",
                "reason": "技术输出需要评测"
              },
              {
                "id": "d-text-pipeline",
                "reason": "拆开检测与识别两种失败"
              }
            ],
            "source": "PaddleOCR 官方文档；具体场景为本组拟定任务。",
            "understanding": "本组计划先跑通一个识别药瓶标签的 Demo，验证 OCR 在药瓶小字上的可用性。",
            "sources": [
              "s-paddle"
            ],
            "evidenceNote": "已核对 OCR 工具入口；本组标签识别效果尚未验证。"
          },
          "learning": "待实践"
        },
        {
          "id": "d-recognition",
          "name": "药片图像识别",
          "brief": "识别不同药片，防止白色药片和黄色药片搞混。",
          "category": "核心概念",
          "status": "待核实",
          "detail": {
            "description": "用图像识别技术区分不同药片的外观（颜色、形状、大小）。调研发现很多老人同时吃多种药，很容易把白色药片和黄色药片搞混——药片识别正是解决「记混药」的核心。 本页描述拟探索的视觉任务，不代表系统已经能够可靠确认药品身份或用法。",
            "relation": "是「防错纠错」功能的核心技术，直接对应「记混药」这一痛点。",
            "related": [
              {
                "id": "d-task",
                "reason": "防混淆的核心技术"
              },
              {
                "id": "d-data",
                "reason": "需要标注不同药片的图像数据"
              },
              {
                "id": "e-pytorch",
                "reason": "可用深度学习框架实现图像识别模型"
              },
              {
                "id": "d-confusion",
                "reason": "检查哪些外观类别容易混淆"
              }
            ],
            "source": "本组技术选型；通识概念。",
            "understanding": "计划从明确范围内的外观分类小样开始，记录易混淆、未知类别和失败情况；不从照片直接推断剂量或用法。",
            "evidenceNote": "关于本组调研与能力判断，需要原记录及实际验证；不能仅从外观推断用法。"
          },
          "learning": "待实践"
        },
        {
          "id": "d-data",
          "name": "数据与标注",
          "brief": "机器视觉模型需要带标签的图像数据。",
          "category": "方法与工具",
          "status": "部分核实",
          "detail": {
            "description": "监督学习需要带标签的数据。对用药场景来说，主要两类：①药瓶标签图——标注其中的药名与用法用量文字，供 OCR 识别；②药片外观图——标注颜色、形状、大小与种类，供图像识别区分「白色药片」和「黄色药片」。",
            "relation": "是 OCR 与药片识别的共同前提；数据质量直接影响识别准确率，采集时要覆盖「光线不足、小字」等真实场景。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "文字识别需要标签图像数据"
              },
              {
                "id": "d-recognition",
                "reason": "药片识别需要外观标注数据"
              },
              {
                "id": "d-test-split",
                "reason": "在评测前隔离相关样本"
              },
              {
                "id": "d-capture",
                "reason": "约定采集条件与图像编号"
              }
            ],
            "source": "课堂：2026-10-16 第二讲（杨洋）数据采集、标注与划分的方法论；结合本组用药场景说明。",
            "understanding": "数据标注的三个关键点：①采集要覆盖真实场景（不同光线、角度、遮挡），不能只拍清晰样本；②标注要定统一规则（药片颜色/形状/大小分类标准）；③划分数据集时避免近似样本泄漏（同一次拍摄的相邻帧不能随机散进各子集）。",
            "framework": [
              "采集：药瓶/药盒标签、不同药片外观，覆盖光线不足、多角度、遮挡",
              "标注：标签文字（药名、用法用量）+ 药片属性（颜色、形状、大小、种类）",
              "划分：训练集 / 验证集 / 测试集，避免近似样本泄漏"
            ],
            "sources": [
              "s-torch"
            ],
            "evidenceNote": "官方资料支持数据组织概念；原课堂记录仍需组内核对。"
          },
          "learning": "待实践"
        },
        {
          "id": "d-course",
          "name": "课程与学习路径",
          "brief": "把机器视觉能力对应到课程。",
          "category": "课程与学习路径",
          "status": "待核实",
          "detail": {
            "description": "本组技术路线（OCR + 药片图像识别）对应培养方案里的相关课程：视觉智能（大三，机器视觉核心）、深度学习基础（大二）、人工智能数据工程（大三）、人工智能引论（大一）。",
            "relation": "让「学什么」落到「为什么学」；本组分工中「机器视觉技术攻坚」正是对应这些课程的能力。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "OCR 是机器视觉的基础任务"
              },
              {
                "id": "e-zju",
                "reason": "课程来自浙大人工智能学院培养方案"
              },
              {
                "id": "c-interest",
                "reason": "据此制定本组的学习计划"
              },
              {
                "id": "c-halflife",
                "reason": "选择需要长期积累与短期跟进的知识"
              }
            ],
            "source": "课堂：2026-10-16 第二讲（杨洋）修读导图与课程对应；通识。",
            "understanding": "关键课程：视觉智能（大三）、深度学习基础（大二）、人工智能数据工程（大三）、人工智能引论（大一）；入门可先学神经网络与 OpenCV。",
            "evidenceNote": "课程名称、修读年级与覆盖程度沿用原组内资料，待适用培养方案或课程大纲核对。"
          },
          "learning": "待深入"
        },
        {
          "id": "d-evaluation",
          "name": "识别结果如何评测",
          "brief": "把识别正确、遗漏和失败分别记录。",
          "category": "方法与工具",
          "status": "计划未执行",
          "learning": "待实践",
          "detail": {
            "description": "拟以人工转录并复核的标签文本为参照，比较不同拍摄条件下的识别输出。分别记录关键字段是否一致、遗漏、错误和无法识别，不用一次成功展示代替整体评测。",
            "relation": "服务于本组用药识别场景的学习与验证。",
            "related": [
              {
                "id": "d-data",
                "reason": "评测需要明确样本与参照信息"
              },
              {
                "id": "c-ocr-plan",
                "reason": "将评测问题落实为对照计划"
              },
              {
                "id": "d-test-split",
                "reason": "先明确独立测试的分组规则"
              },
              {
                "id": "d-confusion",
                "reason": "分类任务需要细看各类错误"
              }
            ],
            "source": "本轮提出的分析与设计计划，尚无本组执行结果。",
            "understanding": "下一步先约定样本范围、参照文本和检查表；目前未采集样本，也没有准确率或优胜方案。",
            "sources": [],
            "evidenceNote": "计划不是实验结果；执行条件和记录待组员补充。"
          }
        },
        {
          "id": "d-review",
          "name": "识别失败与人工核对",
          "brief": "识别输出需要回到原始资料检查。",
          "category": "方法与工具",
          "status": "计划未执行",
          "learning": "待实践",
          "detail": {
            "description": "设计上应允许重拍、查看原图与识别文字、报告不确定，并由人核对原始标签。学习原型不提供诊断或自主用药决策。此项是本组待讨论的交互约束。",
            "relation": "服务于本组用药识别场景的学习与验证。",
            "related": [
              {
                "id": "d-task",
                "reason": "为典型任务补充失败时的处理边界"
              },
              {
                "id": "c-ocr-plan",
                "reason": "对照计划需要保留异常与未知结果"
              },
              {
                "id": "e-wai",
                "reason": "用适老与无障碍资料检查核对入口"
              }
            ],
            "source": "本轮提出的分析与设计计划，尚无本组执行结果。",
            "understanding": "尚未实现或测试异常流程；需要在原型中观察使用者能否发现并纠正错误。",
            "sources": [],
            "evidenceNote": "计划不是实验结果；执行条件和记录待组员补充。"
          }
        },
        {
          "id": "d-capture",
          "name": "图像采集与预处理",
          "brief": "先记录光线、角度和原图，再考虑是否需要预处理。",
          "category": "方法与工具",
          "status": "计划未执行",
          "learning": "待实践",
          "detail": {
            "description": "拟为同一示意标签保留原图、拍摄条件和处理版本。OpenCV 的阈值化教程介绍了全局与自适应阈值；本组可将其作为对照候选，不能预先认定处理后一定更好。",
            "relation": "补上「居家场景」到「OCR 输入」之间的环节，为上轮拍摄条件对照计划提供可记录的输入。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "采集结果作为文字识别输入"
              },
              {
                "id": "e-opencv",
                "reason": "查阅阈值化处理方法"
              },
              {
                "id": "c-ocr-plan",
                "reason": "在既有对照计划中记录条件"
              }
            ],
            "source": "官方资料阅读（2026-11-15）；场景应用为本轮提出的学习方案。",
            "understanding": "先建立可追溯的图像编号，再一次只改变一个拍摄或处理条件。模糊、反光等问题先记录，不用调参后的少数好图代替整个样本集。",
            "sources": [
              "s-opencv"
            ],
            "framework": [
              "记录：样本编号、对象编号、光线、角度、日期",
              "保存：原图与处理图分开，不覆盖原文件",
              "对照：同图比较原始输入与处理输入，保留失败情况"
            ],
            "evidenceNote": "此处是待小组讨论的计划，不表示已采集样本、完成用户测试或获得实验结果。"
          }
        },
        {
          "id": "d-text-pipeline",
          "name": "文字检测与文字识别",
          "brief": "先定位哪里有文字，再识别文字内容。",
          "category": "核心概念",
          "status": "资料已核对",
          "learning": "资料已读 · 待实践",
          "detail": {
            "description": "PaddleOCR 的通用 OCR 流水线包含文字检测与文字识别等模块。检测处理文字区域的位置，识别处理区域内的字符；应把「没有找到文字」与「找到但读错」分开记录。",
            "relation": "细化已有 OCR 节点，帮助把总失败拆成可检查的环节。具体输出格式须以选用版本的文档为准。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "回到 OCR 总体任务"
              },
              {
                "id": "e-paddleocr",
                "reason": "查找通用 OCR 流水线用法"
              },
              {
                "id": "c-error-review",
                "reason": "将定位失败与字符错误分别复盘"
              }
            ],
            "source": "官方资料阅读（2026-11-15）；场景应用为本轮提出的学习方案。",
            "understanding": "标签弯曲、反光时，先看检测框是否覆盖目标，再看文字读得怎样。该检查顺序是本组待验证的方法，不是工具在药品场景中有效的证明。",
            "sources": [
              "s-paddle-pipeline"
            ],
            "evidenceNote": "资料核对仅支持方法与工具概念；在本组药品图像上的效果仍待实际验证。"
          }
        },
        {
          "id": "d-test-split",
          "name": "按对象分组的数据划分",
          "brief": "把相同对象的近似图像留在同一组，明确测试目标。",
          "category": "方法与工具",
          "status": "部分核实",
          "learning": "资料已读 · 待实践",
          "detail": {
            "description": "scikit-learn 的 GroupKFold 保证同一组不会同时出现在配对的训练和测试部分。本组拟按拍摄对象或拍摄批次分组，避免把相邻帧随机散入不同子集。分组方式取决于希望检验「新拍摄条件」还是「新对象」。",
            "relation": "补全数据与标注到评测之间的环节。若任务是固定类别分类，必须另外检查各类覆盖；按对象划分不自动保证类别平衡，也不等于未知类别识别。",
            "related": [
              {
                "id": "d-data",
                "reason": "分组需要明确的对象与标签记录"
              },
              {
                "id": "e-sklearn",
                "reason": "查看分组划分工具与约束"
              },
              {
                "id": "d-evaluation",
                "reason": "在确定独立测试条件后评测"
              }
            ],
            "source": "官方资料阅读（2026-11-15）；场景应用为本轮提出的学习方案。",
            "understanding": "先写清评测要推广到什么，再选分组规则。拟保存对象 ID、分组清单和划分版本；尚未形成可用数据集，不填写比例或样本数。",
            "sources": [
              "s-group"
            ],
            "framework": [
              "定义：测试的是新图片、新批次还是新对象",
              "检查：同组不跨集合，类别覆盖与样本量另行检查",
              "保存：划分清单与版本，不反复用测试结果调参"
            ],
            "evidenceNote": "资料核对仅支持方法与工具概念；在本组药品图像上的效果仍待实际验证。"
          }
        },
        {
          "id": "d-confusion",
          "name": "分类混淆与错误分析",
          "brief": "记录「实际类别 → 预测类别」，查清错在哪里。",
          "category": "方法与工具",
          "status": "资料已核对",
          "learning": "资料已读 · 待实践",
          "detail": {
            "description": "scikit-learn 的混淆矩阵以真实类别和预测类别统计分类结果：每个单元格记录实际属于某类却被预测为另一类的数量。它适用于分类评测，不能代替 OCR 字符错误记录，也不能单独证明用药安全。",
            "relation": "为药片外观分类补充具体评测入口；即使总体正确率看起来不错，也要回看哪些类别经常混淆。",
            "related": [
              {
                "id": "d-recognition",
                "reason": "对应药片外观分类的评测"
              },
              {
                "id": "e-sklearn",
                "reason": "查阅 confusion_matrix 的输入与输出"
              },
              {
                "id": "c-error-review",
                "reason": "回到具体错误图像解释计数"
              }
            ],
            "source": "官方资料阅读（2026-11-15）；场景应用为本轮提出的学习方案。",
            "understanding": "拟固定类别顺序，同时报告原始计数与各类样本数；若采用归一化，要说明分母。未知对象和模型未返回的结果另行记录，不从分类分数推断用药方式。",
            "sources": [
              "s-confusion"
            ],
            "evidenceNote": "资料核对仅支持方法与工具概念；在本组药品图像上的效果仍待实际验证。"
          }
        }
      ]
    },
    "eco": {
      "name": "生态地图",
      "color": "eco",
      "categories": [
        "研究团队",
        "工具与社区",
        "学习资源"
      ],
      "entries": [
        {
          "id": "e-zju",
          "name": "浙江大学人工智能学院",
          "brief": "本课程主办方，机器视觉相关课程与研究平台。",
          "category": "研究团队",
          "status": "已核实",
          "detail": {
            "description": "本课程授课单位。杨洋（副院长、博导）研究具身智能与脑机接口，其「番茄采摘机器人」案例正是机器视觉的落地演示；学院培养方案分智能理论、模型、系统、工程四个方向，「视觉智能」是智能模型方向的必修课。",
            "relation": "本组「机器视觉 + 用药安全」的技术路线，直接受益于学院的视觉智能课程与研究资源。",
            "related": [
              {
                "id": "d-course",
                "reason": "视觉智能等课程来自学院培养方案"
              },
              {
                "id": "d-recognition",
                "reason": "学院研究为药片识别提供方法支撑"
              },
              {
                "id": "c-interest",
                "reason": "为本组提供能力与机会的支撑"
              }
            ],
            "source": "课堂：2026-10-16 第二讲（杨洋）主讲人介绍与培养方案。",
            "understanding": "杨洋研究分理论与应用：理论是领域泛化、鲁棒性学习；应用是具身智能与脑机接口。"
          }
        },
        {
          "id": "e-opencv",
          "name": "OpenCV",
          "brief": "经典的开源计算机视觉库。",
          "category": "工具与社区",
          "status": "部分核实",
          "detail": {
            "description": "广泛使用的开源计算机视觉库，提供图像处理与经典视觉算法实现。课堂散场答疑提到，入门视觉方向「要先学神经网络与 OpenCV」。",
            "relation": "可用于药瓶标签的图像预处理（增强、裁剪），辅助 OCR 与药片识别。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "提供图像预处理，辅助文字识别"
              },
              {
                "id": "d-recognition",
                "reason": "提供传统图像处理方法"
              },
              {
                "id": "d-evaluation",
                "reason": "拟通过评测检查预处理是否有益"
              }
            ],
            "source": "课堂：2026-10-16 第二讲散场答疑提及 OpenCV；入口 https://opencv.org/。",
            "understanding": "OpenCV 可作为图像处理学习入口。官方教程介绍固定阈值与自适应阈值；是否适合具体标签图像，需要与原图对照测试，不能预设处理后一定更好。",
            "sources": [
              "s-opencv"
            ],
            "evidenceNote": "已查阅阈值化教程；尚未在本组样本上验证预处理收益。"
          },
          "learning": "待实践"
        },
        {
          "id": "e-pytorch",
          "name": "PyTorch",
          "brief": "主流的深度学习框架。",
          "category": "工具与社区",
          "status": "部分核实",
          "detail": {
            "description": "广泛使用的深度学习框架，用于搭建和训练神经网络模型。",
            "relation": "可用于实现药片图像识别模型。",
            "related": [
              {
                "id": "d-recognition",
                "reason": "用于实现药片识别模型"
              },
              {
                "id": "d-data",
                "reason": "在训练前组织样本与标签"
              }
            ],
            "source": "入口 https://pytorch.org/（公开可核查）；课堂课程体系相关。",
            "understanding": "定位为模型实现框架；尚未实践。",
            "sources": [
              "s-torch"
            ],
            "evidenceNote": "已核对数据加载学习入口；模型实现和训练尚未完成。"
          },
          "learning": "待实践"
        },
        {
          "id": "e-waytoagi",
          "name": "WaytoAGI",
          "brief": "综合性 AI 学习资源入口。",
          "category": "学习资源",
          "status": "待阅读",
          "detail": {
            "description": "「通往 AGI 之路」综合性 AI 学习资源入口。课堂特别提醒：要访问它的飞书知识库，而不是只看首页推荐的工具。",
            "relation": "用于在更广的 AI 图景中定位「机器视觉」，追踪前沿工具与案例。",
            "related": [
              {
                "id": "c-interest",
                "reason": "为制定学习计划提供资源入口"
              },
              {
                "id": "c-evidence",
                "reason": "社区线索需回到原始资料核对"
              }
            ],
            "source": "课堂：2026-10-17 第三讲（孙凌云）推荐 WaytoAGI.com 及其飞书知识库；入口 https://www.waytoagi.com/。",
            "understanding": "待阅读：尚未阅读具体材料，暂不形成理解。"
          }
        },
        {
          "id": "e-paddleocr",
          "name": "PaddleOCR 文档与项目",
          "brief": "从官方资料学习文字检测与识别工具。",
          "category": "工具与社区",
          "status": "资料已核对",
          "learning": "待实践",
          "detail": {
            "description": "PaddleOCR 官方文档提供 OCR 工具的安装、使用和学习入口。此处将它作为候选资料与工具，尚未确定为本组最终技术方案。",
            "relation": "服务于本组用药识别场景的学习与验证。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "提供 OCR 实现与学习入口"
              },
              {
                "id": "c-compare",
                "reason": "作为后续技术方案比较的候选"
              },
              {
                "id": "d-text-pipeline",
                "reason": "按流水线模块阅读 OCR 文档"
              }
            ],
            "source": "来源与依据见下方原始资料；场景设计属于本组待讨论方案。",
            "understanding": "已核对官方文档入口，未运行本组药品标签测试；版本与运行条件需在实际尝试时记录。",
            "sources": [
              "s-paddle"
            ],
            "evidenceNote": "资料入口已核对，场景效果尚未验证。"
          }
        },
        {
          "id": "e-sklearn",
          "name": "scikit-learn 评测工具",
          "brief": "用官方资料核对分组划分与混淆矩阵的含义。",
          "category": "工具与社区",
          "status": "资料已核对",
          "learning": "资料已读 · 待实践",
          "detail": {
            "description": "本轮选读 scikit-learn 的分组交叉验证与 confusion_matrix 文档。前者提供不让同组跨训练/测试的划分方法，后者统计真实与预测类别的组合；工具本身不会替我们定义正确标签或评测目标。",
            "relation": "连接数据准备、分类评测与方法比较，作为实际实施前可核对的工具入口。",
            "related": [
              {
                "id": "d-test-split",
                "reason": "核对分组隔离的条件"
              },
              {
                "id": "d-confusion",
                "reason": "核对分类计数的读法"
              },
              {
                "id": "c-compare",
                "reason": "用相同条件比较方案"
              }
            ],
            "source": "官方资料阅读（2026-11-15）；场景应用为本轮提出的学习方案。",
            "understanding": "只按需要学习两项工具，先理解输入字段，再决定是否使用；本组尚未运行数据划分或得到混淆矩阵。",
            "sources": [
              "s-group",
              "s-confusion"
            ],
            "evidenceNote": "资料核对仅支持方法与工具概念；在本组药品图像上的效果仍待实际验证。"
          }
        },
        {
          "id": "e-wai",
          "name": "W3C WAI 适老设计资源",
          "brief": "从可读性、点击目标和清楚的反馈检查界面。",
          "category": "学习资源",
          "status": "资料已核对",
          "learning": "资料已读 · 待实践",
          "detail": {
            "description": "W3C WAI 的 Older Users 资料说明，随年龄变化的视觉、操作、听觉和认知能力可能影响网页使用；这些需求与网页无障碍存在大量重合。它是界面设计的学习入口，不是本站已通过无障碍认证的证明。",
            "relation": "把技术识别结果与人能否看清、理解、核对连接起来，避免只关注模型输出。",
            "related": [
              {
                "id": "d-review",
                "reason": "让核对与重拍入口易于发现"
              },
              {
                "id": "d-task",
                "reason": "返回老年人居家场景的具体需求"
              },
              {
                "id": "c-evidence",
                "reason": "区分设计依据与用户测试结果"
              }
            ],
            "source": "官方资料阅读（2026-11-15）；场景应用为本轮提出的学习方案。",
            "understanding": "拟检查正文对比度、字号缩放、点击区域、键盘操作和错误提示。能否被目标使用者理解仍需要真实观察，不能仅由组员主观判断。",
            "sources": [
              "s-wai"
            ],
            "evidenceNote": "资料核对仅支持方法与工具概念；在本组药品图像上的效果仍待实际验证。"
          }
        }
      ]
    },
    "cog": {
      "name": "认知地图",
      "color": "cog",
      "categories": [
        "问题分析",
        "学习规划",
        "认识修正",
        "认知工具"
      ],
      "entries": [
        {
          "id": "c-interest",
          "name": "兴趣、能力与机会的关系",
          "brief": "兴趣是探索出来的，不是先想清楚的。",
          "category": "学习规划",
          "status": "已核实",
          "detail": {
            "description": "课堂把「兴趣、能力、机会」画成三角：什么问题让我愿意持续探索、我和我的环境是否具备支撑条件、什么值得我长期投入。判断句是——兴趣是在探索中逐渐形成的持续投入意愿。",
            "relation": "本组用这一框架，把「智慧医疗 + 适老化」的兴趣落到具体的机器视觉用药识别任务上。",
            "related": [
              {
                "id": "e-zju",
                "reason": "课程与研究是「机会」的来源"
              },
              {
                "id": "d-course",
                "reason": "课程路径是「能力」的来源"
              },
              {
                "id": "d-intro",
                "reason": "把兴趣判断落回当前任务范围"
              }
            ],
            "source": "课堂：2026-10-17 第三讲（孙凌云）框架；本组填写（闫通修）。",
            "understanding": "本组填写：我对「智慧医疗」与「适老化设计」非常感兴趣，特别是如何通过科技手段解决老年人在现实生活中的「数字鸿沟」和日常安全痛点。已有能力：具备基础 Web 前端开发能力（HTML/CSS/JavaScript），掌握一定的用户调研与问卷访谈技巧，能独立完成初步的需求采集。",
            "framework": [
              "下一步（1）：一周内实地走访，完成 5-10 位老年人的用药场景深度访谈",
              "下一步（2）：学习机器视觉中「文字识别（OCR）」的基础调用逻辑，跑通识别药瓶标签的 Demo",
              "下一步（3）：把调研痛点与机器视觉技术匹配，输出产品功能需求文档（PRD）"
            ]
          }
        },
        {
          "id": "c-compare",
          "name": "如何比较两种方法",
          "brief": "用统一框架比较技术路线，避免凭印象选。",
          "category": "问题分析",
          "status": "已核实",
          "detail": {
            "description": "课堂给了现成比较案例：判定式 vs 生成式（哪个更难）、开源 vs 开放权重（开放了什么、允许做什么）、云端 vs 端侧部署。比较的关键是确定「比较条件」和「依据」。",
            "relation": "本组可用它比较不同的技术路线，例如「调用现成 OCR/图像识别 API」与「自训练模型」的取舍。",
            "related": [
              {
                "id": "d-ocr",
                "reason": "比较不同 OCR 实现方案"
              },
              {
                "id": "d-recognition",
                "reason": "比较 API 调用与自训练模型"
              },
              {
                "id": "d-evaluation",
                "reason": "比较方法前约定共同评测条件"
              }
            ],
            "source": "课堂：2026-10-16 第二讲（判定式／生成式、云端／端侧）、2026-10-17 第三讲（开源／开放权重）。",
            "understanding": "已理解「判定式比生成式简单」的概率论证；本组对「API vs 自训练」的具体比较尚未完成。",
            "framework": [
              "比较的问题是什么",
              "比较的条件是什么",
              "依据是什么",
              "当前判断是什么",
              "局限在哪里"
            ]
          }
        },
        {
          "id": "c-halflife",
          "name": "知识半衰期",
          "brief": "不同知识衰减速度不同，学习策略也不同。",
          "category": "认知工具",
          "status": "已核实",
          "detail": {
            "description": "课堂把「学什么」按半衰期分成五类：基础知识（长，做深）、核心专业能力（中长，做强）、前沿专业知识（快速缩短，做活）、工具与工程技能（很短，做快）、高阶能力（反而升值，做高）。",
            "relation": "帮本组判断：机器视觉里的数学与识别原理要深挖，而具体的 OCR API、框架工具要「做快」，不被某个工具绑死。",
            "related": [
              {
                "id": "d-course",
                "reason": "培养方案按半衰期组织"
              },
              {
                "id": "e-waytoagi",
                "reason": "工具类技能半衰期短，需持续追踪更新"
              }
            ],
            "source": "课堂：2026-10-17 第三讲（孙凌云）「知识半衰期分化」表格。",
            "understanding": "总结句：长半衰期知识做深，短半衰期知识做快，高阶能力做强。"
          }
        },
        {
          "id": "c-revision",
          "name": "一次认识修正",
          "brief": "从「吃药闹钟」到「智能识别防错」的判断转变。",
          "category": "认识修正",
          "status": "待原记录核对",
          "detail": {
            "description": "保留原稿填写者（闫通修）报告的认识转变：「单纯提醒时间」转向「识别与核对」。本轮仅确认这一说法存在于原稿，原调研材料仍待补充。",
            "relation": "这次修正直接改变了本组的系统重心：从「提醒时间」转向「识别与防错」。",
            "related": [
              {
                "id": "d-task",
                "reason": "修正后的判断直接体现在典型任务里"
              },
              {
                "id": "c-evidence",
                "reason": "给已有认识修正补证据检查入口"
              }
            ],
            "source": "本组填写（闫通修）。",
            "understanding": "原稿判断认为看不清标签、记混药值得重点研究。现在应继续追问：哪些观察支持这次转变，样本范围是什么，还有什么反例？取得原记录后，再决定是否调整任务优先级。",
            "framework": [
              "原稿判断：最初偏重提醒时间",
              "报告的变化：关注标签可读与混淆问题",
              "待核对：调研原记录、适用范围与反例"
            ],
            "evidenceNote": "保留组长提供的调研与认识摘要；本轮未取得访谈原记录、授权材料或课堂原件，相关经历与结论待原提供者确认。不得据此推断普遍人群结论。"
          }
        },
        {
          "id": "c-ocr-plan",
          "name": "OCR 拍摄条件对照计划",
          "brief": "固定条件比较，保留失败与未知。",
          "category": "问题分析",
          "status": "计划未执行",
          "learning": "待实践",
          "detail": {
            "description": "问题：拍摄条件与预处理变化会怎样影响标签文本识别？拟固定样本与 OCR 配置，分别改变一个条件，保留原图、处理图、识别输出与人工参照。比较原图与处理后输出，不预设哪组更好。",
            "relation": "服务于本组用药识别场景的学习与验证。",
            "related": [
              {
                "id": "d-evaluation",
                "reason": "按统一规则检查输出"
              },
              {
                "id": "e-opencv",
                "reason": "预处理方法的原始学习资料"
              },
              {
                "id": "d-review",
                "reason": "异常与未知必须进入分析"
              },
              {
                "id": "c-compare",
                "reason": "把比较方法用于具体问题"
              },
              {
                "id": "d-capture",
                "reason": "将拍摄条件落实为可追溯记录"
              },
              {
                "id": "c-error-review",
                "reason": "预先约定错误记录格式"
              }
            ],
            "source": "本轮提出的分析与设计计划，尚无本组执行结果。",
            "understanding": "计划未执行。尚无图片、模型输出或比较结果。执行后补充日期、工具版本、条件、逐项观察、其他解释与当前判断。",
            "sources": [],
            "evidenceNote": "计划不是实验结果；执行条件和记录待组员补充。"
          }
        },
        {
          "id": "c-error-review",
          "name": "错误样本复盘计划",
          "brief": "保留原图与输出，把失败转成下一步问题。",
          "category": "问题分析",
          "status": "计划未执行",
          "learning": "待实践",
          "detail": {
            "description": "拟建立「样本编号—原图—标准记录—工具与设置—实际输出—错误类型—待验证解释」表。OCR 分开记录漏检与读错；外观分类回查混淆类别；超出范围的输入单列，不用虚构例子代替实验。",
            "relation": "把采集、OCR、分类与评测连接到可复核的认识修正；同一记录需要别人能够追溯原始依据。",
            "related": [
              {
                "id": "d-text-pipeline",
                "reason": "先分辨 OCR 失败环节"
              },
              {
                "id": "d-confusion",
                "reason": "从类别计数回到具体图像"
              },
              {
                "id": "d-review",
                "reason": "记录需要人工核对的异常"
              },
              {
                "id": "c-evidence",
                "reason": "检查解释是否有证据"
              }
            ],
            "source": "本轮提出的分析与记录计划，尚无执行结果。",
            "understanding": "先描述看到的错误，再写可能原因，最后决定下一次只改变什么。没有对照就把「可能因为反光」保留为假设。当前尚无本组错误样本或统计结果。",
            "sources": [],
            "framework": [
              "观察：原图与输出具体不一致在哪里",
              "假设：可能原因，标注尚未证实",
              "行动：下一次对照与需要保留的记录"
            ],
            "evidenceNote": "此处是待小组讨论的计划，不表示已采集样本、完成用户测试或获得实验结果。"
          }
        },
        {
          "id": "c-evidence",
          "name": "证据与推断检查",
          "brief": "原始资料、个人判断和待验证计划分开写。",
          "category": "认知工具",
          "status": "计划未执行",
          "learning": "待实践",
          "detail": {
            "description": "本轮提出统一更新检查表：资料给出了什么、本组怎样理解、哪些结论仍需要原记录或实验。链接到工具文档只能核对工具概念，不能证明本组调研经历或模型效果。",
            "relation": "为三图连接建立共同的证据边界，也为旧节点中的调研摘要、课堂记录与认识修正提供补证入口。",
            "related": [
              {
                "id": "c-revision",
                "reason": "认识变化需能追溯原始依据"
              },
              {
                "id": "c-halflife",
                "reason": "区分持续有效的方法与变化较快的工具资料"
              },
              {
                "id": "d-intro",
                "reason": "回到选题范围检查结论是否过大"
              }
            ],
            "source": "本轮提出的分析与记录计划，尚无执行结果。",
            "understanding": "更新时由原资料提供者核对调研与课堂表述；由实施者补原图、条件与结果；AI 可辅助归纳和排版，但亲历内容、实际结果及判断依据须人确认。",
            "sources": [],
            "framework": [
              "事实：来源位置、阅读日期、支持范围",
              "理解：小组当前判断及理由",
              "待核查：缺失记录、未执行计划与下一步"
            ],
            "evidenceNote": "此处是待小组讨论的计划，不表示已采集样本、完成用户测试或获得实验结果。"
          }
        }
      ]
    }
  },
  "updates": [
    {
      "version": "v0.8",
      "date": "2026-11-15",
      "summary": "第二次更新：补全学习路径，建立居家用药主题界面与自定义关系图（用户验收通过，待组长发布）。",
      "mapScope": "三张地图、首页、可视化与来源",
      "changes": "新增采集、OCR 模块、分组划分、分类混淆、scikit-learn、WAI、错误复盘与证据检查八个节点；补既有节点入口与跨图关联；新增三条阅读路径、自定义关系图与 editorial Archify 流程版。",
      "reason": "先补输入—数据—评测—核对之间的缺口，再扩展资料；让界面与图形共同体现居家用药识别主题。",
      "openIssues": "采集、对照与错误复盘仍未执行；旧调研与课堂原记录待确认；云端模型与共享反馈需在原环境单独验证。",
      "next": "用户已验收通过并授权提交推送，交组长合并并发布到原网址。",
      "assign": "用户与 Codex 本地维护；原记录由原提供者核对",
      "check": "用户已验收通过；数据检查、13 项浏览器检查及多屏幕宽度检查通过；未调用真实模型或提交反馈。",
      "feedbackRef": "无"
    },
    {
      "version": "v0.7",
      "date": "2026-11-11",
      "summary": "首次更新：补充资料与分析计划，优化阅读和检索，新增 Archify 可视化（验收通过，待发布）。",
      "mapScope": "三张地图、首页、来源展示、可视化页面",
      "changes": "新增评测、失败核对、PaddleOCR 资料与 OCR 对照计划四个条目；为相关节点补官方资料和理解状态；新增搜索分类、条目定位与可视化入口。",
      "reason": "把技术条目连接到资料、评测与可执行的分析计划，改善内容增长后的探索方式。",
      "openIssues": "对照计划未执行；课程与调研原材料需组员确认；模型服务和共享反馈尚待原环境测试。",
      "next": "用户已验收通过，与基础修复一同推送，待组长审核发布原网站。",
      "assign": "用户与 Codex 协作；原调研记录由提供者确认",
      "check": "数据与脚本检查、浏览器搜索筛选、跨图跳转及图文联动通过；用户已验收；云端 AI 与反馈未实测，尚未发布。",
      "feedbackRef": "无"
    },
    {
      "version": "v0.6.1",
      "date": "2026-11-11",
      "summary": "修复 AI 课程上下文遗漏，校正选题文案与详情面板键盘操作（本地待发布）。",
      "mapScope": "页面标题、认知地图导语、课程条目、AI 解读、详情面板、项目说明",
      "changes": "AI 解读读取课程完整说明、来源与当前理解，兼容有无填写框架；面板关闭后不可获得焦点，打开与关闭时转移并恢复焦点；修正旧选题文案和课程误字。原有条目 ID、关联、历史更新及云服务配置保留。",
      "reason": "源码检查发现课程内容未进入 AI 上下文，部分文案仍沿用早期选题，关闭的详情面板仍可被键盘访问。",
      "openIssues": "课程内容尚需对照适用培养方案；真实模型调用、云反馈与线上发布结果待原项目环境检查。",
      "next": "审核本地修复；另行审查首次内容、美术与 Archify 更新计划。",
      "assign": "用户与 Codex 本地协作修复；组长审核发布待安排",
      "check": "本地检查结果见本次修复说明；未调用线上模型或写入反馈，尚未发布。",
      "feedbackRef": "无"
    },
    {
      "version": "v0.6",
      "date": "2026-11-08",
      "summary": "新增「AI 解读」能力：在条目详情中用 AI 解释技术、相关条目与对应课程。",
      "mapScope": "领域地图、生态地图、认知地图（条目详情面板）",
      "changes": "在每个条目详情面板加入「用 AI 解读这个概念」按钮，调用云服务免密钥大模型，结合地图内容流式回答「它是什么、解决什么问题、和什么相关、对应哪些课程」；AI 回答严格基于地图内容，不编造。",
      "reason": "满足作业「至少实现一项与地图直接相关的 AI 能力」的硬性要求。",
      "openIssues": "AI 解读功能需发布后实测；回答内容受地图内容与模型能力约束。",
      "next": "实测 AI 解读功能；补充数据采集标注。",
      "assign": "待填写",
      "check": "待测试",
      "feedbackRef": "无"
    },
    {
      "version": "v0.5",
      "date": "2026-11-08",
      "summary": "选题定稿为「老年人用药安全」，填入认知地图、成员分工与实地调研结果。",
      "mapScope": "首页、领域地图、生态地图、认知地图、更新记录",
      "changes": "选题定稿为「老年人用药安全与健康管理场景」（机器视觉技术路线）；领域地图重建为 OCR、药片识别、用药场景；认知地图填入「兴趣能力机会」「一次认识修正」的真实填写；补入成员分工与实地调研痛点（李奶奶案例、记混药、看不清说明书）。",
      "reason": "小组完成实地调研，用调研结果修正了选题方向与认知，选题与内容最终定稿。",
      "openIssues": "药片识别与 OCR 尚未实际开发（仅跑通 Demo 待做）；数据标注待开展。",
      "next": "完成 OCR Demo 与药片识别；补充数据采集标注；补入至少一个分析案例。",
      "assign": "闫通修（组长，统筹+调研+需求）；黄原（机器视觉技术攻坚：OCR 与图像识别 API）；张守约（Web 前端与小程序、视觉交互、跨设备测试）；魏祥昆（后端数据、药品数据库、发布部署）",
      "check": "待测试",
      "feedbackRef": "无"
    },
    {
      "version": "v0.4",
      "date": "2026-11-08",
      "summary": "典型任务改为自选的「慢病老人居家用药管理」，方向仍为智能产品与交互。",
      "mapScope": "首页、领域地图、生态地图、认知地图",
      "changes": "典型任务由「老人夜间安全起身」改为自选的「慢病老人居家用药管理」；更新三张地图的关联与说明；自选任务的具体需求细节标注「待核实」，仅套用课堂方法论、不编造数据。",
      "reason": "小组希望选题不与课堂演示案例（老人夜起）重复，改为同类但课堂未出现的自选任务。",
      "openIssues": "自选任务的实地需求调研未开展；认知地图待填写。",
      "next": "调研用药场景的真实需求，补入认知地图。",
      "assign": "待填写",
      "check": "待测试",
      "feedbackRef": "无"
    },
    {
      "version": "v0.3",
      "date": "2026-11-08",
      "summary": "选题方向由「机器视觉」切换为「智能产品与交互」。",
      "mapScope": "首页、领域地图、生态地图、认知地图",
      "changes": "三张地图整体重写：领域地图改为智能产品概念、需要与需求、双钻石、五条课程线；生态地图改为浙大智能设计专业、Rokid、Ray-Ban Meta、AI Pin；认知地图改为需要需求分析、双钻石等。",
      "reason": "小组决定放弃「机器视觉」方向，转向「智能产品与交互」（第四讲张克俊方向）。",
      "openIssues": "认知地图「兴趣能力机会」「一次认识修正」待填写。",
      "next": "确定典型任务，填写认知地图。",
      "assign": "待填写",
      "check": "待测试",
      "feedbackRef": "无"
    },
    {
      "version": "v0.2",
      "date": "2026-11-08",
      "summary": "补入课堂真实内容，以「番茄采摘机器人」为主线充实三张地图。",
      "mapScope": "领域地图、生态地图、认知地图",
      "changes": "领域地图新增「番茄采摘机器人」「课程与学习路径」；生态地图新增「浙江大学人工智能学院」；认知地图新增「知识半衰期」；各条目来源标注到具体讲次，状态由「待核实」改为「已核实」。",
      "reason": "把演示初稿替换为可核查的课堂真实内容（第二讲、第三讲）。",
      "openIssues": "认知地图的本组具体填写仍待完成。",
      "next": "本组讨论后填写认知地图。",
      "assign": "待填写",
      "check": "待测试",
      "feedbackRef": "无"
    },
    {
      "version": "v0.1",
      "date": "2026-10-25",
      "summary": "搭建基础原型：建立六个视图与三张地图骨架，接入反馈共享数据库。",
      "mapScope": "首页、领域地图、生态地图、认知地图、更新记录、反馈页",
      "changes": "建立卡片式结构与详情面板；实现跨地图关联跳转；接入云服务共享数据库实现反馈提交与查看。",
      "reason": "首次搭建，先跑通基础版本。",
      "openIssues": "三张地图内容均为演示初稿，需核实并逐步补充真实学习内容。",
      "next": "补充真实课堂与阅读内容，核实各条目来源。",
      "assign": "待填写",
      "check": "待测试",
      "feedbackRef": "无"
    }
  ],
  "sources": [
    {
      "id": "s-opencv",
      "title": "OpenCV 官方教程 Image Thresholding",
      "url": "https://docs.opencv.org/4.x/d7/d4d/tutorial_py_thresholding.html",
      "position": "Goal 与 Adaptive Thresholding",
      "checked": "2026-11-11",
      "scope": "支持阈值化与局部阈值的概念；不证明本组场景中的性能。"
    },
    {
      "id": "s-paddle",
      "title": "PaddleOCR 官方文档",
      "url": "https://www.paddleocr.ai/latest/en/index.html",
      "position": "Quick Overview 与安装和入门导航",
      "checked": "2026-11-11",
      "scope": "支持工具用途与学习入口；不代表本组已完成药品标签测试。"
    },
    {
      "id": "s-torch",
      "title": "PyTorch 官方教程 Datasets and DataLoaders",
      "url": "https://docs.pytorch.org/tutorials/beginner/basics/data_tutorial.html",
      "position": "Dataset 与 DataLoader 说明",
      "checked": "2026-11-11",
      "scope": "支持数据组织与加载的学习入口；不证明药片分类模型效果。"
    },
    {
      "id": "s-paddle-pipeline",
      "title": "PaddleOCR 通用 OCR 流水线文档",
      "url": "https://www.paddleocr.ai/latest/en/version3.x/pipeline_usage/OCR.html",
      "position": "Pipeline Introduction 与文字检测/识别模块说明",
      "checked": "2026-11-15",
      "scope": "核对 OCR 模块分工，不证明药品标签识别的性能。"
    },
    {
      "id": "s-group",
      "title": "scikit-learn：分组数据的交叉验证",
      "url": "https://scikit-learn.org/stable/modules/cross_validation.html#group-k-fold",
      "position": "Cross-validation iterators for grouped data / Group K-fold",
      "checked": "2026-11-15",
      "scope": "支持同组隔离的划分概念；本组对象与批次分组为待执行方案。"
    },
    {
      "id": "s-confusion",
      "title": "scikit-learn：confusion_matrix",
      "url": "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.confusion_matrix.html",
      "position": "定义、y_true / y_pred 与 normalize 参数",
      "checked": "2026-11-15",
      "scope": "支持分类计数的解释，不代替 OCR 评测或实际安全验证。"
    },
    {
      "id": "s-wai",
      "title": "W3C WAI：Older Users and Web Accessibility",
      "url": "https://www.w3.org/WAI/older-users/",
      "position": "Ageing-related accessibility needs",
      "checked": "2026-11-15",
      "scope": "提供适老与无障碍设计线索，不代表本站已取得认证或完成用户测试。"
    }
  ],
  "visualization": {
    "title": "从识别任务到可核查的学习路径",
    "note": "箭头表示阅读和分析的建议顺序，不表示临床决策或已验证的系统流程。",
    "nodeIds": [
      "d-task",
      "d-ocr",
      "e-opencv",
      "d-evaluation",
      "c-ocr-plan",
      "d-review"
    ],
    "edges": [
      {
        "from": "d-task",
        "to": "d-ocr",
        "label": "技术入口"
      },
      {
        "from": "d-ocr",
        "to": "e-opencv",
        "label": "工具资料"
      },
      {
        "from": "e-opencv",
        "to": "d-evaluation",
        "label": "需要评测"
      },
      {
        "from": "d-evaluation",
        "to": "c-ocr-plan",
        "label": "形成计划"
      },
      {
        "from": "c-ocr-plan",
        "to": "d-review",
        "label": "检查异常"
      }
    ]
  },
  "paths": [
    {
      "id": "ocr",
      "name": "看清一张标签",
      "question": "从输入条件，走向识别与核对。",
      "ids": [
        "d-task",
        "d-capture",
        "d-ocr",
        "d-text-pipeline",
        "e-opencv",
        "e-paddleocr",
        "c-ocr-plan",
        "c-error-review",
        "d-review"
      ]
    },
    {
      "id": "classification",
      "name": "看懂一次分类",
      "question": "从数据划分，走向错误分析。",
      "ids": [
        "d-recognition",
        "d-data",
        "d-test-split",
        "d-evaluation",
        "d-confusion",
        "e-pytorch",
        "e-sklearn",
        "c-compare",
        "c-error-review"
      ]
    },
    {
      "id": "evidence",
      "name": "让结果可核对",
      "question": "从场景与界面，回到判断的依据。",
      "ids": [
        "d-intro",
        "d-task",
        "d-review",
        "e-wai",
        "e-waytoagi",
        "c-evidence",
        "c-revision",
        "c-halflife",
        "c-interest"
      ]
    }
  ]
};

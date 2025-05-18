# 🧠 Post-Survey Coding Scheme  
**Study: Perspectives and Participation**  
_Last updated: 2025-05-18_

---

## ✅ Overview

This survey contains **51 items**, coded as integers for analysis in R and to simplify database storage.

---

## 📋 Page 1 – `/post-survey`

### **Q1–Q3: Attention Check (Radio Buttons)**

| Question                                 | Options                | Code |
|------------------------------------------|-------------------------|------|
| What colour was the USB stick?           | White / Red / Orange   | 1 / 2 / 3 |
| Was the attacker wearing an ID badge?    | Yes / No               | 1 / 2 |
| Did the attacker steal something?        | Yes / No               | 1 / 2 |

---

### **Q4–Q6: Behavioural Intention (Slider, 0–10)**

| Question                                                  | Range            |
|------------------------------------------------------------|------------------|
| Likelihood to verify identity                             | 0 = extremely unlikely → 10 = extremely likely |
| Likelihood to report strange USB                          | 0 = extremely unlikely → 10 = extremely likely |
| Likelihood to challenge suspicious behaviour              | 0 = extremely unlikely → 10 = extremely likely |

---

### **Q7–Q22: Response Performance Motivation (5-point Likert)**

| Scale                     | Value |
|---------------------------|--------|
| Strongly Disagree         | 1      |
| Disagree                  | 2      |
| Neutral                   | 3      |
| Agree                     | 4      |
| Strongly Agree            | 5      |

---

## 📋 Page 2 – `/post-survey-2`

### **Q23–Q51: All are 5-point Likert (same coding as above)**

| Construct             | Questions Q#         |
|----------------------|----------------------|
| Threat Severity       | Q23–Q25              |
| Threat Susceptibility | Q26–Q28              |
| Response Efficacy     | Q29–Q31              |
| Self-Efficacy         | Q32–Q34              |
| Response Cost         | Q35–Q39              |
| Autonomy              | Q40–Q43              |
| Competence            | Q44–Q47              |
| Relatedness           | Q48–Q51              |

---

## ✅ Submission Format

Submitted to the backend as:

```json
{
  "code": "ABCD",
  "responses": {
    "q1": 2,
    "q2": 1,
    ...
    "q51": 4
  }
}
```

---

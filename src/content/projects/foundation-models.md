---
title: Biomedical foundation models
organization: MIT Lincoln Laboratory
period: 2023–2026
summary: Distributed training of a 10-billion-parameter medical foundation model, and data curation for more efficient pretraining.
order: 2
featured: true
source: "content/resume.pdf, MIT Lincoln Laboratory research experience"
todos:
  - "TODO: Add public paper/code links and an approved project image if available."
---
I pretrained and fine-tuned a 10-billion-parameter medical foundation model using PyTorch FSDP across 32 NVIDIA H100 GPUs. Downstream breast-cancer and heart-disease classification performance reached 0.85 AUROC.

I also applied hierarchical feature clustering to curate medical and biology pretraining data, reducing pretraining compute by approximately 30% without sacrificing downstream performance.

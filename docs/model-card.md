# Model card — Alzheimer’s Risk Research Demo

**Version:** demo-1.0.0  
**Status:** Educational demonstration; no clinical validity.

## Purpose and intended use
Demonstrate a versioned, validated inference workflow, explainable output, persistence, and report generation using synthetic or non-identifiable inputs.

## Non-intended use
Diagnosis, screening, treatment selection, emergency decisions, clinical workflows, or use with real patient records. The score must not be interpreted as disease probability.

## Features
Age (40–100), MMSE score (0–30), functional assessment (0–10), activities of daily living (0–10), and binary memory-complaint indicator. These are interface fields for the demo adapter, not endorsement of a clinical feature set.

## Training and evaluation
The demo adapter is deterministic transparent scoring and was not trained on a clinical dataset. Therefore no accuracy, precision, recall, F1, or ROC-AUC is reported. The optional training pipeline computes these metrics only after an authorized dataset is supplied.

## Explainability
Additive feature contributions describe the adapter's arithmetic. They do not imply causation, medical importance, or clinical validity.

## Limitations, bias, and ethics
The model has not been externally validated, calibrated, subgroup-tested, or assessed for demographic bias. Inputs may encode historical and measurement bias. Human medical evaluation cannot be replaced. A trained replacement requires dataset provenance, license review, subgroup evaluation, calibration, security review, and independent clinical governance.

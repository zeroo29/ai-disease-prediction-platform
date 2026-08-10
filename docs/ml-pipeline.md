# ML pipeline

The application ships in clearly marked demo mode because no trained artifact or licensed dataset was supplied. `ml/src/train.py` consumes an authorized CSV, validates schema, performs a stratified held-out split, and fits imputation/scaling only inside training folds. GridSearchCV compares logistic regression, random forest, and gradient boosting. Selection prioritizes ROC-AUC, then recall and F1—not accuracy alone. Reports are generated from actual runs and are not committed as fabricated examples.

To integrate an existing notebook, extract deterministic preprocessing to `ml/src/preprocessing.py`, test it, serialize the fitted preprocessing and estimator together, generate SHA-256 metadata, and follow `backend/app/ml/README.md`. Re-evaluate on a never-seen test set and update the model card before disabling demo mode.

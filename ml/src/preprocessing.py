"""Leakage-safe preprocessing definitions for authorized tabular data."""
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

FEATURES = ["age", "mmse", "functionalAssessment", "adl", "memoryComplaints"]
TARGET = "target"

def validate_frame(frame):
    missing = set(FEATURES + [TARGET]) - set(frame.columns)
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")
    if frame.empty or frame[TARGET].nunique() != 2:
        raise ValueError("Dataset must be non-empty with a binary target")

def preprocessor():
    return ColumnTransformer([("numeric", Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ]), FEATURES)])

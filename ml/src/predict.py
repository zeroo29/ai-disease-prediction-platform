"""Offline smoke-test utility for an exported sklearn pipeline."""
import argparse, json, joblib, pandas as pd
from preprocessing import FEATURES
p=argparse.ArgumentParser();p.add_argument("--model",required=True);p.add_argument("--input",required=True,help="JSON object with exact model features");a=p.parse_args();values=json.loads(a.input)
if set(values) != set(FEATURES): raise ValueError(f"Expected exactly: {FEATURES}")
model=joblib.load(a.model);prob=float(model.predict_proba(pd.DataFrame([values],columns=FEATURES))[0,1]);print(json.dumps({"probability":prob}))

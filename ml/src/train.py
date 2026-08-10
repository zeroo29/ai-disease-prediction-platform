"""Reproducible model comparison; outputs only metrics computed from supplied data."""
import argparse, hashlib, json
from pathlib import Path
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.pipeline import Pipeline
from preprocessing import FEATURES, TARGET, validate_frame, preprocessor
SEED = 42

def metrics(model, x, y):
    pred = model.predict(x); prob = model.predict_proba(x)[:, 1]
    return {"accuracy": accuracy_score(y,pred), "precision":precision_score(y,pred,zero_division=0), "recall":recall_score(y,pred,zero_division=0), "f1":f1_score(y,pred,zero_division=0), "roc_auc":roc_auc_score(y,prob), "confusion_matrix":confusion_matrix(y,pred).tolist()}

def main(csv_path, output):
    frame=pd.read_csv(csv_path); validate_frame(frame)
    x_train,x_test,y_train,y_test=train_test_split(frame[FEATURES],frame[TARGET],test_size=.2,stratify=frame[TARGET],random_state=SEED)
    candidates={
      "logistic_regression":(LogisticRegression(max_iter=1000,class_weight="balanced",random_state=SEED),{"model__C":[.1,1,10]}),
      "random_forest":(RandomForestClassifier(class_weight="balanced",random_state=SEED),{"model__n_estimators":[100,250],"model__max_depth":[4,8,None]}),
      "gradient_boosting":(GradientBoostingClassifier(random_state=SEED),{"model__n_estimators":[100,200],"model__learning_rate":[.03,.1]})}
    results={}; trained={}
    for name,(estimator,grid) in candidates.items():
      search=GridSearchCV(Pipeline([("preprocessing",preprocessor()),("model",estimator)]),grid,scoring="roc_auc",cv=5,n_jobs=-1)
      search.fit(x_train,y_train); trained[name]=search.best_estimator_; results[name]={**metrics(search.best_estimator_,x_test,y_test),"best_params":search.best_params_}
    # Selection emphasizes ROC-AUC and recall rather than accuracy alone.
    winner=max(results,key=lambda n:(results[n]["roc_auc"],results[n]["recall"],results[n]["f1"]))
    out=Path(output);out.mkdir(parents=True,exist_ok=True);model_path=out/"alzheimer_pipeline.joblib";joblib.dump(trained[winner],model_path)
    checksum=hashlib.sha256(model_path.read_bytes()).hexdigest(); report={"selected_model":winner,"seed":SEED,"features":FEATURES,"selection_rule":"ROC-AUC, then recall, then F1","results":results,"checksum":checksum}
    (out/"model_comparison.json").write_text(json.dumps(report,indent=2));print(json.dumps(report,indent=2))
if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("--data",default="ml/data/alzheimer.csv");p.add_argument("--output",default="ml/models");a=p.parse_args();main(a.data,a.output)

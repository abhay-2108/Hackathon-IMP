import sys
import json
import os
import pickle
from pathlib import Path

import pandas as pd


def classify_risk(probability: float) -> str:
  if probability < 0.3:
    return "Low"
  elif probability < 0.7:
    return "Medium"
  else:
    return "High"


def main():
  try:
    raw = sys.stdin.read()
    payload = json.loads(raw) if raw else {}
  except Exception as e:
    print(json.dumps({"error": f"invalid JSON: {e}"}))
    return 1

  # Resolve model path relative to this script's project root
  root = Path(__file__).resolve().parents[1]
  candidates = [
    root / "diabetic_model.pkl",
    root / "models" / "diabetic_model.pkl",
  ]
  model_path = next((p for p in candidates if p.exists()), None)
  if not model_path:
    print(json.dumps({"error": "model file not found"}))
    return 2

  try:
    with open(model_path, "rb") as f:
      model_data = pickle.load(f)
  except Exception as e:
    print(json.dumps({"error": f"failed to load model: {e}"}))
    return 3

  try:
    feature_names = model_data["feature_names"]
    calibrated_model = model_data["calibrated_model"]
    scaler = model_data["scaler"]
    model_type = model_data.get("model_type", "model")

    # Ensure all required features
    feature_values = []
    for feat in feature_names:
      feature_values.append(payload.get(feat, 0))

    X = pd.DataFrame([feature_values], columns=feature_names)
    X_scaled = pd.DataFrame(scaler.transform(X), columns=X.columns)
    pred = int(calibrated_model.predict(X_scaled)[0])
    prob = float(calibrated_model.predict_proba(X_scaled)[0, 1])
    risk = classify_risk(prob)

    print(json.dumps({
      "prediction": pred,
      "probability": prob,
      "risk_level": risk,
      "model_version": f"{model_type}_pkl_v1.0"
    }))
    return 0
  except Exception as e:
    print(json.dumps({"error": f"prediction failed: {e}"}))
    return 4


if __name__ == "__main__":
  sys.exit(main())



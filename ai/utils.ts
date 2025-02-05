import * as tf from "@tensorflow/tfjs";

// FIX: THIS IS BROKEN FOR NOW T_T, muhilak nako kapoy naman

export async function loadModel(): Promise<tf.LayersModel> {
  return await tf.loadLayersModel("/model/model.json");
}

export async function loadTokenizer(): Promise<any> {
  const response = await fetch("model/tokenizer.json");
  const tokenizer = await response.json();
  return tokenizer;
}

export async function loadLabelEncoder(): Promise<string[]> {
  const response = await fetch("model/label_encoder.json");
  return await response.json();
}

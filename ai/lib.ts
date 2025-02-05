import tf from "@tensorflow/tfjs";
import { loadModel, loadTokenizer, loadLabelEncoder } from "./utils";

// FIX: THIS IS BROKEN FOR NOW T_T, muhilak nako kapoy naman, ay ni i mind kay lagay ni

export async function classifyInput(inputText: string) {
  const model = await loadModel();
  const tokenizer = await loadTokenizer();
  const labelEncoder = await loadLabelEncoder();

  if (!model || !tokenizer || !labelEncoder) return;

  const preprocessText = (text: string): tf.Tensor => {
    if (!tokenizer) return tf.tensor([0]); // Fallback

    const words = text.toLowerCase().split(" ");
    const sequence = words.map((word) => tokenizer.word_index[word] || 0);

    // Pad sequence to match model input size (assuming max_length = 20)
    const max_length = 20;
    const paddedSequence = Array(max_length).fill(0);
    for (let i = 0; i < Math.min(sequence.length, max_length); i++) {
      paddedSequence[i] = sequence[i];
    }

    return tf.tensor([paddedSequence]);
  };

  const inputTensor = preprocessText(inputText);
  const predictionTensor = model.predict(inputTensor) as tf.Tensor;
  const predictionIndex = predictionTensor.argMax(1).dataSync()[0];

  return labelEncoder[predictionIndex];
}

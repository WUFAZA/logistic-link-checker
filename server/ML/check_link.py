import sys
import joblib
import os

# Get current script directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model and vectorizer
model = joblib.load(os.path.join(BASE_DIR, 'model.pkl'))
vectorizer = joblib.load(os.path.join(BASE_DIR, 'vectorizer.pkl'))

# Get URL from command-line argument
incoming_url = sys.argv[1]
incoming_vec = vectorizer.transform([incoming_url])

# Predict and return result
prediction = model.predict(incoming_vec)
print(prediction[0])

# Link Checker with Logistic Regression

A lightweight web app that classifies URLs as **safe** or **potentially malicious** using a binary logistic regression model. Designed for cybersecurity learners, SOC interns, and ML enthusiasts, this project integrates real-world data and modular deployment across Python and Node.js environments.

---

##  Features

-  Binary classification of URLs (safe vs. malicious)
-  Logistic regression model trained on real-world CSV data
-  Modular integration across Jupyter, PyCharm, and VS Code
-  Node.js backend with PythonShell for ML execution
-  Ideal for SOC operations, cybersecurity awareness, and ML education

---

## Tech Stack

| Layer        | Tools Used                          |
|--------------|-------------------------------------|
| ML Model     | Python, scikit-learn, pandas        |
| Data Prep    | CSV preprocessing, label mapping    |
| Backend      | Node.js, PythonShell                |
| IDE Support  | VS Code, PyCharm, Jupyter Notebook  |

---
## Code Snippets

### Dataset Preprocessing

```python
import pandas as pd

df = pd.read_csv('urls.csv')

# Map multiclass labels to binary
df['label'] = df['label'].map({'good': 0, 'bad': 1})

# Extract features (e.g., length, presence of IP, suspicious keywords)
df['url_length'] = df['url'].apply(len)
df['has_ip'] = df['url'].str.contains(r'\d+\.\d+\.\d+\.\d+').astype(int)
df['has_login'] = df['url'].str.contains('login').astype(int)
```

### **Model Training**

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X = df[['url_length', 'has_ip', 'has_login']]
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)

print("Accuracy:", accuracy_score(y_test, model.predict(X_test)))
```
### **Backend Integration**
#### `index.js`
```Javascript
const { PythonShell } = require('python-shell');

PythonShell.run('model_runner.py', { args: [userInputURL] }, function (err, results) {
  if (err) throw err;
  console.log('Prediction:', results[0]); // 0 = safe, 1 = malicious
});
```
#### `check_link.py`
```python
import sys
import pickle
import pandas as pd

url = sys.argv[1]

# Load vectorizer and model
model = pickle.load(open('logistic_model.pkl', 'rb'))

# Feature extraction
features = {
    'url_length': len(url),
    'has_ip': int(bool(re.search(r'\d+\.\d+\.\d+\.\d+', url))),
    'has_login': int('login' in url)
}

X = pd.DataFrame([features])
```
## Bugs To fix
`Input is not read `
`Improve accuracy of dataset`
`Possible over-fitting system might have memorised data set and is showing bias`
prediction = model.predict(X)[0]
print(prediction)
```

## Final Notes

This project demonstrates how simple machine learning techniques like logistic regression can be applied to real-world cybersecurity tasks. By combining Python’s ML capabilities with a Node.js backend, it offers a modular, educational tool for classifying URLs and understanding basic threat detection workflows.

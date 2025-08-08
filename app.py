from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import string
from nltk.corpus import stopwords
import nltk
from nltk.stem.porter import PorterStemmer
import re

# Download nltk resources if not already present
try:
    nltk.download('punkt_tab')
except:
    nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

ps = PorterStemmer()

# Function to preprocess the text
def transform_text(text):
    text = text.lower()
    
    # Alternative tokenization using regex instead of nltk.word_tokenize
    text = re.findall(r'\b\w+\b', text)
    
    y = []
    for i in text:
        if i.isalnum():
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        if i not in stopwords.words('english') and i not in string.punctuation:
            y.append(i)

    text = y[:]
    y.clear()

    for i in text:
        y.append(ps.stem(i))

    return " ".join(y)

# Load pre-trained model and vectorizer
tfidf = pickle.load(open('vectorizer.pkl','rb'))
model = pickle.load(open('model.pkl','rb'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        message = data.get('message', '')
        
        if not message.strip():
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Preprocess input
        transformed_sms = transform_text(message)
        # Vectorize
        vector_input = tfidf.transform([transformed_sms])
        # Predict
        result = model.predict(vector_input)[0]
        
        prediction = "Spam" if result == 1 else "Not Spam"
        
        return jsonify({
            'message': message,
            'prediction': prediction,
            'is_spam': bool(result)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'API is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
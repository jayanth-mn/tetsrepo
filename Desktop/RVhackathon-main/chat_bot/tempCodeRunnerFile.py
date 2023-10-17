

from nltk_untilities import bag_of_words, tokenize, stem
from model import neuralnetwork

with open(r'RVhackathon\chat_bot\intension.json', 'r') as f:
    intension = json.load(f)

all_words = []
tags = []
xy = []
#loop through each sentence in our intension patterns
for intent in intension['intension']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenize(pattern)
        all_words.extend(w)
        xy.append((w, tag))

#stem and lower each word to find the root of the word
ignore_words = ['?', '.', '!']
all_words = [stem(w) for w in all_words if w not in ignore_words]
#ditch duplicates and sort all items
all_words = sorted(set(all_words))
tags = sorted(set(tags))

print(len(xy), "patterns")
print(len(tags), "tags:", tags)
print(len(all_words), "unique stemmed words:", all_words)

#creating training data of model
X_train = []
y_train = []
for (pattern_sentence, tag) in xy:
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)
    #crossentropy loss function needs only class labels, not one-hot (not 1's and 0's)
    label = tags.index(tag)
    y_train.append(label)

X_train = np.array(X_train)
y_train = np.array(y_train)

# Hyper-parameters 
num_epochs = 3700
batch_size =8
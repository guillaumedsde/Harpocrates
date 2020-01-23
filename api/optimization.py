# Author: Olivier Grisel <olivier.grisel@ensta.org>
#         Peter Prettenhofer <peter.prettenhofer@gmail.com>
#         Mathieu Blondel <mathieu@mblondel.org>
# License: BSD 3 clause
# Modified by guillaumedsde

from pprint import pprint
from time import time
import logging

from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline

from openapi_server.service.classification import train, CLASSIFIERS
from openapi_server.service.data_parsing import (
    extract_data,
    extract_labels,
    extract_file_paths,
)

print(__doc__)

# Display progress logs on stdout
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


# #############################################################################
# Define a pipeline combining a text feature extractor with a simple
# classifier
pipeline = Pipeline(
    [
        ("vect", CountVectorizer()),
        ("tfidf", TfidfTransformer()),
        ("clf", SGDClassifier()),
    ]
)

# uncommenting more parameters will give better exploring power but will
# increase processing time in a combinatorial way


parameters = {
    "vect__norm": ("l1", "l2"),
    "vect__use_idf": (True, False),
    "vect__smooth_idf": (True, False),
    "vect__sublinear_tf": (True, False),
    "vect__analyzer": ["word"],
    "vect__stop_words": ["english"],
    "vect__strip_accents": ["unicode"],
    "vect__lowercase": (True, False),
    "clf__random_state": [1984],
    "clf__decision_function_shape": ("ovo", "ovr"),
    "clf__kernel": ("linear", "poly", "rbf", "sigmoid"),
    "clf__cache_size": [100],
}

if __name__ == "__main__":
    # multiprocessing requires the fork to happen in a __main__ protected
    # block

    clf = CLASSIFIERS[-1]
    print("building pipeline with %s classifier" % clf)
    pipeline = train(clf, skip_training=True)

    print("extracting data and labels")
    train_labels = extract_labels()
    file_paths = extract_file_paths()
    train_data = extract_data(file_paths)

    # find the best parameters for both the feature extraction and the
    # classifier
    grid_search = GridSearchCV(pipeline, parameters, n_jobs=-1, verbose=1)

    print("Performing grid search...")
    print("pipeline:", [name for name, _ in pipeline.steps])
    print("parameters:")
    pprint(parameters)
    t0 = time()
    grid_search.fit(train_data, train_labels)
    print("done in %0.3fs" % (time() - t0))
    print()

    print("Best score: %0.3f" % grid_search.best_score_)
    print("Best parameters set:")
    best_parameters = grid_search.best_estimator_.get_params()
    for param_name in sorted(parameters.keys()):
        print("\t%s: %r" % (param_name, best_parameters[param_name]))

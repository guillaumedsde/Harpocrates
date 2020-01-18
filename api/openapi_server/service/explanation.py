# import eli5

import shap

import sklearn

from lime.lime_text import LimeTextExplainer

import numpy as np

# from skater.core.explanations import Interpretation
# from skater.model import InMemoryModel

from openapi_server.service import CLASS_NAMES, SEED


# def shap_kernel_explanation(classifier, train_data, test_data):

#     # transform data beforehand
#     print("transforming training and test data for training KernelExplainer")
#     transformed_training_data = classifier.steps[0][1].transform(train_data)
#     transformed_test_data = classifier.steps[0][1].transform([test_data])

#     # use kmeans, otherwise data too big
#     print("Calculating kmeans on training data for KernelExplainer")
#     kmeans_training_data = shap.kmeans(transformed_training_data, 10)

#     # build explainer
#     print("Training KernelExplainer")
#     explainer = shap.KernelExplainer(
#         classifier.steps[-1][1].predict_proba, kmeans_training_data, link="logit"
#     )

#     # calculate SHAP values
#     print("Calculating shap values")
#     shap_values = explainer.shap_values(transformed_test_data, nsamples="auto")

#     return shap_values


def shap_tree_explanation(trained_classifier, data, features=20):
    explainer = shap.TreeExplainer(trained_classifier.named_steps.clf)

    # transform data
    transformed_data = trained_classifier.named_steps.vect.transform([data])

    # calculate shap values for all features
    shap_values = explainer.shap_values(transformed_data)

    # get indices for first n biggest absolute weights
    sorted_sliced_indices = np.flip(np.argsort(np.absolute(shap_values[0])))[:features]

    # create feature:weight mapping as array
    feature_names = trained_classifier.named_steps.vect.get_feature_names()
    weights = []
    for i in sorted_sliced_indices:
        weights.append((feature_names[i], float(shap_values[0][i])))

    return weights


# def skater_global_interpretation(classifier, model_train_data, interpreter_train_data, interpreter_train_labels):
#     interpreter = Interpretation(training_data=interpreter_train_data, training_labels=interpreter_train_labels,
#                                  feature_names=CLASS_NAMES)
#     model = InMemoryModel(classifier.predict_proba, examples=model_train_data,
#                           target_names=CLASS_NAMES)
#     print(interpreter.feature_importance.feature_importance(CLASS_NAMES, model))


# def eli5_explanation(trained_classifier, data):

#     explanation = eli5.sklearn.explain_prediction.explain_prediction_sklearn(
#         trained_classifier.named_steps["clf"],
#         data,
#         vec=trained_classifier.named_steps["vect"],
#         target_names=CLASS_NAMES,
#     )

#     dict_explanation = eli5.formatters.format_as_dict(explanation)
#     # print(dict_explanation["targets"])
#     print(dict_explanation["targets"][0]["feature_weights"])
#     return dict_explanation["targets"][0]["feature_weights"]


# def sklearn_permutation_importance(trained_classifier, train_data, train_labels):

#     # transform data beforehand
#     print("transforming training and test data for training KernelExplainer")
#     transformed_training_data = trained_classifier.steps[0][1].transform(train_data)

#     perm = eli5.sklearn.PermutationImportance(trained_classifier).fit(
#         transformed_training_data, train_labels
#     )

#     return eli5.show_weights(perm)


def lime_explanation(classifier, data, features=20):
    explainer = LimeTextExplainer(class_names=CLASS_NAMES)
    explanation = explainer.explain_instance(
        text_instance=data,
        classifier_fn=classifier.predict_proba,
        num_features=features,
    )
    return explanation

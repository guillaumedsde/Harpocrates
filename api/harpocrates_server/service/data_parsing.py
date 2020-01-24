import logging
import os
from multiprocessing import Pool

import numpy as np
from bs4 import BeautifulSoup

from harpocrates_server.service import (
    PROCESSES,
    CLASS_NAMES,
    TRAIN_LABELS,
    TRAIN_DATA_DIR,
)


def extract_labels():
    print("extracting labels from {}".format(TRAIN_LABELS))
    # load classification data
    return np.loadtxt(TRAIN_LABELS, dtype=int, usecols=1)


# TODO finish the service module and implement the endpoints
def extract_file_paths():
    # load labels (file paths)
    file_paths = []
    print("extracting file paths from {}".format(TRAIN_LABELS))
    with open(TRAIN_LABELS) as ground_truth_file:
        for line in ground_truth_file.read().splitlines():
            # build full file path (path prefix and file extension)
            file_paths.append(TRAIN_DATA_DIR + line.split(" ")[0] + ".html")
    return file_paths


def read_file(file_path):
    with open(file_path) as file:
        raw_html = file.read()

        bs = BeautifulSoup(raw_html, "lxml")
        # get the contents of the last <pre> tags
        pre = bs.find_all("pre")[-1]

        text = pre.get_text()
    return text


def extract_data(file_paths):
    texts = []
    print(
        "extracting data from {n_files} files with {n_processes} processes".format(
            n_files=len(file_paths), n_processes=PROCESSES
        )
    )
    pool = Pool(processes=PROCESSES)
    for file_path in file_paths:
        pool.apply_async(
            func=read_file,
            args=(file_path,),
            callback=texts.append,
            error_callback=logging.exception,
        )
    pool.close()
    pool.join()
    return np.array(texts)

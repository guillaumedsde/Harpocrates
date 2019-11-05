from multiprocessing import cpu_count
from pathlib import Path


PROCESSES = int(cpu_count() / 2)
CLASS_NAMES = ["not sensitive", "sensitive"]
SEED = 1968
MODELS_DIRECTORY = Path.cwd().joinpath("instance", "models")

# TRAIN_DATA = Path(app.instance_path).joinpath("train_data")
TRAIN_DATA_DIR = (
    "/home/architect/git_repositories/dissertation/data/collection/cab_html_noboiler/"
)

# TRAIN_LABELS = Path(app.instance_path).joinpath("train_labels","full.collection.cables.path.gold")
TRAIN_LABELS = "/home/architect/git_repositories/dissertation/data/full.collection.cables.path.gold"

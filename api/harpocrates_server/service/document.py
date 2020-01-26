from typing import Dict
import re
from typing import Dict, List
from copy import deepcopy

from harpocrates_server.models.document import Document
from harpocrates_server.models.line import Line


def document_from_mongo_dict(doc: Dict) -> Document:
    document_dict = deepcopy(doc)
    document_dict["document_id"] = str(doc["_id"])
    del document_dict["_id"]
    document = Document().from_dict(document_dict)
    return document


def lines_from_content(content: str) -> List[Line]:
    """
    Given a string representation of document content,
    this function splits it into a list of Line objects 

    :param content: document content to split
    """

    # Regex matching line limit
    # delimiter = re.compile(r"(\n\s*\n)")
    # delimiter = re.compile(r"(\n)")
    # lines_content = []
    # for line in delimiter.split(content):
    #     # attach whitespace only "lines" to the previous one
    #     # except for the first one
    #     if lines_content and line.isspace():
    #         lines_content[-1] += line
    #     else:
    #         lines_content.append(line)

    lines_content = content.splitlines(True)

    # build a list of line objects
    lines = []
    for line_content in lines_content:
        lines.append(Line(content=line_content))

    return lines


def document_from_mongo_dict(doc: Dict) -> Document:
    document_dict = deepcopy(doc)
    document_dict["document_id"] = str(doc["_id"])
    del document_dict["_id"]
    document = Document().from_dict(document_dict)
    return document

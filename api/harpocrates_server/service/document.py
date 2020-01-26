from typing import Dict
import re
from typing import Dict, List
from copy import deepcopy

from harpocrates_server.models.document import Document
from harpocrates_server.models.paragraph import Paragraph


def document_from_mongo_dict(doc: Dict) -> Document:
    document_dict = deepcopy(doc)
    document_dict["document_id"] = str(doc["_id"])
    del document_dict["_id"]
    document = Document().from_dict(document_dict)
    return document


def paragraphs_from_content(content: str) -> List[Paragraph]:
    """
    Given a string representation of document content,
    this function splits it into a list of Paragraph objects 

    :param content: document content to split
    """

    # Regex matching paragraph limit
    # delimiter = re.compile(r"(\n\s*\n)")
    delimiter = re.compile(r"(?=\n\s*\n)")
    paragraphs_content = []
    for paragraph in delimiter.split(content):
        # attach whitespace only "paragraphs" to the previous one
        # except for the first one
        if paragraphs_content and paragraph.isspace():
            paragraphs_content[-1] += paragraph
        else:
            paragraphs_content.append(paragraph)

    # build a list of paragraph objects
    paragraphs = []
    for paragraph_content in paragraphs_content:
        paragraphs.append(Paragraph(content=paragraph_content))

    return paragraphs


def document_from_mongo_dict(doc: Dict) -> Document:
    document_dict = deepcopy(doc)
    document_dict["document_id"] = str(doc["_id"])
    del document_dict["_id"]
    document = Document().from_dict(document_dict)
    return document

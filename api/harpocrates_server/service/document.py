from typing import Dict
from copy import deepcopy

from harpocrates_server.models.document import Document
from openapi_server.models.paragraph import Paragraph


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
    delimiter = "\n"
    paragraphs_content = content.splitlines(True)
    paragraphs = []
    for paragraph_content in paragraphs_content:
        paragraphs.append(Paragraph(content=paragraph_content))
    return paragraphs

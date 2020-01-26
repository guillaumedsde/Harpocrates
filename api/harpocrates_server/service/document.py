import re
from typing import Dict, List
from copy import deepcopy

from harpocrates_server.models.document import Document
from harpocrates_server.models.text_content import TextContent


def split_content_into_document(content: str) -> List[TextContent]:
    """Given a string representation of document content,
    this function splits it into a list of one TextContent object
    representing the document
    
    Arguments:
        content {str} -- document content to split
    
    Returns:
        List[TextContent] --    document split into a list of one TextContent object
                                representing the document
    """
    return TextContent(content=content)


def split_content_into_paragraphs(content: str) -> List[TextContent]:
    """Given a string representation of document content,
    this function splits it into a list of TextContent objects 
    representing the paragraphs of the document
    
    Arguments:
        content {str} -- document content to split
    
    Returns:
        List[TextContent] --    document split into a list of TextContent objects 
                                representing the paragraphs of the document
    """
    # Regex matching text_content limit
    # delimiter = re.compile(r"(\n\s*\n)")
    delimiter = re.compile(r"(?=\n\s*\n)")
    text_contents_content = []
    for text_content in delimiter.split(content):
        # attach whitespace only "text_contents" to the previous one
        # except for the first one
        if text_contents_content and text_content.isspace():
            text_contents_content[-1] += text_content
        else:
            text_contents_content.append(text_content)

    # build a list of text_content objects
    text_contents = []
    for text_content_content in text_contents_content:
        text_contents.append(TextContent(content=text_content_content))

    return text_contents


def split_content_into_lines(content: str) -> List[TextContent]:
    """Given a string representation of document content,
    this function splits it into a list of TextContent objects 
    representing the lines of the document
    
    Arguments:
        content {str} -- document content to split
    
    Returns:
        List[TextContent] --    document split into a list of TextContent objects 
                                representing the lines of the document
    """

    lines_content = content.splitlines(True)

    # build a list of line objects
    lines = []
    for line_content in lines_content:
        lines.append(Line(content=line_content))

    return lines


# Dictionary describing which function to call to split text
# with different levels of granularity
text_content_split_functions = {
    "document": split_content_into_document,
    "paragraph": split_content_into_paragraphs,
    "line": split_content_into_lines,
}


def text_contents_from_document_body(
    content: str, granularity="document"
) -> List[TextContent]:
    """Given a string representation of document content,
        this function splits it into a list of TextContent objects 
        at an optionally given level of granularity

    Arguments:
        content {str} --    document content to split

    Keyword Arguments:
        granularity {str} -- granularity of document split, either "document",
                            "paragraph" or "line" (default: {"document"})

    Returns:
        List[TextContent] --    document split into a list of TextContent objects 
                                representing the document split at the desired granularity
    """

    return text_content_split_functions[granularity](content)


def document_from_mongo_dict(doc: Dict) -> Document:
    document_dict = deepcopy(doc)
    document_dict["document_id"] = str(doc["_id"])
    del document_dict["_id"]
    document = Document().from_dict(document_dict)
    return document

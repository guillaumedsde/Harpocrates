from marshmallow_sqlalchemy import ModelSchema

from openapi_server.models.sqlalchemy import Document, DocumentSet


class DocumentSchema(ModelSchema):
    class Meta:
        model = Document


class DocumentSetSchema(ModelSchema):
    class Meta:
        model = DocumentSet
